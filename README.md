# BrainRush — Quiz Platform

*Sharpen your mind. One quiz at a time.*

BrainRush is a full-stack quiz platform built for the TS Academy Capstone Project (Group 57). Users can register, take quizzes, see their scores, and review their attempt history. Admins can create quizzes and publish or unpublish them.

**Live app:** https://ts-academy-quiz-platform.vercel.app

---

## Features

**For users**
- Register and log in (token-based authentication)
- Browse published quizzes
- Take a quiz and see the score immediately
- View past attempts in My Attempts

**For admins**
- Create new quizzes with multiple questions
- Manage quizzes: publish or unpublish
- Admin-only links appear in the navbar for admin accounts only

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), React Router |
| Backend | Node.js, Express |
| Database | MongoDB |
| Auth | Bearer token (login returns a token, sent in the `Authorization` header) |
| Hosting | Vercel (frontend) |

---

## Project Structure

```
quiz-platform/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Navbar, PrivateRoute, AdminRoute
│       ├── context/        # AuthContext (user, login, logout)
│       ├── pages/          # Login, Register, QuizList, TakeQuiz,
│       │                   # Results, MyAttempts, CreateQuiz, ManageQuizzes
│       └── api.js          # Axios instance
├── config/                 # Database connection
├── controllers/            # authController, quizController
├── middleware/             # authMiddleware
├── models/                 # User, Quiz, Attempt
├── routes/                 # authRoutes, quizRoutes
└── server.js               # Express entry point
```

---

## Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/beatsbynorth21/ts-academy-quiz-platform.git
cd ts-academy-quiz-platform
```

### 2. Backend

```bash
npm install
```

Create a `.env` file in the project root with your own values:

```
PORT=5000
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<any long random string>
```

Start the server:

```bash
node server.js
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

The frontend reads the API URL from the `VITE_API_URL` environment variable (see `client/src/api.js`). If it isn't set, it falls back to `http://localhost:5000/api`, so local development works with no extra setup.

To point it at a different backend, create `client/.env`:

```
VITE_API_URL=<your backend URL>/api
```

On Vercel, set the same `VITE_API_URL` variable in the project's Environment Variables settings.

---

## Roles

- **User:** default role on registration.
- **Admin:** can access `/admin/create-quiz` and `/admin/manage-quizzes`. Admins are set in the database (`role: "admin"` on the user document).

---

## Team

Group 57, TS Academy Capstone. 20 members:

| # | Member |
|---|--------|
| 1 | North (Benedict Patrick) — beatsbynorth21@gmail.com |
| 2 | F. Theophilus — femitheophilus10@gmail.com |
| 3 | marvelousejimodok@gmail.com |
| 4 | abdullahiadepoju23@gmail.com |
| 5 | tessycharles35@gmail.com |
| 6 | nestorosha90@gmail.com |
| 7 | goldp5432@gmail.com |
| 8 | apraise3100@gmail.com |
| 9 | nkemetohobasi@gmail.com |
| 10 | ajarasophie2020@gmail.com |
| 11 | dpraise502@gmail.com |
| 12 | artducator20@gmail.com |
| 13 | adekoyahabeeb92@gmail.com |
| 14 | estherconphy.98@gmail.com |
| 15 | onunkwojoseph1@gmail.com |
| 16 | bevelynozege@gmail.com |
| 17 | zeelexofficial@gmail.com |
| 18 | osodaniel.ama1@gmail.com |
| 19 | blakecansing@gmail.com |
| 20 | achimennanna@yahoo.com |

---

## Notes

- Never commit `.env` or any secret keys.
- The frontend is deployed on Vercel and redeploys automatically on every push to `main`.
