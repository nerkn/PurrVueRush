cd frontend
npm install
npm run build
cd ../fast
npm install
echo "migrating"
npm run migrate:deploy
echo "prisma client generation"
npx prisma generate 
echo "starting app"
npm run start