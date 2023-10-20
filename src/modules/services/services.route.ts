import express from "express";
import { validateRequest } from "../../middleWares/validateRequest";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";
import { serviceZodValidataion } from "./service.zod";
import { ServiceController } from "./services.controller";

const router = express.Router();

router.post(
  "/service/create",
  validateRequest(serviceZodValidataion.createService),
  auth([userRoles.admin, userRoles.super_admin]),
  ServiceController.createService
);

router.get("/service/:id", ServiceController.getSingleService);

router.delete(
  "/service/:id",
  auth([userRoles.admin, userRoles.super_admin]),
  ServiceController.deleteService
);

router.patch(
  "/service/:id",
  validateRequest(serviceZodValidataion.updateService),
  auth([userRoles.admin, userRoles.super_admin]),
  ServiceController.updateService
);

router.get("/service", ServiceController.getAllService);

export const ServiceRoutes = router;
