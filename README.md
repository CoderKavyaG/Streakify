
# ⚡ Streakify

**Don't Break the Chain. Keep Your GitHub Streak Alive.**

Streakify is a developer productivity tool designed to help you maintain your GitHub contribution streak effortlessly. It tracks your daily commits, provides real-time stats, and sends proactive reminders via Telegram and Email to ensure you never miss a day.

![Streakify Dashboard](https://your-screenshot-url-here.png)
*(Replace with actual screenshot)*

## 🚀 Features

*   **📊 Real-time Streak Tracking**: Syncs directly with GitHub to show your current streak, longest streak, and total contributions.
*   **🔔 Smart Notifications**:
    *   **Hourly Checks**: Monitors your contribution status throughout the day.
    *   **Urgent Reminders**: Get a "1 Hour Left" alert if you haven't committed by 11 PM.
    *   **Streak Saved**: Celebrate when you save your streak at the last minute!
*   **📱 Telegram Integration**: Link your Telegram account to receive instant alerts right on your phone.
*   **📧 Email Reports**: Daily summaries and reminders via Resend.
*   **🌍 Timezone Aware**: Accurately tracks contributions based on your local timezone (Asia/Kolkata default).
*   **⚡ High Performance**: Built with aggressive caching (Node-cache) to minimize API latency and respect GitHub rate limits.
*   **🔒 Secure Auth**: Seamless authentication via Supabase (GitHub OAuth) with automatic token syncing.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
*   **Styling**: Tailwind CSS v4, Motion (Framer Motion)
*   **State Management**: Zustand
*   **UI Components**: Radix UI, Lucide React, Tabler Icons
*   **Visualization**: React Activity Calendar

### Backend
*   **Runtime**: Node.js, Express.js
*   **Database**: Supabase (PostgreSQL)
*   **Authentication**: Supabase Auth
*   **Caching**: Node-cache (In-memory)
*   **Scheduling**: GitHub Actions (Cron Jobs) + Vercel Cron
*   **Notifications**: Telegram Bot API + Resend (Email)

## 🏗️ Architecture

The project is a monorepo structure containing:
*   `/frontend`: Next.js application hosted on Vercel.
*   `/backend`: Node.js/Express API hosted on Vercel (Serverless functions adapter).

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+
*   Supabase Account
*   GitHub Account
*   Redis (Optional, for advanced caching)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/CoderKavyaG/Streakify.git
    cd Streakify
    ```

2.  **Install Dependencies**
    ```bash
    # Frontend
    cd frontend
    npm install

    # Backend
    cd ../backend
    npm install
    ```

3.  **Environment Setup**
    Create `.env` files in both directories following the examples below.

    *Backend `.env`*:
    ```env
    PORT=5000
    SUPABASE_URL=your_supabase_url
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    GITHUB_TOKEN=your_personal_access_token (fallback)
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    RESEND_API_KEY=your_resend_api_key
    CRON_SECRET=your_secret_cron_key
    FRONTEND_URL=http://localhost:3000
    ```

    *Frontend `.env.local`*:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```

4.  **Run Locally**
    ```bash
    # Database
    # Ensure your Supabase instance is running or connected

    # Start Backend (Terminal 1)
    cd backend
    npm run dev

    # Start Frontend (Terminal 2)
    cd frontend
    npm run dev
    ```

5.  **Visit App**
    Open [http://localhost:3000](http://localhost:3000)

## 🤖 Cron Jobs

Streakify uses **GitHub Actions** to trigger scheduled checks on the backend.
*   **Hourly Check**: Runs every hour to check user contribution status.
*   **Urgent Check**: Runs at 11 PM (Local time logic handled in backend).
*   **Midnight Sync**: Syncs daily data at midnight.

To verify cron status, check the "Actions" tab in your GitHub repository.

## 🤝 Contributors

Built with ❤️ by:

| [<img src="https://github.com/CoderKavyaG.png" width="100px;" alt="CoderKavyaG"/><br /><sub><b>Kavya</b></sub>](https://github.com/CoderKavyaG) | [<img src="https://github.com/HarxhitBuilds.png" width="100px;" alt="HarxhitBuilds"/><br /><sub><b>Harshith</b></sub>](https://github.com/HarxhitBuilds) |
| :---: | :---: |

Contributions are always welcome!

## 📄 License

MIT License © 2026 Streakify Team
