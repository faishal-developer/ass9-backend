"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleWares/validateRequest");
const user_zod_1 = require("./user.zod");
const user_controller_1 = require("./user.controller");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const router = express_1.default.Router();
router.post("/auth/signup", (0, validateRequest_1.validateRequest)(user_zod_1.userZodValidataion.createUser), user_controller_1.userController.createUser);
router.get("/users/my-profile", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.user, utils_1.userRoles.super_admin]), user_controller_1.userController.getMyProfile);
router.patch("/users/my-profile", (0, validateRequest_1.validateRequest)(user_zod_1.userZodValidataion.updateUser), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin, utils_1.userRoles.user]), user_controller_1.userController.updateMyProfile);
router.get("/users/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), user_controller_1.userController.getSingleUser);
router.delete("/users/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), user_controller_1.userController.deleteUser);
router.patch("/users/:id", (0, validateRequest_1.validateRequest)(user_zod_1.userZodValidataion.updateUser), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), user_controller_1.userController.updateUser);
router.get("/users", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), user_controller_1.userController.getAllUser);
exports.UserRoutes = router;