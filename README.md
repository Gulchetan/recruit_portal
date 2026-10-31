# TalentBridge India

A **Randstad-style** recruitment demo built with Next.js. All data (jobs, applications, vacancies, users) is stored in **browser localStorage** — no backend required.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo login

| Role | Email | Password |
|------|--------|----------|
| Admin | `admin@talentbridge.in` | `Admin@123` |
| Job seeker | `seeker@talentbridge.in` | `Seeker@123` |
| Employer | `employer@talentbridge.in` | `Employer@123` |

- **Admin**: `/admin` — manage jobs, view applications, vacancies, and users.
- **Job seeker**: search jobs, save roles, submit applications (from `/dashboard`).
- **Employer**: submit vacancies on `/for-employers`; view submissions on `/dashboard`.

You can also **register** new seeker or employer accounts at `/register` (stored locally only).

## Features

- Homepage with job search, category counts, talent/employer CTAs
- Job listing, filters, and detail pages with apply flow
- For talent / for employers / about / contact pages
- User dashboard (saved jobs, applications, employer vacancies)
- Admin panel with job CRUD

## Storage notes

- **Log out** clears all local TalentBridge data (session, jobs, applications, saved jobs, etc.) and returns you to the homepage. Jobs are seeded again automatically on the next visit.
- Clearing site data or using a private window has the same effect as logging out.
- Passwords for registered users are **not encrypted** — for local demo only.
- Resume uploads record the **filename only**; files are not uploaded anywhere.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, lucide-react.
