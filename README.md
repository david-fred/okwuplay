# OkwuPlay

A prototype word-building game for learning Igbo. Players build an Igbo word from letter tiles, and digraphs such as *gb*, *kp* and *kw* count as single tiles.

**Status:** early prototype. The word list is a placeholder and has not yet been checked by an Igbo speaker. Don't use it with children yet.

**Live:** https://okwuplay.vercel.app

## Install on Android

1. Open the link above in Chrome.
2. Open the menu and choose **Install app** or **Add to Home screen**.
3. Open OkwuPlay from your home screen. After the first load it works offline.

Installing needs HTTPS, which the live link uses. iPhone Safari only adds a shortcut, with weaker offline support.

## Features

- Digraph-aware letter tiles: *ch, gb, gh, gw, kp, kw, nw, ny, sh*
- Ten test words with English meanings
- Installable as a PWA, and works offline after the first load

## Run locally

Requires Node.js 24 LTS (22.18 or newer also works) and npm.

```bash
npm install
npm run dev         # development server at http://localhost:5173
```

Service workers only run in production builds, so test offline behaviour with:

```bash
npm run build
npm run preview     # http://localhost:4173
```

## Project structure

```
src/
  App.tsx           game screen and round logic
  igbo/tiles.ts     digraph-aware tokenizer
  data/words.ts     test word list (placeholder)
public/icons/       app icons (placeholders)
vite.config.ts      Vite and PWA configuration
```

## Deployment

The app is hosted on Vercel. Once the GitHub integration is connected, merges into `main` go live, and pushes to other branches create preview deployments.

To deploy manually, commit first, because the command deploys your local files, including uncommitted changes:

```bash
npx vercel --prod
```

## Branches

- `main`: stable, deployed
- `dev`: active work
- `laravel`: parked Laravel and Inertia backend, for later

## Roadmap

- Igbo speaker check of the word list: spelling, meanings and dialect
- Localization: English and Igbo interface text
- Scoring and round tracking
- API versioning, once there is an API

## Data

The app has no accounts, analytics or tracking, and it doesn't store personal data. The hosting provider logs standard request information, as all hosts do.

## Licence

See [LICENSE](LICENSE).
 
 
