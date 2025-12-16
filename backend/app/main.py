from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Correct relative imports
from .routers import auth, products, orders

app = FastAPI()

# CORS (so frontend can connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(orders.router, prefix="/orders", tags=["Orders"])


@app.get("/")
def home():
    return {"message": "Cartify backend running successfully!"}




