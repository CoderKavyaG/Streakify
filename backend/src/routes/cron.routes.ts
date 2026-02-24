import express from "express";
import { handleHourly, handleUrgent, handleSync, handleCleanup } from "../controllers/cron.controller";

const router = express.Router();

// Cron routes - secured by secret verification inside controller
router.get("/hourly", handleHourly);
router.get("/urgent", handleUrgent);
router.get("/sync", handleSync);
router.get("/cleanup", handleCleanup);

export default router;
