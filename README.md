# Security System

A production-ready Next.js security monitoring dashboard built as a graduation project.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend / Auth**: Supabase
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
security-system/
├── app/
│   ├── (auth)/           # Auth pages (no nav bar)
│   │   ├── login/
│   │   └── signup/
│   ├── (app)/            # Authenticated pages (with nav bar)
│   │   ├── dashboard/
│   │   ├── history/
│   │   └── profile/
│   ├── globals.css
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Redirects to /login
├── components/
│   ├── BottomNav.tsx     # Mobile bottom nav + desktop sidebar
│   ├── PageShell.tsx     # Authenticated page wrapper
│   └── StatusBadge.tsx   # Severity badge component
├── lib/
│   └── supabase.ts       # Supabase client
├── types/
│   └── index.ts          # Shared TypeScript types
├── .env.example          # Environment variable template
└── vercel.json           # Vercel deployment config
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Get your values from: **Supabase Dashboard → Project Settings → API**

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.
4. Vercel will auto-deploy on every push to `main`.

## Pages

| Route        | Description                        |
|--------------|------------------------------------|
| `/login`     | Sign in with email & password      |
| `/signup`    | Create a new account               |
| `/dashboard` | Security overview & recent events  |
| `/history`   | Full chronological event log       |
| `/profile`   | User info & account settings       |
