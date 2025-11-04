# Next.js Project Structure Guide

Next.js ki structure React se thodi different hai. Main differences yeh hain:

## 1. File-Based Routing (`pages` folder)
React mein jaise router setup karna parta hai, Next.js mein automatic file-based routing hoti hai:

```
pages/
├─ index.js         → / (home page)
├─ about.js         → /about
├─ students/
│  ├─ index.js      → /students (list page)
│  └─ [id].js       → /students/123 (dynamic route)
```

## 2. API Routes (`pages/api` folder)
Backend APIs automatically ban jati hain:

```
pages/api/
├─ hello.js         → /api/hello
├─ students/
│  ├─ index.js      → /api/students (GET/POST)
│  └─ [id].js       → /api/students/123 (GET/PUT/DELETE)
```

## 3. Important Folders
```
school-portal/
├─ pages/           → All routes (pages + API)
├─ public/          → Static files (images etc)
├─ styles/          → CSS files
├─ components/      → Reusable React components
├─ lib/             → Shared code (DB etc)
├─ scripts/         → Helper scripts
└─ .env.local      → Environment variables
```

## 4. Key Files
- `pages/_app.js`: Root component (like React's App.js)
- `pages/index.js`: Home page
- `lib/mongodb.js`: Database helper
- `package.json`: Dependencies

## 5. Major Differences from React
1. No Router Setup Needed
   - React: Manual router configuration
   - Next.js: Just create files in `pages/`

2. API Routes Built-in
   - React: Separate backend needed
   - Next.js: Just add files in `pages/api/`

3. Better Performance
   - Server-side rendering
   - Automatic code splitting
   - Image optimization

4. Environment Variables
   - `.env.local` se direct load
   - `process.env.VARIABLE_NAME`

## 6. Example Usage

### Page Route (`pages/students/index.js`):
```jsx
// This becomes /students
export default function StudentsPage() {
  return (
    <div>
      <h1>Students List</h1>
      {/* Your components here */}
    </div>
  )
}
```

### API Route (`pages/api/students/index.js`):
```javascript
// This becomes /api/students
export default async function handler(req, res) {
  // GET = List students
  if (req.method === 'GET') {
    return res.status(200).json({ students: [] })
  }
  
  // POST = Create student
  if (req.method === 'POST') {
    return res.status(201).json({ created: true })
  }
}
```

### Component (`components/StudentCard.js`):
```jsx
// Reusable component
export default function StudentCard({ name, grade }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Grade: {grade}</p>
    </div>
  )
}
```

## 7. How to Run
```bash
npm run dev     # Development (auto-reload)
npm run build   # Create production build
npm start       # Run production build
```

## 8. Best Practices
1. Components ko `components/` mein rakhen
2. Database/helper code `lib/` mein rakhen
3. CSS ko `styles/` mein rakhen
4. Images ko `public/` mein rakhen

## Need help?
- Koi specific page/API banani ho to batayen
- Ya koi example code dekhna ho to batayen