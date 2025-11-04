# School Portal (Next.js) - Minimal Scaffold

This folder contains a minimal Next.js scaffold for the School Management MVP.

How to run (PowerShell):

```powershell
cd "c:\Users\Laptop House\Desktop\Nextjs-SaasProject-Ideas\school-portal"
npm install
npm run dev
```

Open http://localhost:3001 to view the app. API endpoint: http://localhost:3001/api/hello

Notes:
- This is a minimal starting point. Next steps: add auth (NextAuth/Clerk), database (Postgres + Prisma), and core modules like students/attendance.
 
MongoDB setup:
- Copy `.env.local.example` to `.env.local` and set `MONGODB_URI` to your MongoDB connection string.
- A test API route is available at `/api/test-db` which will list collections from the configured database.
