from fastapi import APIRouter, Depends, HTTPException
from typing import List
from pydantic import BaseModel
from prisma import Prisma
from ..deps import get_prisma, require_role

router = APIRouter()

class OrderItemIn(BaseModel):
    productId: str
    quantity: int

class CreateOrderRequest(BaseModel):
    items: List[OrderItemIn]
    shippingAddress: str

class OrderItemOut(BaseModel):
    productId: str
    quantity: int

class OrderOut(BaseModel):
    id: str
    customerId: str
    items: List[OrderItemOut]
    total: int
    status: str
    paymentStatus: str
    deliveryPartnerId: str | None
    createdAt: str
    shippingAddress: str
    trackingNumber: str | None

async def get_prisma() -> Prisma:
    prisma = Prisma()
    await prisma.connect()
    try:
        yield prisma
    finally:
        await prisma.disconnect()

@router.post("/", response_model=OrderOut)
async def create_order(payload: CreateOrderRequest, current = Depends(require_role({"customer"})), prisma: Prisma = Depends(get_prisma)):
    product_ids = [i.productId for i in payload.items]
    products = await prisma.product.find_many(where={"id": {"in": product_ids}})
    if len(products) != len(product_ids):
        raise HTTPException(status_code=400, detail="Invalid product ids")
    total = 0
    for it in payload.items:
        price = next(p.price for p in products if p.id == it.productId)
        total += price * it.quantity
    order = await prisma.order.create(
        data={
            "customerId": current.id,
            "total": total,
            "status": "pending",
            "paymentStatus": "paid",
            "shippingAddress": payload.shippingAddress,
            "items": {
                "create": [
                    {"productId": it.productId, "quantity": it.quantity} for it in payload.items
                ]
            },
        },
        include={"items": True},
    )
    return OrderOut(
        id=order.id,
        customerId=order.customerId,
        items=[OrderItemOut(productId=i.productId, quantity=i.quantity) for i in order.items],
        total=order.total,
        status=order.status,
        paymentStatus=order.paymentStatus,
        deliveryPartnerId=order.deliveryPartnerId,
        createdAt=str(order.createdAt),
        shippingAddress=order.shippingAddress,
        trackingNumber=order.trackingNumber,
    )

@router.get("/me", response_model=List[OrderOut])
async def my_orders(current = Depends(require_role({"customer"})), prisma: Prisma = Depends(get_prisma)):
    orders = await prisma.order.find_many(where={"customerId": current.id}, include={"items": True})
    return [
        OrderOut(
            id=o.id,
            customerId=o.customerId,
            items=[OrderItemOut(productId=i.productId, quantity=i.quantity) for i in o.items],
            total=o.total,
            status=o.status,
            paymentStatus=o.paymentStatus,
            deliveryPartnerId=o.deliveryPartnerId,
            createdAt=str(o.createdAt),
            shippingAddress=o.shippingAddress,
            trackingNumber=o.trackingNumber,
        )
        for o in orders
    ]