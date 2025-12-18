import asyncio
from prisma import Prisma
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

USERS = [
    {"name": "Admin User", "email": "admin@cartify.com", "password": "password123", "role": "admin"},
    {"name": "Seller User", "email": "seller@cartify.com", "password": "password123", "role": "seller"},
    {"name": "Delivery User", "email": "delivery@cartify.com", "password": "password123", "role": "delivery"},
    {"name": "Customer User", "email": "customer@cartify.com", "password": "password123", "role": "customer"},
]

async def main():
    prisma = Prisma()
    await prisma.connect()

    print("Seeding database...")
    for u in USERS:
        existing = await prisma.user.find_unique(where={"email": u["email"]})
        if not existing:
            hashed = pwd_context.hash(u["password"])
            await prisma.user.create(
                data={
                    "name": u["name"],
                    "email": u["email"],
                    "password": hashed,
                    "role": u["role"],
                }
            )
            print(f"Created {u['role']}: {u['email']} / {u['password']}")
        else:
            print(f"User already exists: {u['email']}")

    await prisma.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
