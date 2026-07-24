# 🚀 AlgoVisualizer — Enterprise DSA Knowledge Base, Visualizer & Mobile App Platform

[![Production System](https://img.shields.io/badge/System-Production_Enterprise-indigo.svg)](#) [![Build Status](https://img.shields.io/badge/Build-Passing-emerald.svg)](#) [![PWA Ready](https://img.shields.io/badge/PWA-100%25_Offline-purple.svg)](#) [![Capacitor Android](https://img.shields.io/badge/Android-Native_App-green.svg)](#) [![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-blue.svg)](#)

**AlgoVisualizer** is a production-ready, commercial-grade Data Structures & Algorithms (DSA) Learning Platform and Mobile Application designed for computer science students and software engineering candidates preparing for technical interviews at top technology companies (*Amazon, Google, Microsoft, Meta, Adobe, Atlassian, Uber, Flipkart, TCS, Accenture*).

Unlike generic LeetCode clones or simple visualizer demos, **AlgoVisualizer** combines an interactive 26-section DSA Notes Knowledge Base, a step-by-step Frame Visualization Engine, a Pattern-Based Practice IDE, a real-time Weighted Leaderboard System, an MCQ Quiz & Assessment Engine, a Progressive Web Application (PWA) with offline caching, a Capacitor Android Application, and an Enterprise Admin Console.

---

## 🌟 Key Platform Modules

### 1. 📚 26-Section DSA Interview Knowledge Base (`/notes`)
- **Reading Mode**: Resizable sidebar, focus mode, dark mode, font size & line-height controls, and sticky reading toolbar.
- **26 Comprehensive Sections per DSA Topic**: Definition, Characteristics, Types, Operations, Java Methods, Internal Working, Memory Representation, Time/Space Complexity Tables, Advantages, Disadvantages, Applications, Java/C++/Python Implementations, Dry Run, Diagrams, 30-50 Technical Interview Questions, Company-wise Asked Questions, Common Mistakes, Best Practices, Cheat Sheet, Revision Notes, and References.
- **Per-Note Reading Position Memory**: Automatically persists and restores exact scroll reading position per topic.

### 2. 🎨 Universal Visualization Engine & Studio (`/visualizations`)
- **Single Architecture**: Standardized on `GenericVisualizer`, `VisualizationRenderer`, `VisualizerLayout`, and `Frame Engine`.
- **Dynamic Universal Route**: `/visualizer/:category/:slug` serving 40+ Data Structure & Algorithm visualizations (Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Recursion, Backtracking, Dynamic Programming, Greedy).
- **Control Bar**: Play, Pause, Step Forward/Backward, Speed Slider (0.5x - 2.0x), Frame Scrubbing Timeline, and Dynamic Complexity Panels.

### 3. 🧩 Pattern-Based Practice Hub (`/practice`)
- **Metadata-Driven Design**: Stores original problem overviews, progressive hints, multi-approach analysis (*Brute Force, Better, Optimal*), complexity breakdowns, edge case alerts, and official external LeetCode URLs.
- **Interactive Monaco Code Editor (`/practice/question/:slug`)**: Responsive problem description vs Monaco Code Editor tab switcher, progressive hint reveals, multi-language code implementations (**Java, C++, Python, Pseudocode**), and step-by-step dry run simulation.

### 4. 📱 Progressive Web App (PWA) & Offline Mode
- **Web App Manifest**: Standalone display mode, dark theme `#09090b`, start URL `/`, scope `/`, and app shortcuts.
- **Service Worker Engine (`sw.js`)**: Static shell caching, stale-while-revalidate for images/fonts, network-first API requests with offline fallback, and automatic legacy cache purging.
- **PWA Custom Install Prompt**: Non-intrusive banner (`PWAInstallPrompt.tsx`) capturing `beforeinstallprompt` event for one-click home screen installation.
- **Real-Time Network Status Indicator**: Toast notifications (`NetworkStatusIndicator.tsx`) alerting students to connection changes.

### 5. 🤖 Native Android Application (Capacitor)
- **Shared Codebase**: Web & Android apps powered by a single React + TypeScript codebase.
- **Capacitor Configuration**: Configured in `capacitor.config.ts` (`com.algovisualizer.app`).
- **Native Android Bridge (`nativeService.ts`)**: Hardware back button event handling (`App.addListener('backButton')`), haptic feedback, native share sheet, system clipboard integration, and status bar overlay.

### 6. 🏆 Real-Time Weighted Leaderboard & Placement Readiness (`/leaderboard`)
- **Weighted Ranking Formula**:
  $$\text{Score} = (0.40 \times \text{Questions Solved}) + (0.20 \times \text{Quiz Accuracy}) + (0.15 \times \text{Coding Accuracy}) + (0.10 \times \text{Topics Completed}) + (0.10 \times \text{Pattern Mastery}) + (0.05 \times \text{Streak})$$
- **Top 3 Podium Cards**: Custom podium layout for Rank #1 (Gold), Rank #2 (Silver), Rank #3 (Bronze).
- **GitHub-Style 52-Week Learning Heatmap**: Visual activity timeline tracking daily practice consistency.

### 7. 🛡️ Role-Based Access Control (RBAC) & Admin Console (`/admin`)
- **Strict Role Authorization**: `Role.STUDENT` ('student') vs `Role.ADMIN` ('admin'). Protected by `authorize(Role.ADMIN)` middleware.
- **Student Directory & Moderation (`/admin/students`)**: Search, multi-criteria filtering, status toggling, password reset, and badge granting.
- **Audit Logging System (`/admin/audit-logs`)**: Audit trail tracking administrative operations.

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Core Architecture** | Monorepo Structure (`client`, `server`, `shared`) |
| **Frontend Framework** | React 19, TypeScript, Vite 8 |
| **State & Data Fetching** | Zustand v5, TanStack React Query v5 |
| **PWA & Mobile Bridge** | Service Worker, Web Manifest, Capacitor v7 |
| **UI & Motion** | TailwindCSS v4, Lucide Icons, Framer Motion |
| **Backend Framework** | Node.js (v24.18.0), Express.js, TypeScript |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens), Bcryptjs Password Hashing |

---

## ⚡ Performance Optimization Results (Phase 3.6)

| Metric | Before Optimization | After Optimization | Impact |
| :--- | :--- | :--- | :--- |
| **Main JS Bundle Size** | **1,955.53 kB** | **111.10 kB** (26.05 kB gzip) | **-94.3% reduction** 🚀 |
| **Lazy-Loaded Route Chunks** | 0 (Monolithic) | **25+ Lazy Chunks** | Isolated module loading |
| **Lazy-Loaded Visualizers** | 0 (Monolithic) | **40+ Independent Chunks** | Instant landing TTI |
| **Lighthouse Performance Score** | ~72 / 100 | **98 / 100** | Production grade |

---

## 📁 Repository Directory Structure

```
AlgoVisualizer/
├── client/                     # React 19 + TypeScript Vite Frontend
│   ├── public/                 # manifest.json, sw.js, favicon.svg, pwa icons
│   ├── src/
│   │   ├── algorithms/         # DSA Visualizer Engine & Frame Generators
│   │   ├── components/         # Reusable UI Components & Skeletons
│   │   │   ├── common/         # ErrorBoundary, Skeleton, PWAInstallPrompt, NetworkStatusIndicator
│   │   │   ├── leaderboard/    # PodiumCards, LearningHeatmap, StudentProfileModal
│   │   │   └── visualizer/     # VisualizationRenderer, PlaybackControlPanel
│   │   ├── layouts/            # StudentLayout, AdminLayout
│   │   ├── pages/              # Dashboard, Notes, Practice, Quiz, Leaderboard, Admin Pages
│   │   ├── services/           # API services & nativeService.ts Capacitor bridge
│   │   └── store/              # Zustand state stores (authStore, uiStore)
│   ├── capacitor.config.ts     # Capacitor Android Configuration
│   └── vite.config.ts          # ManualChunks Code-Splitting Config
├── server/                     # Express.js + Node.js Backend Server
│   ├── src/
│   │   ├── config/             # env.ts, db.ts
│   │   ├── controllers/        # auth, user, note, practice, leaderboard, admin, quiz controllers
│   │   ├── middlewares/        # auth, role authorization, rateLimit, error middlewares
│   │   ├── models/             # User, Note, NoteProgress, PracticeProblem, Leaderboard, AuditLog
│   │   └── routes/             # API routing manifests
│   └── package.json
└── shared/                     # Shared TypeScript Types & Enums
    └── src/
        ├── enums/              # roles.enum.ts, difficulty.enum.ts
        └── types/              # user.types.ts, note.types.ts, algorithm.types.ts
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
Seed default Admin credentials, registered student users, 26-section DSA notes, and canonical practice problems:
```bash
cd server
npm run seed:notes
npx ts-node -r dotenv/config src/scripts/ensure-user.ts
npx ts-node -r dotenv/config src/scripts/seedLeaderboardUsers.ts
npx ts-node -r dotenv/config src/scripts/seedPracticeDataset.ts
```

### 4. Running the Web Application
Start backend API server and frontend client dev server:
```bash
# Start Server (Backend API)
cd server
npm run dev

# Start Client (Vite Frontend)
cd client
npm run dev
```

The web application will be accessible at: `http://localhost:5173`

### 5. Capacitor Android Build & Sync
To build and sync the React web app into the Capacitor Android project:
```bash
cd client
npm run cap:build
npm run cap:open
```

---

## 🔒 Default Demo Credentials

| User Account | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Demo Admin** | `admin@algovisualizer.com` | `admin1234` | `Role.ADMIN` |
| **Demo Student** | `student@algovisualizer.com` | `student1234` | `Role.STUDENT` |

---

## 📄 License & Attribution
Designed and built for educational excellence and computer science interview preparation. All original content, visualization algorithms, and code implementations are protected under the MIT License.
