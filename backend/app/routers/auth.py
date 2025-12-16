from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import jwt
import os

from ..models.user import User
from ..deps import get_db


router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = os.getenv("JWT_SECRET", "change_me")
JWT_ALG = "HS256"


# ---------------------------
# Pydantic Schemas
# ---------------------------

class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    avatar: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    rewards: Optional[int] = None

    class Config:
        orm_mode = True


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
def register(payload: RegisterRequest, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = pwd_context.hash(payload.password)

    user = User(
        name=payload.name,
        email=payload.email,
        password=hashed,
        role=payload.role,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(str(user.id))
    return TokenResponse(access_token=token, token_type="bearer")


# ---------------------------
# Login
# ---------------------------

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == payload.email).first()

    if not user or not pwd_context.verify(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(str(user.id))
    return TokenResponse(access_token=token, token_type="bearer")


# ---------------------------
# Current User Helper
# ---------------------------

def get_current_user_id(token: str) -> str:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        return str(payload.get("sub"))
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------------------------
# Get logged-in user
# ---------------------------

@router.get("/me", response_model=UserOut)
def me(current_user_id: str = Depends(get_current_user_id), db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == current_user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
