"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleWares/validateRequest");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const service_zod_1 = require("./service.zod");
const services_controller_1 = require("./services.controller");
const router = express_1.default.Router();
router.post("/service/create", (0, validateRequest_1.validateRequest)(service_zod_1.serviceZodValidataion.createService), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), services_controller_1.ServiceController.createService);
router.get("/service/:id", services_controller_1.ServiceController.getSingleService);
router.delete("/service/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), services_controller_1.ServiceController.deleteService);
router.patch("/service/:id", (0, validateRequest_1.validateRequest)(service_zod_1.serviceZodValidataion.updateService), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), services_controller_1.ServiceController.updateService);
router.get("/service", services_controller_1.ServiceController.getAllService);
exports.ServiceRoutes = router;
