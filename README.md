# DevExplorer

A developer-focused dashboard that combines GitHub repositories, Dev.to articles, and remote job listings into one useful interface.

**Live demo:** https://project-hfi9m.vercel.app

**GitHub:** https://github.com/tahirabatool-lab/devexplorer

## What it does

A person can do the following things here that they could not easily do by visiting each API's website separately:

- Search GitHub repositories and filter by programming language and sort order in one view
- Browse Dev.to articles filtered by technology tag with reading time and reaction counts
- Search remote job listings by role, company, or skill keyword
- Save jobs for later using the heart button (persisted across page refreshes)
- See a combined dashboard of trending repos and latest articles on one home page

## APIs used

| API | Purpose | Docs |
|-----|---------|------|
| GitHub REST API | Repository search and trending repos | https://docs.github.com/en/rest |
| Dev.to API | Developer articles by tag | https://developers.forem.com/api |
| RemoteOK | Remote job listings | https://remoteok.com/api |

## Installation — fresh machine

Requirements: Node.js 18 or higher, npm

```bash
git clone https://github.com/tahirabatool-lab/devexplorer.git
cd devexplorer
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

No environment variables or API keys are required. All three APIs are free and public.

## Build for production

```bash
npm run build
npm run preview
```

## How error handling works

This project was built to handle three failure cases the assessment requires:

**1. Slow API:**
All API calls have explicit timeouts (10 seconds for GitHub and Dev.to, 15 seconds for RemoteOK). Skeleton loading cards appear immediately so the UI never looks frozen while waiting.

**2. API error:**
Every API call is wrapped in try/catch. If a request fails for any reason (network down, API unavailable, timeout, CORS block), a friendly ErrorMessage component appears with the message "Unable to fetch data. Please try again later." and a retry button where applicable.

**3. Bad user input:**
The search input in Repositories page validates before making any network call. Empty strings and whitespace-only input are rejected with an inline message: "Please enter a search term." Inputs shorter than 2 characters show: "Search term must be at least 2 characters." No API call is made until input passes validation.

## Project structure

```
src/
  components/   # Navbar, RepoCard, ArticleCard, JobCard, ErrorMessage, SkeletonCard, LoadingSpinner
  pages/        # Home, Repositories, Articles, Jobs
  services/     # github.js, devto.js, remoteok.js — all API calls isolated here
  hooks/        # useFetch.js, useDebounce.js
  utils/        # formatters.js, validators.js
```

## Tech stack

- React 19
- Vite
- Tailwind CSS v3
- Axios
- React Router DOM
- React Icons