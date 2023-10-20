"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleWares/validateRequest");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const booking_zod_1 = require("./booking.zod");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/booking/create", (0, validateRequest_1.validateRequest)(booking_zod_1.BookingZodValidataion.createBooking), (0, Authorization_1.auth)([utils_1.userRoles.user, utils_1.userRoles.admin, utils_1.userRoles.super_admin]), booking_controller_1.BookingController.createBooking);
router.get("/booking/:id", booking_controller_1.BookingController.getSingleBooking);
router.delete("/booking/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin, utils_1.userRoles.admin]), booking_controller_1.BookingController.deleteBooking);
router.patch("/booking/:id", (0, validateRequest_1.validateRequest)(booking_zod_1.BookingZodValidataion.updateBooking), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), booking_controller_1.BookingController.updateBooking);
router.get("/booking", booking_controller_1.BookingController.getAllBooking);
exports.BookingRoutes = router;
