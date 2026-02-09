import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/user.routes";
import contributionsRoutes from "./routes/contributions.routes";
import telegramRoutes from "./routes/telegram.routes";
import notificationRoutes from "./routes/notification.routes";
import {
  helmetMiddleware,
  generalRateLimiter,
  hppMiddleware,
  securityHeaders,
  sanitizeRequest,
  logSuspiciousActivity,
} from "./middleware/security";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { startNotificationJob } from "./jobs/notifications.job";

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// CORS configuration
// CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL?.replace(/\/$/, ""),
  process.env.FRONTEND_URL
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is allowed
    if (allowedOrigins.includes(origin) || origin === process.env.FRONTEND_URL?.replace(/\/$/, "")) {
      callback(null, true);
    } else {
      console.log("Blocked CORS origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  maxAge: 86400,
};

// CORS must come FIRST before any other middleware
app.use(cors(corsOptions));

app.use(helmetMiddleware);
if (isProduction) app.set("trust proxy", 1);
app.use(generalRateLimiter);
app.use(hppMiddleware);
app.use(securityHeaders);
app.use(logSuspiciousActivity);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(sanitizeRequest);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), version: "1.0.0" });
});

app.use("/api/user", userRoutes);
app.use("/api/contributions", contributionsRoutes);
app.use("/api/telegram", telegramRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// Export app for Vercel
export default app;

// Only start the server if running directly (not imported)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${isProduction ? "production" : "development"}`);
    startNotificationJob();

    // Verify Telegram Bot Credentials
    fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`)
      .then(res => res.json() as Promise<any>)
      .then(data => {
        if (data.ok) {
          console.log(`🤖 Telegram Bot Connected: @${data.result.username} (${data.result.first_name})`);
        } else {
          console.error("❌ Telegram Bot Error:", data.description);
        }
      })
      .catch(err => console.error("❌ Failed to connect to Telegram:", (err as Error).message));
  });
}
