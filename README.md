# 🎮 Kids Fun Games — MEAN Stack

Two educational kids games built with **MongoDB, Express, Angular, Node.js**.

## Games
1. **Animal Matching** 🐾 — Match animals with their names or sounds (flip cards)
2. **Shape Puzzle** 🧩 — Drag & drop shapes into matching zones

## Project Structure
```
mean-games/
├── backend/                  ← Node.js + Express + MongoDB
│   ├── config/database.js
│   ├── models/
│   │   ├── Animal.js
│   │   └── Score.js
│   ├── controllers/
│   ├── routes/
│   └── server.js             ← Entry point (port 3000)
│
└── frontend/                 ← Angular 16
    └── src/app/
        ├── components/
        │   ├── home/
        │   ├── animal-matching/
        │   └── shape-puzzle/
        ├── models/
        └── services/api.service.ts
```

## Setup & Run

### Prerequisites
- Node.js 18+
- MongoDB running locally
- Angular CLI: `npm install -g @angular/cli`

### Backend
```bash
cd backend
npm install
npm run dev       # runs on http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
ng serve          # runs on http://localhost:4200
```

## API Endpoints
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/animals | Get all animals |
| GET | /api/animals?difficulty=1 | Filter by difficulty |
| POST | /api/scores | Save a score |
| GET | /api/scores/leaderboard | Top 10 scores |
| GET | /api/scores/stats | Game statistics |
| GET | /api/health | API health check |

## Features
- ✅ MEAN Stack (MongoDB, Express, Angular, Node)
- ✅ Animal Matching: emoji ↔ name OR emoji ↔ sound
- ✅ Shape Puzzle: drag & drop + click-to-place
- ✅ 3 difficulty levels per game
- ✅ Timer, score tracking, leaderboard
- ✅ Scores saved to MongoDB
- ✅ Fallback data if backend is offline
- ✅ Responsive design (mobile-friendly)
- ✅ Fun kid-friendly UI with animations
# funzone-kids
# funzone-kids
