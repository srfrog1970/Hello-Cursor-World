# Hello Cursor World (MERN)

A minimal "Hello World" MERN stack project.

## Structure

- `server` — Express backend with `/api/hello` endpoint. Optional MongoDB via `MONGODB_URI`.
- `client` — React (Vite) frontend that fetches from `/api/hello` and displays the message.

## Prerequisites

- Node.js 18+ and npm
- (Optional) MongoDB instance if you want to test a DB connection

## Setup

1) Backend

```bash
cd server
npm install
cp .env.example .env # edit as desired
npm start
```

By default it runs on port 5000 and exposes `GET /api/hello`.

2) Frontend

```bash
cd client
npm install
npm run dev
```

The Vite dev server runs on port 5173. The frontend calls `/api/hello`, which is proxied to the backend during development.

## Environment

Create `server/.env` from `.env.example` and update values as needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hello_cursor_world
```

If `MONGODB_URI` is unset, the server runs without a database connection.

## Scripts

- Backend: `npm start` from `server` folder
- Frontend: `npm run dev` from `client` folder

## Notes

- This project keeps backend and frontend as separate apps for clarity.
- For production/deployment, you can serve the built frontend from the backend or deploy separately.

# Hello-Cursor-World
This is my first try at building an application using Cursor.
