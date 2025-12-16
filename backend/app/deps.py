from fastapi import Depends, HTTPException, Header
from prisma import Prisma
import os
import jwt

JWT_SECRET = os.getenv("JWT_SECRET", "change_me")
JWT_ALG = "HS256"

async def get_prisma() -> Prisma:
    prisma = Prisma()
    await prisma.connect()
    try:
        yield prisma
    finally:
        await prisma.disconnect()

async def get_current_user(authorization: str = Header(None), prisma: Prisma = Depends(get_prisma)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    uid = str(payload.get("sub"))
    user = await prisma.user.find_unique(where={"id": uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def require_role(roles: set[str]):
    async def _dep(user = Depends(get_current_user)):
        if user.role not in roles:
            raise HTTPException(status_code=403, detail="Forbidden")
        return user
    return _dep