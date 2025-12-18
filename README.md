# Cartify E-commerce Platform

## Prerequisites
- Node.js & npm
- Python 3.10+
- `pip`

## Quick Start

### 1. Backend Setup (FastAPI + Prisma + SQLite)
Open a terminal in the project root:

```bash
# Navigate to backend
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Generate Prisma Client
prisma generate --schema=prisma/schema.prisma

# Push Database Schema (creates dev.db)
# Windows PowerShell:
$env:DATABASE_URL='file:./dev.db'; prisma db push --schema=prisma/schema.prisma
# Bash:
# DATABASE_URL='file:./dev.db' prisma db push --schema=prisma/schema.prisma

# Start Backend Server
# Windows PowerShell:
$env:DATABASE_URL='file:./dev.db'; uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
# Bash:
# DATABASE_URL='file:./dev.db' uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```
The backend will run at `http://127.0.0.1:8000`.

### 2. Frontend Setup (React + Vite)
Open a new terminal in the project root:

```bash
# Install dependencies
npm install

# Start Frontend Server
npm run dev -- --host
```
The frontend will run at `http://localhost:5173`.

## Default Credentials
| Role | Email | Password |
|---|---|---|
| Admin | `admin@cartify.com` | `password123` |
| Seller | `seller@cartify.com` | `password123` |
| Delivery | `delivery@cartify.com` | `password123` |
| Customer | `customer@cartify.com` | `password123` |