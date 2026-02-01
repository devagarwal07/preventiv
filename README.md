# Prevntiv - Preventive Healthcare Platform

A community-driven preventive health platform built with React and Express.js.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Configure environment variables:**
   
   For the server (`server/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/prevntiv
   JWT_SECRET=your-super-secret-key-here
   PORT=5000
   ```

   For the client (`client/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
prevntiv/
├── client/                    # React Frontend (Vite)
│   ├── public/
│   │   └── assets/           # Images from original design
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/          # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/            # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Privacy.jsx
│   │   │   └── Terms.jsx
│   │   ├── sections/         # Landing page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── WhatsBroken.jsx
│   │   │   ├── PrevntivLoop.jsx
│   │   │   ├── Offers.jsx
│   │   │   ├── WhoItsFor.jsx
│   │   │   └── TrustPrivacy.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/                    # Express Backend
│   ├── models/
│   │   ├── User.js           # User schema with password hashing
│   │   └── HealthData.js     # Health data with auto status calculation
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── health.js         # Health data routes
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   ├── index.js              # Server entry point
│   └── package.json
│
├── .env.example              # Environment template
├── package.json              # Root scripts
└── README.md
```

## 🔑 Features

### For Users (Individuals)
- **Account Management**: Register, login, and profile management
- **Health Dashboard**: View daily health status at a glance
- **Vitals Logging**: Input heart rate, blood pressure, sleep, steps, mood
- **Auto-Calculated Status**: System automatically determines health status
- **Suggested Actions**: Personalized micro-actions based on vitals
- **Weekly Summary**: Track health trends over time

### The Prevntiv Loop
1. **Establish Baseline** - Health profile, lifestyle inputs, vitals
2. **Continuous Monitoring** - Wearables, manual vitals, lab reports
3. **Early Signal Detection** - Trend deviations, pattern changes
4. **Confidence & Continuity** - Ongoing visibility, shared care

## 🔒 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login and get token |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |

### Health Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health/today` | Get today's health status |
| POST | `/api/health/vitals` | Log new vitals |
| GET | `/api/health/history` | Get 30-day history |
| GET | `/api/health/summary` | Get weekly summary |

## 🎨 Tech Stack

**Frontend:**
- React 19 + Vite
- React Router DOM
- Axios
- AOS (Animate on Scroll)
- Bootstrap Icons
- FontAwesome

**Backend:**
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs

## 🏥 Health Status Logic

The system automatically calculates health status based on logged vitals:

- **Stable (Green)** - All vitals within normal range
- **Attention (Yellow)** - One indicator needs monitoring
- **Action (Red)** - Multiple indicators need attention

Status triggers include:
- Heart rate outside 50-100 BPM
- Blood pressure above 140/90
- Sleep less than 6 hours
- Energy level at 3 or below

## 📝 License

Copyright © 2026 Prevntiv. All rights reserved.
