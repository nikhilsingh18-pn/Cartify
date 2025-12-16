from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use URL-encoded @ symbol in password
DATABASE_URL = "mysql+pymysql://root:Nikhil%409078@localhost:3306/cartify"

engine = create_engine(
    DATABASE_URL,
    echo=True  # for debugging SQL queries
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
