# 🚀 AlgoVisualizer — Production-Ready DSA Learning & Visualization Platform

[![Production System](https://img.shields.io/badge/System-Production_SaaS-indigo.svg)](#) [![Build Status](https://img.shields.io/badge/Build-Passing-emerald.svg)](#) [![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-blue.svg)](#) [![Node.js Engine](https://img.shields.io/badge/Node.js-v24.18.0-green.svg)](#)

**AlgoVisualizer** is a production-ready, commercial-grade Data Structures & Algorithms (DSA) Learning Platform designed for computer science students and software engineering candidates preparing for technical interviews at top technology companies (*Amazon, Google, Microsoft, Meta, Adobe, Atlassian, Uber, TCS, Accenture*).

Unlike generic LeetCode clones or simple visualizer demos, **AlgoVisualizer** combines an interactive step-by-step Frame Visualization Engine, a Pattern-Based Practice Hub, a real-time Weighted Leaderboard System, an MCQ Quiz & Assessment Engine, a Role-Based Access Control (RBAC) Admin Console, and a SaaS Settings Center.

---

## 🌟 Key Platform Modules

### 1. 🎨 Universal Visualization Engine
- **Single Architecture**: Standardized on `GenericVisualizer`, `VisualizationRenderer`, `VisualizerLayout`, and `Frame Engine`.
- **Dynamic Universal Route**: `/visualizer/:category/:slug` serving all Data Structure & Algorithm visualizations (Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Recursion, Backtracking, Dynamic Programming, Greedy).
- **Control Bar**: Play, Pause, Step Forward/Backward, Speed Slider (0.5x - 2.0x), Frame Scrubbing Timeline, and Dynamic Complexity Panels.

### 2. 🧩 Pattern-Based Practice Hub (`/practice`)
- **Metadata-Driven Design**: Stores original problem overviews, progressive hints, multi-approach analysis (*Brute Force, Better, Optimal*), complexity breakdowns, edge case alerts, and official external LeetCode URLs.
- **Pattern Hierarchy**: Organized strictly by **Category &rarr; Pattern &rarr; Question** (*Two Pointer, Sliding Window, Prefix Sum, Kadane, Binary Search, Intervals, Matrix, Hashing, Trie, Monotonic Stack*).
- **Interactive Question Learning Page (`/practice/question/:slug`)**: Includes progressive hint reveals (Hint 1, 2, 3), multi-language code implementations (**Java, C++, Python, Pseudocode**), step-by-step dry run simulation, personal notes editor, and direct visualizer launching.

### 3. 🏆 Real-Time Weighted Leaderboard & Placement Readiness (`/leaderboard`)
- **Weighted Ranking Formula**:
  $$\text{Score} = (0.40 \times \text{Questions Solved}) + (0.20 \times \text{Quiz Accuracy}) + (0.15 \times \text{Coding Accuracy}) + (0.10 \times \text{Topics Completed}) + (0.10 \times \text{Pattern Mastery}) + (0.05 \times \text{Streak})$$
- **Top 3 Podium Cards**: Custom podium layout for Rank #1 (Gold), Rank #2 (Silver), Rank #3 (Bronze).
- **Placement Readiness Scores**: Target readiness ratings for Amazon, Google, Microsoft, TCS, Accenture, Cognizant.
- **GitHub-Style 52-Week Learning Heatmap**: Visual activity timeline tracking daily practice consistency.

### 4. 🧠 MCQ Quiz & Assessment Engine (`/quiz`)
- **Adaptive Topic Tests**: Topic-wise quiz evaluations testing algorithmic intuition, edge case detection, and time/space complexity analysis.
- **Instant Detailed Feedback**: Post-quiz breakdown showing score %, accuracy %, explanations, and weak area recommendations.

### 5. 🛡️ Role-Based Access Control (RBAC) & Admin Console (`/admin`)
- **Strict Role Authorization**: `Role.STUDENT` ('student') vs `Role.ADMIN` ('admin'). Protected by `authorize(Role.ADMIN)` middleware.
- **Student Directory & Moderation (`/admin/students`)**: Search, multi-criteria filtering (*College, Batch, Target Company, Status*), status toggling (*Active/Banned*), password reset, and badge granting.
- **Student Profile Modal**: Deep-dive profile modal displaying student statistics, progress, and activity logs.
- **Audit Logging System (`/admin/audit-logs`)**: Audit trail tracking administrative operations.
- **Data Export Center (`/admin/reports`)**: Multi-format exports into **CSV** or **JSON**.

### 6. ⚙️ Commercial SaaS Settings Center (`/settings` & `/admin/settings`)
- **Student Settings (`/settings`)**: Left sidebar tabs for `Profile`, `Security & 2FA`, `Appearance`, `Learning Preferences`, `Notifications`, `Privacy & Data Download` (JSON export), and `Connected Accounts`.
- **Admin Settings (`/admin/settings`)**: Control Center sections for `Platform Settings`, `User Management`, `Security & Rate Limits`, `Leaderboard & XP Rules`, `Quiz & Coding Limits`, `Email & Database`, `Analytics & Tracking`, and `System Health`.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Core Architecture** | Monorepo Structure (`client`, `server`, `shared`) |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **State & Data Fetching** | Zustand, TanStack React Query v5 |
| **UI & Motion** | TailwindCSS, Vanilla CSS Tokens, Lucide Icons, Framer Motion |
| **Backend Framework** | Node.js (v24.18.0), Express.js, TypeScript |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), Bcryptjs Password Hashing |
| **Testing** | Node test runner, TypeScript execution (`ts-node`) |

---

## 📁 Repository Directory Structure

```
AlgoVisualizer/
├── client/                     # React + TypeScript Frontend Application
│   ├── src/
│   │   ├── algorithms/         # DSA Visualizer Engine & Frame Generators
│   │   │   ├── engine/         # dsaFrameEngine.ts
│   │   │   └── metadata/       # interviewMetadata.ts
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── common/         # ErrorBoundary, Skeleton, EmptyState, Modal
│   │   │   ├── leaderboard/    # PodiumCards, LearningHeatmap, StudentProfileModal
│   │   │   └── visualizer/     # VisualizationRenderer, PlaybackControlPanel
│   │   ├── layouts/            # StudentLayout, AdminLayout
│   │   ├── pages/              # Dashboard, Practice, QuestionDetailsPage, Leaderboard, Admin Pages
│   │   ├── services/           # API services (authService, userService, practiceService, adminService)
│   │   └── store/              # Zustand state stores (authStore, uiStore)
│   └── vite.config.ts
├── server/                     # Express.js + Node.js Backend Server
│   ├── src/
│   │   ├── config/             # env.ts, db.ts, cloudinary.ts
│   │   ├── controllers/        # auth, user, practice, leaderboard, admin, quiz controllers
│   │   ├── middlewares/        # auth, role authorization, rateLimit, error middlewares
│   │   ├── models/             # User, PracticeProblem, PracticeUserProgress, Leaderboard, AuditLog, SystemSettings
│   │   ├── routes/             # API routing manifests
│   │   ├── scripts/            # ensure-user.ts, seedLeaderboardUsers.ts, seedPracticeDataset.ts
│   │   ├── services/           # Business logic services
│   │   └── tests/              # Auth & RBAC integration test suites
│   └── package.json
└── shared/                     # Shared TypeScript Types & Enums
    └── src/
        ├── enums/              # roles.enum.ts, difficulty.enum.ts
        └── types/              # user.types.ts, algorithm.types.ts
```

---

## 🚀 Getting Started & Local Development Setup

### Prerequisites
- Node.js `v18.0.0` or higher (Recommended: `v24.18.0`)
- MongoDB Atlas cluster URL or local MongoDB instance

### 1. Installation
Clone the repository and install dependencies across the monorepo workspace:
```bash
# In the root directory
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `server` directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/algovisualizer?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your_jwt_access_secret_key_32_chars_long
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_32_chars_long
```

### 3. Database Seeding
Seed default Admin credentials, registered student users, and canonical practice problems:
```bash
cd server
npm run seed:dsa
npx ts-node -r dotenv/config src/scripts/ensure-user.ts
npx ts-node -r dotenv/config src/scripts/seedLeaderboardUsers.ts
npx ts-node -r dotenv/config src/scripts/seedPracticeDataset.ts
```

### 4. Running the Application
Start backend API server and frontend client dev server:
```bash
# Start Server (Backend API)
cd server
npm run dev

# Start Client (Vite Frontend)
cd client
npm run dev
```

The application will be accessible at: `http://localhost:5173`

---

## 🧪 Testing & Health Verification

### Running Automated Test Suite
To run the authentication and RBAC integration tests:
```bash
cd server
npm test
```

### API Health Endpoint
The server exposes health diagnostics endpoints:
- `GET /api/health`
- `GET /api/v1/health`

**Sample Response**:
```json
{
  "status": "pass",
  "success": true,
  "message": "AlgoVisualizer SaaS API is operational 🚀",
  "version": "1.4.2",
  "uptimeSeconds": 3600,
  "timestamp": "2026-07-21T17:55:00.000Z",
  "environment": "production",
  "database": {
    "status": "Connected",
    "stateCode": 1
  },
  "memory": {
    "rssMB": 85.4,
    "heapUsedMB": 42.1
  }
}
```

---

## 🔒 Security & Default Credentials

| User Account | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Demo Admin** | `admin@algovisualizer.com` | `admin1234` | `Role.ADMIN` |
| **Demo Student** | `student@algovisualizer.com` | `student1234` | `Role.STUDENT` |

---

## 📄 License & Attribution
Designed and built for educational excellence and computer science interview preparation. All original content, visualization algorithms, and code implementations are protected under the MIT License.
