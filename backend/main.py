from app.core.database import Base, engine
from app.models.product import Product

Base.metadata.create_all(bind=engine)
