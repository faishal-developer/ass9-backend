import express from "express";
import { validateRequest } from "../../middleWares/validateRequest";
import { loginZodValidataion } from "./auth.zod";
import { authController } from "./auth.controller";

const router = express.Router();

router.post(
  "/admins/login",
  validateRequest(loginZodValidataion.loginSchema),
  authController.login
);
router.post(
  "/auth/login",
  validateRequest(loginZodValidataion.loginSchema),
  authController.login
);

router.post(
  "/auth/refresh-token",
  validateRequest(loginZodValidataion.refreshTokenZodSchema),
  authController.refreshToken
);
export const AuthRoutes = router;
