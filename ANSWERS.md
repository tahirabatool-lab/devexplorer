# Assessment Answers

## 1. How to run

Clone the repository, run `npm install`, then `npm run dev`. No environment variables or API keys are needed — all three APIs (GitHub, Dev.to, RemoteOK) are free and public. The app runs on `http://localhost:5173` by default.

## 2. Stack choice

I used **React + Vite + Tailwind CSS**. Vite's dev server starts in under a second and produces fast production builds. Tailwind eliminates the need for a separate CSS file per component and enforces visual consistency. I avoided TypeScript to keep the project focused on architecture and API integration rather than type annotations, since the assessment didn't require it.

## 3. One real edge case I handled

The RemoteOK API does not support CORS by default, which means it can fail in certain browser environments. Rather than pretending this won't happen, I catch the error and show a clear message: "The RemoteOK API may be temporarily unavailable." I also set a 15-second timeout (longer than GitHub's 10 seconds) because RemoteOK is noticeably slower. The `useDebounce` hook on the repository search prevents firing an API call on every keystroke, which would exhaust GitHub's unauthenticated rate limit of 10 requests per minute.

## 4. AI usage

I used Claude to help plan the folder structure and review error handling patterns. All code was written and understood by me — I used AI the way I'd use a senior engineer to review my approach, not to generate code I didn't understand.

## 5. Honest gap

The RemoteOK integration is the weakest part of the app. The API returns inconsistent data shapes (some jobs have a `salary` field, others don't; tag arrays are sometimes absent). I handle this with optional chaining (`?.`) throughout `JobCard.jsx`, but in a production app I'd normalise the API response in `remoteok.js` into a predictable shape before passing it to the UI. I'd also add pagination — right now I cap results at 20 items as a practical workaround.