#!/bin/bash
set -e

echo "==================================================="
echo "     🚀 Starting Assesment Config (Ensolvers)      "
echo "==================================================="

if ! command -v pnpm &> /dev/null
then
    echo "❌ Error: 'pnpm' is not installed."
    echo "Please install 'pnpm' and try again."
    exit 1
fi

echo "⚙️  Verifyng env files exist (.env)..."

if [ ! -f ./backend/.env ]; then
  echo "   -> Creating default env file in backend..."
  echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/assessment\"" > ./backend/.env # This should be a real DB URL
  echo "PORT=3000" >> ./backend/.env
  echo "HOST=0.0.0.0" >> ./backend/.env
  echo "JWT_SECRET=\"super_secret_jwt_key_for_assessment\"" >> ./backend/.env
fi

if [ ! -f ./frontend/.env ]; then
  echo "   -> Creating default env file in frontend..."
  echo "VITE_API_URL=\"http://localhost:3000/api/v1\"" > ./frontend/.env
fi

echo "📦 Installing dependencies..."
pnpm i


echo "🔨 Building..."
pnpm run build


echo "🗄️  Config DB and ORM (Prisma)..."
cd backend
pnpm dlx prisma generate

pnpm dlx prisma db push
cd ..

echo "==================================================="
echo "✅ Ready to start."
echo "🌐 Starting Turborepo services..."
echo "➡️  Frontend: http://localhost:5173"
echo "➡️  Backend:  http://localhost:3000"
echo "🛑 Press Ctrl+C to stop running all services."
echo "==================================================="

pnpm run dev