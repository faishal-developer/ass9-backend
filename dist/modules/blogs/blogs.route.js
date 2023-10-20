"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleWares/validateRequest");
const Authorization_1 = require("../../shared/Authorization");
const utils_1 = require("../../utils/utils");
const blogs_zod_1 = require("./blogs.zod");
const blogs_controller_1 = require("./blogs.controller");
const router = express_1.default.Router();
router.post("/blog/create", (0, validateRequest_1.validateRequest)(blogs_zod_1.blogZodValidataion.createBlog), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin, utils_1.userRoles.user]), blogs_controller_1.BlogController.createBlog);
router.get("/blog/:id", blogs_controller_1.BlogController.getSingleBlog);
router.delete("/blog/:id", (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), blogs_controller_1.BlogController.deleteBlog);
router.patch("/blog/:id", (0, validateRequest_1.validateRequest)(blogs_zod_1.blogZodValidataion.updateBlog), (0, Authorization_1.auth)([utils_1.userRoles.admin, utils_1.userRoles.super_admin]), blogs_controller_1.BlogController.updateBlog);
router.get("/blog", blogs_controller_1.BlogController.getAllBlog);
exports.BlogRoutes = router;
