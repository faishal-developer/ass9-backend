import express from "express";
import { validateRequest } from "../../middleWares/validateRequest";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";
import { BookingZodValidataion } from "./booking.zod";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post(
  "/booking/create",
  validateRequest(BookingZodValidataion.createBooking),
  auth([userRoles.user, userRoles.admin, userRoles.super_admin]),
  BookingController.createBooking
);

router.get("/booking/:id", BookingController.getSingleBooking);

router.delete(
  "/booking/:id",
  auth([userRoles.admin, userRoles.super_admin, userRoles.admin]),
  BookingController.deleteBooking
);

router.patch(
  "/booking/:id",
  validateRequest(BookingZodValidataion.updateBooking),
  auth([userRoles.admin, userRoles.super_admin]),
  BookingController.updateBooking
);

router.get("/booking", BookingController.getAllBooking);

export const BookingRoutes = router;
