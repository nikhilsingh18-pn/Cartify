import os
from prisma import Prisma

categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Groceries', 'Books', 'Beauty & Personal Care', 'Sports & Outdoors', 'Toys & Games'
]

async def run():
    prisma = Prisma()
    await prisma.connect()
    try:
        for name in categories:
            existing = await prisma.category.find_unique(where={"name": name})
            if not existing:
                await prisma.category.create(data={"name": name})

        admin_email = os.getenv('ADMIN_EMAIL', 'admin@cartify.local')
        seller_email = os.getenv('SELLER_EMAIL', 'seller@cartify.local')

        # Create admin if missing
        admin = await prisma.user.find_unique(where={"email": admin_email})
        if not admin:
            admin = await prisma.user.create(data={
                "name": "Admin User",
                "email": admin_email,
                "password": "seeded",
                "role": "admin",
            })

        # Create seller if missing
        seller = await prisma.user.find_unique(where={"email": seller_email})
        if not seller:
            seller = await prisma.user.create(data={
                "name": "Demo Seller",
                "email": seller_email,
                "password": "seeded",
                "role": "seller",
            })
    finally:
        await prisma.disconnect()

if __name__ == "__main__":
    import asyncio
    asyncio.run(run())