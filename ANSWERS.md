# Assessment Answers

## 1. How to run

Requirements: Node.js 18 or higher, npm

```bash
git clone https://github.com/tahirabatool-lab/devexplorer.git
cd devexplorer
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

No API keys or environment variables are needed. All three APIs
(GitHub, Dev.to, RemoteOK) are free and public.

To build for production:

```bash
npm run build
npm run preview
```

## 2. Stack choice

I chose React + Vite + Tailwind CSS.

Vite starts the dev server in under one second and produces fast,
optimised production builds. React's component model made it easy to
build reusable cards (RepoCard, ArticleCard, JobCard) and share loading
and error state logic across pages through custom hooks. Tailwind CSS
enforces visual consistency without writing a separate CSS file per
component.

A worse choice would have been Create React App. It is significantly
slower to start (15-30 seconds vs under 1 second with Vite), its build
output is larger, and it is no longer maintained by the React team.
Plain HTML + fetch would have worked for a single API but would have
become hard to maintain across four pages with shared components and
routing.

## 3. One real edge case

**File:** `src/hooks/useDebounce.js`, line 6
**Also:** `src/utils/validators.js`, line 3

The `useDebounce` hook delays the search query by 600ms before firing
a GitHub API request. Without this, every single keystroke would
trigger a new network request. GitHub's unauthenticated API allows only
10 requests per minute — a user typing "react hooks" (10 characters)
would exhaust that limit in seconds and start receiving 403 Rate Limit
Exceeded errors. With debouncing, the entire typed phrase counts as a
single request.

The input validator in `src/utils/validators.js` (line 3) rejects
empty strings and whitespace-only input before any network call is
made. Without this check, submitting an empty search sends a malformed
query to GitHub which returns a 422 Unprocessable Entity error — a
confusing response to show a user. The validator catches this instantly
with a clear inline message instead.

## 4. AI usage

I used Claude (claude.ai) throughout this project in the following ways:

**1. Project architecture planning**
I asked Claude to suggest a folder structure for a multi-page React app
consuming three APIs. It suggested the src/services/ pattern for
isolating all API calls away from page components. I kept this
suggestion as it matches real engineering practice.

**2. Error handling patterns**
I asked Claude how to handle API timeouts and CORS failures gracefully
in React. It gave me the try/catch pattern with a cancelled flag inside
useEffect to prevent setting state on unmounted components
(useFetch.js, lines 10-24).

**What I changed:**
Claude's initial suggestion for the Jobs page used Redux Toolkit for
managing saved jobs state. I replaced this with a simple useState +
localStorage combination in `src/pages/Jobs.jsx` (lines 14-18).
Redux would be significant overengineering for a single piece of local
state that does not need to be shared across pages. The assessment
instructions also specifically said not to use Redux. Using useState
with localStorage achieves the same result in 5 lines instead of
setting up an entire Redux store.

## 5. Honest gap

The RemoteOK API integration is the weakest part of the submission.

The API returns inconsistently encoded text — some job titles appear
as garbled characters like "dÃ©partements" instead of "départements"
because the API sends Latin-1 encoded text without declaring the
correct charset. I handle missing fields throughout `JobCard.jsx`
using optional chaining (?.) so the UI never crashes on incomplete
data, but I did not fix the encoding issue.

With another day, I would decode the API response correctly in
`src/services/remoteok.js` using a TextDecoder or an HTML entity
decoder library before passing data to the UI. I would also add proper
pagination — currently I cap results at 20 items as a workaround
because rendering all jobs at once with no pagination is not
production-quality behaviour.