import { Router } from "express";
import { googleAuth, googleCallback, logout } from "@/controllers/auth";

const router = Router();

router.get("/google", googleAuth);

router.get("/google/callback", googleCallback);

router.post("/logout", logout);

export default router;
