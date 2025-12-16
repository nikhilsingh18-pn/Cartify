from fastapi import APIRouter, Depends
from typing import List, Optional
from pydantic import BaseModel
from prisma import Prisma
from ..deps import get_prisma, require_role

router = APIRouter()

class ApplicationIn(BaseModel):
    name: str
    email: str
    phone: str
    role: str
    details: str
    extraInfo: str

class ApplicationOut(ApplicationIn):
    id: str
    status: str
    date: str

class UpdateStatusIn(BaseModel):
    status: str

class CategoryIn(BaseModel):
    name: str

class CategoryOut(BaseModel):
    id: int
    name: str

async def get_prisma() -> Prisma:
    prisma = Prisma()
    await prisma.connect()
    try:
        yield prisma
    finally:
        await prisma.disconnect()

@router.post("/applications", response_model=ApplicationOut)
async def submit_application(payload: ApplicationIn, prisma: Prisma = Depends(get_prisma)):
    app = await prisma.partnerapplication.create(data={
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "role": payload.role,
        "details": payload.details,
        "extraInfo": payload.extraInfo,
        "status": "pending",
    })
    return ApplicationOut(id=app.id, name=app.name, email=app.email, phone=app.phone, role=app.role, details=app.details, extraInfo=app.extraInfo, status=app.status, date=str(app.date))

@router.get("/applications", response_model=List[ApplicationOut])
async def list_applications(status: Optional[str] = None, current = Depends(require_role({"admin"})), prisma: Prisma = Depends(get_prisma)):
    where = {"status": status} if status else {}
    apps = await prisma.partnerapplication.find_many(where=where)
    return [ApplicationOut(id=a.id, name=a.name, email=a.email, phone=a.phone, role=a.role, details=a.details, extraInfo=a.extraInfo, status=a.status, date=str(a.date)) for a in apps]

@router.patch("/applications/{app_id}", response_model=ApplicationOut)
async def update_application_status(app_id: str, payload: UpdateStatusIn, current = Depends(require_role({"admin"})), prisma: Prisma = Depends(get_prisma)):
    a = await prisma.partnerapplication.update(where={"id": app_id}, data={"status": payload.status})
    return ApplicationOut(id=a.id, name=a.name, email=a.email, phone=a.phone, role=a.role, details=a.details, extraInfo=a.extraInfo, status=a.status, date=str(a.date))

@router.get("/categories", response_model=List[CategoryOut])
async def list_categories(prisma: Prisma = Depends(get_prisma)):
    cats = await prisma.category.find_many()
    return [CategoryOut(id=c.id, name=c.name) for c in cats]

@router.post("/categories", response_model=CategoryOut)
async def add_category(payload: CategoryIn, current = Depends(require_role({"admin"})), prisma: Prisma = Depends(get_prisma)):
    c = await prisma.category.create(data={"name": payload.name})
    return CategoryOut(id=c.id, name=c.name)

@router.delete("/categories/{category_id}")
async def remove_category(category_id: int, current = Depends(require_role({"admin"})), prisma: Prisma = Depends(get_prisma)):
    await prisma.category.delete(where={"id": category_id})
    return {"ok": True}