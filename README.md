# SkillBridge

SkillBridge is a freelancer marketplace prototype built with React and Vite. It connects small businesses that need project work completed with independent freelancers who can browse listings and submit proposals. The original vanilla HTML/CSS/JavaScript project is kept in `legacy-vanilla/` as a reference.

> **Deployment URL:** `https://<your-vercel-project>.vercel.app` (replace this placeholder after deployment)

## Problem statement

Small businesses can have trouble finding independent talent for focused projects. Freelancers can have trouble discovering suitable work and clearly presenting their skills. SkillBridge provides a simple place for clients to publish projects and for freelancers to find them and send proposals.

## Modules

- **User module — Client:** create project listings, review proposals, accept or reject proposals, and browse freelancer profiles.
- **User module — Freelancer:** maintain a profile and portfolio, browse and filter open projects, submit proposals, and mark accepted work completed.
- **Admin module:** view marketplace totals and manage user accounts and project listings. Removing a project also removes its proposals.

## Features

- Signup and login with role-based dashboard redirects and protected routes.
- Project lifecycle: `OPEN`, `IN_PROGRESS`, and `COMPLETED`.
- Proposal lifecycle: `PENDING`, `ACCEPTED`, and `REJECTED`; a freelancer can submit only one proposal per project.
- Search projects and freelancers by keyword and skill.
- Seeded Indian small-business demo accounts, projects, and proposals.
- Responsive layouts, status badges, form validation, empty states, and toast messages.

## Tech stack

- React (JavaScript)
- Vite
- React Router
- Plain CSS
- Browser `localStorage` for all application data; there is no backend or database.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Vite prints a local development URL, usually `http://localhost:5173`.

Build and preview the production bundle with:

```sh
npm run build
npm run preview
```

The production output directory is `dist/`.

## Demo accounts

Seed data is added to the browser once on first load. Use these accounts to explore the modules.

**Admin**

| Email | Password |
|---|---|
| `admin@skillbridge.com` | `admin123` |

**Clients** (password for each: `client123`)

- `ananya@jaipurspice.in`
- `rohan@punebloom.in`
- `meera@coastalcrafters.in`

**Freelancers** (password for each: `freelancer123`)

- `aarav@skillbridge.in`
- `priya@skillbridge.in`
- `kabir@skillbridge.in`
- `sana@skillbridge.in`

## Reset demo data

In the browser console for the app’s origin, run:

```js
localStorage.clear();
location.reload();
```

Reloading after clearing storage runs the seed again. This clears all SkillBridge data stored for that origin.

## Project structure

```text
project/
├── legacy-vanilla/       Original HTML, CSS, JavaScript, and assets
├── public/               Static assets, including favicon.svg
├── src/
│   ├── components/       Shared UI and route protection
│   ├── context/          Authentication and toast contexts
│   ├── pages/
│   │   ├── admin/        Admin dashboard
│   │   ├── client/       Client module pages
│   │   ├── freelancer/   Freelancer module pages
│   │   ├── public/       Landing and authentication pages
│   │   └── shared/       Project details and proposal actions
│   ├── services/         localStorage, user, project, proposal, admin, and seed logic
│   ├── styles/           Global, component, and responsive CSS
│   ├── utils/            Formatting and validation helpers
│   ├── App.jsx           Route definitions
│   └── main.jsx          App entry point and initial data seeding
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

The previous static Node server is outside this app folder at `../server.js`; use Vite for the React app.

## Limitations

- This is a college-project prototype. It has no backend, database, server-side authorization, or cross-device synchronization.
- Account and marketplace records are stored in the current browser’s `localStorage` and can be cleared by the user.
- Demo passwords are stored as plain text in browser storage. Do not use real credentials or personal data.
- A GitHub connection and Vercel deployment still need to be completed; replace the deployment URL placeholder above after deploying.
