# Notion Clone

A working Notion-style workspace with nested documents, a block editor and real-time sync, plus the smaller things that make Notion feel complete: a trash bin, cover images and emoji icons.

I built this to get comfortable with the two parts of Notion that are actually hard to get right: real-time data and a block-based editor.

## Features

- Nested, infinitely deep documents in a sidebar tree
- Block editor for text, headings, lists, checkboxes and more
- Real-time updates backed by Convex
- Cover images and file uploads
- Emoji icons per document
- Archive and restore (trash), plus publish-to-web
- Light and dark mode

## Tech stack

- Next.js (App Router)
- Convex for the real-time database and backend
- Clerk for authentication
- BlockNote for the block editor
- EdgeStore for file and image uploads
- Tailwind CSS with Radix UI (shadcn/ui)
- Zustand and Zod

## Getting started

```bash
npm install
# set up .env.local with your Convex, Clerk and EdgeStore keys
npx convex dev   # in one terminal
npm run dev      # in another
```

Then open http://localhost:3000.
