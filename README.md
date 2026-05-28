# DevExplorer

A developer-focused dashboard that aggregates GitHub repositories, Dev.to articles, and remote job listings from public APIs.

**Live demo:** https://project-hfi9m.vercel.app

## Features

- **Repository Explorer** — search and filter GitHub repos by language and sort order
- **Articles** — browse Dev.to articles filtered by technology tag
- **Remote Jobs** — browse RemoteOK listings with keyword search and save-for-later
- **Home Dashboard** — preview of trending repos and latest articles
- Skeleton loading states and friendly error messages throughout
- Fully responsive — works on mobile and desktop

## APIs used

| API | Purpose | Docs |
|-----|---------|------|
| GitHub REST API | Repository search and trending | https://docs.github.com/en/rest |
| Dev.to API | Developer articles | https://developers.forem.com/api |
| RemoteOK | Remote job listings | https://remoteok.com/api |

## Installation

```bash
git clone https://github.com/yourusername/devexplorer.git
cd devexplorer
npm install
npm run dev
```

No environment variables are required — all APIs used are public and free.

## Build for production

```bash
npm run build
npm run preview
```

## Error handling

- **Network failure / API unavailable:** Each section shows a friendly message and a retry button.
- **Slow APIs:** All requests have a 10–15 second timeout. Skeleton loaders show immediately so the UI never looks stuck.
- **Invalid input:** Empty or whitespace-only search terms are rejected with inline validation messages before any network request is made.
- **CORS (RemoteOK):** If RemoteOK is blocked by the browser, a clear error message is shown with fallback text.

## Project structure

```
src/
  components/   # Reusable UI: Navbar, cards, ErrorMessage, SkeletonCard
  pages/        # Page-level components: Home, Repositories, Articles, Jobs
  services/     # API call logic: github.js, devto.js, remoteok.js
  hooks/        # Custom hooks: useFetch, useDebounce
  utils/        # Helper functions: formatters, validators
```