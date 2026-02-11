
import express from "express";
import { runHourlyCheck, runUrgentCheck, runMidnightSync, runCleanup } from "../controllers/cron.controller";

const router = express.Router();

// Cron routes - secured by CRON_SECRET header verification inside controller or middleware
router.get("/hourly", runHourlyCheck);
router.get("/urgent", runUrgentCheck);
router.get("/sync", runMidnightSync);
router.get("/cleanup", runCleanup);

export default router;
