# Quiz Platform — TS Academy Capstone (Group 57)

A full-stack quiz app: create quizzes, publish them, take them, and track scores.

## Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt
- **Frontend:** React (Vite), React Router, Axios

## Project Structure

```
quiz-platform/
├── config/           # DB connection
├── controllers/      # auth + quiz logic
├── middleware/       # JWT auth middleware
├── models/           # User, Quiz, Attempt schemas
├── routes/           # Express routes
├── server.js
└── client/           # React frontend (Vite)
```

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/beatsbynorth21/ts-academy-quiz-platform.git
cd ts-academy-quiz-platform
```

### 2. Install dependencies

```bash
npm install
cd client
npm install
cd ..
```

### 3. Create your `.env` file

In the project root, create a file named `.env` with:

```
MONGO_URI=<ask a teammate for this>
PORT=5000
JWT_SECRET=<ask a teammate for this>
```

**Do not commit this file.** It is already in `.gitignore`.

### 4. Run the backend

```bash
node server.js
```

You should see `Server running on port 5000` and `MongoDB connected`.

### 5. Run the frontend (in a separate terminal)

```bash
cd client
npm run dev
```

The app opens at `http://localhost:5173`.

## Features

- User registration and login (JWT-based)
- Browse and take published quizzes
- Automatic scoring
- Attempt history ("My Attempts")
- Admin panel: create quizzes, publish/unpublish

## Making Yourself an Admin

New accounts default to `role: "user"`. To access the admin pages, change your user's `role` field to `"admin"` directly in MongoDB Atlas (Browse Collections → `quizplatform` → `users`).

## Notes for Contributors

- Pull before you start work and push often: `git pull origin main` / `git push`
- Never commit `.env` or `node_modules`
- If your login stops working after someone rotates `JWT_SECRET`, just log in again
