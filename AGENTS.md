# Project rules

- Stack: React + Vite (JavaScript), react-router-dom only. No other runtime dependencies without asking.
- All localStorage access goes through `src/services/storage.js` only.
- Data model: users, projects, proposals, currentUser, using fields id, role, name, email, password, bio, skills, portfolio, clientId, freelancerId, projectId, skillsNeeded, budget, deadline, status, acceptedProposalId, bidAmount, message, createdAt. Never rename these.
- Statuses: project OPEN / IN_PROGRESS / COMPLETED; proposal PENDING / ACCEPTED / REJECTED.
- Roles: client, freelancer, admin. Modules: User module (client + freelancer) and Admin module.
- Keep code simple and explainable by a 2nd-year student: functional components, hooks, short files, comments on non-obvious logic.
- After every task: run `npm run build` and fix errors before finishing.
