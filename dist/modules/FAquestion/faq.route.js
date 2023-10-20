"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleWares/validateRequest");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const faq_zod_1 = require("./faq.zod");
const Faq_controller_1 = require("./Faq.controller");
const router = express_1.default.Router();
router.post("/faq/create", (0, validateRequest_1.validateRequest)(faq_zod_1.FaqZodValidataion.createFaq), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin, utils_1.userRoles.user]), Faq_controller_1.FaqController.createFaq);
router.get("/faq/:id", Faq_controller_1.FaqController.getSingleFaq);
router.delete("/faq/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), Faq_controller_1.FaqController.deleteFaq);
router.patch("/faq/:id", (0, validateRequest_1.validateRequest)(faq_zod_1.FaqZodValidataion.updateFaq), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), Faq_controller_1.FaqController.updateFaq);
router.get("/faq", Faq_controller_1.FaqController.getAllFaq);
exports.FaqRoutes = router;
