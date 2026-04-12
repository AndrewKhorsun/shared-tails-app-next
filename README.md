# Shared Tales — Frontend

Frontend for a collaborative AI-powered book writing application. Built with Next.js 16 App Router + TypeScript + Tailwind CSS.

## Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| Framework      | Next.js 16 (App Router)                 |
| Language       | TypeScript 5                            |
| Styling        | Tailwind CSS 4                          |
| Icons          | Lucide React                            |
| HTTP           | Fetch API (via Next.js Route Handlers)  |
| Dev tools      | ESLint, Prettier                        |

## Project Structure

```
frontend-next/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # "/" → redirect
│   ├── login/
│   │   └── page.tsx                  # Auth page
│   ├── (dashboard)/                  # Route group — shared layout
│   │   ├── layout.tsx                # Topnav + Sidebar
│   │   ├── books/
│   │   │   ├── page.tsx              # Books library
│   │   │   └── [bookId]/
│   │   │       └── page.tsx          # Book detail + chapters
│   │   └── profile/
│   │       └── page.tsx              # User profile
│   └── api/                          # Route Handlers (proxy to Express)
│       └── auth/
│           ├── login/route.ts
│           ├── register/route.ts
│           └── me/route.ts
├── components/
│   ├── auth/                         # Login / register forms
│   ├── ui/                           # Reusable UI primitives
│   └── hooks/                        # Custom React hooks
├── lib/
│   └── api.ts                        # Fetch wrapper
├── types/                            # TypeScript type definitions
└── proxy.ts                          # Dev proxy config
```

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Start

```bash
# Development (port 3001)
pnpm dev

# Production
pnpm build && pnpm start
```

App runs at `http://localhost:3001`

---

## Architecture

### Auth Flow

Browser communicates with Express API exclusively through Next.js Route Handlers. The JWT token is stored in an `httpOnly` cookie — not accessible by JavaScript, protecting against XSS.

```
Browser → Next.js /api/auth/* → Express API → httpOnly cookie set
```

### Server Components by Default

Every `page.tsx` is a Server Component. `"use client"` is used only where `useState` / event handlers are needed.

---

## Scripts

```bash
pnpm dev          # Development server on port 3001
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

---

## Deployment

```bash
# On server
git fetch origin main
git reset --hard origin/main
docker compose up -d --build frontend
```

---

## Roadmap

- [x] Project setup (Next.js 16, TypeScript, Tailwind)
- [x] Authentication (login, register, httpOnly cookies)
- [x] Auth middleware (route protection)
- [x] Docker + CI/CD (GitHub Actions → EC2)
- [ ] Dashboard layout (topnav, sidebar)
- [ ] Books CRUD (list, create, update, delete)
- [ ] Book plan form (genre, characters, world, plot arc)
- [ ] Chapters CRUD + rich text editor
- [ ] AI chapter generation UI (plan review → approve/revise → result)
- [ ] Agent response streaming (SSE)
- [ ] Error boundaries
- [ ] Responsive design

## License

ISC
