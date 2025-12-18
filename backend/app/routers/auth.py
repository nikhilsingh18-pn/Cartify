from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt
import os
from prisma import Prisma

from ..deps import get_prisma

router = APIRouter()

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
JWT_SECRET = os.getenv("JWT_SECRET", "change_me")
JWT_ALG = "HS256"

# ---------------------------
# Pydantic Schemas
# ---------------------------

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    avatar: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    rewards: Optional[int] = None

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# ---------------------------
# JWT Token
# ---------------------------

def create_access_token(sub: str, expires_delta: Optional[timedelta] = None) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=12))
    to_encode = {"sub": sub, "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALG)

# ---------------------------
# Register
# ---------------------------

@router.post("/register", response_model=TokenResponse)
async def register(payload: RegisterRequest, prisma: Prisma = Depends(get_prisma)):
    existing = await prisma.user.find_unique(where={"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = pwd_context.hash(payload.password)

    user = await prisma.user.create(
        data={
            "name": payload.name,
            "email": payload.email,
            "password": hashed,
            "role": payload.role, # Ensure role is valid enum in Prisma
        }
    )

    token = create_access_token(user.id)
    return TokenResponse(access_token=token, token_type="bearer")

# ---------------------------
# Login
# ---------------------------

@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, prisma: Prisma = Depends(get_prisma)):
    user = await prisma.user.find_unique(where={"email": payload.email})

    if not user or not pwd_context.verify(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user.id)
    return TokenResponse(access_token=token, token_type="bearer")

# ---------------------------
# Current User Helper
# ---------------------------

from fastapi import Header

def get_current_user_id(authorization: str = Header(...)) -> str:
    try:
        scheme, token = authorization.split()
        if scheme.lower() != 'bearer':
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        return str(payload.get("sub"))
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# ---------------------------
# Get logged-in user
# ---------------------------

@router.get("/me", response_model=UserOut)
async def me(current_user_id: str = Depends(get_current_user_id), prisma: Prisma = Depends(get_prisma)):
    user = await prisma.user.find_unique(where={"id": current_user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
