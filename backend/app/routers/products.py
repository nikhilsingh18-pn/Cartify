from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..deps import get_db
from ..models.product import Product

router = APIRouter()

# ---------------------------
# Pydantic Schemas
# ---------------------------

class ProductIn(BaseModel):
    title: str
    description: str
    category: str
    price: float
    image: str


class ProductOut(ProductIn):
    id: int

    class Config:
        orm_mode = True


# ---------------------------
# Get all products
# ---------------------------

@router.get("/", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products


# ---------------------------
# Get product by ID
# ---------------------------

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# ---------------------------
# Create product
# ---------------------------

@router.post("/", response_model=ProductOut)
def create_product(payload: ProductIn, db: Session = Depends(get_db)):
    new_product = Product(
        title=payload.title,
        description=payload.description,
        category=payload.category,
        price=payload.price,
        image=payload.image,
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


# ---------------------------
# Update product
# ---------------------------

@router.put("/{product_id}", response_model=ProductOut)
def update_product(product_id: int, payload: ProductIn, db: Session = Depends(get_db)):

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    product.title = payload.title
    product.description = payload.description
    product.category = payload.category
    product.price = payload.price
    product.image = payload.image

    db.commit()
    db.refresh(product)

    return product


# ---------------------------
# Delete product
# ---------------------------

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()

    return {"message": "Product deleted"}
