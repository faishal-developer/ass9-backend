import express from "express";
import { validateRequest } from "../../middleWares/validateRequest";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";
import { FaqZodValidataion } from "./faq.zod";
import { FaqController } from "./Faq.controller";

const router = express.Router();

router.post(
  "/faq/create",
  validateRequest(FaqZodValidataion.createFaq),
  auth([userRoles.admin, userRoles.super_admin, userRoles.user]),
  FaqController.createFaq
);

router.get("/faq/:id", FaqController.getSingleFaq);

router.delete(
  "/faq/:id",
  auth([userRoles.admin, userRoles.super_admin]),
  FaqController.deleteFaq
);

router.patch(
  "/faq/:id",
  validateRequest(FaqZodValidataion.updateFaq),
  auth([userRoles.admin, userRoles.super_admin]),
  FaqController.updateFaq
);

router.get("/faq", FaqController.getAllFaq);

export const FaqRoutes = router;
