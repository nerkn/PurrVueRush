cd frontend
npm install
npm run build
cd ../fast
npm install
npm run migrate:dev
npx prisma generate 
npm run start