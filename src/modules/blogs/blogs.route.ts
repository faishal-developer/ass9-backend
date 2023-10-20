import express from "express";
import { validateRequest } from "../../middleWares/validateRequest";
import { auth } from "../../shared/Authorization";
import { userRoles } from "../../utils/utils";
import { blogZodValidataion } from "./blogs.zod";
import { BlogController } from "./blogs.controller";

const router = express.Router();

router.post(
  "/blog/create",
  validateRequest(blogZodValidataion.createBlog),
  auth([userRoles.admin, userRoles.super_admin, userRoles.user]),
  BlogController.createBlog
);

router.get("/blog/:id", BlogController.getSingleBlog);

router.delete(
  "/blog/:id",
  auth([userRoles.admin, userRoles.super_admin]),
  BlogController.deleteBlog
);

router.patch(
  "/blog/:id",
  validateRequest(blogZodValidataion.updateBlog),
  auth([userRoles.admin, userRoles.super_admin]),
  BlogController.updateBlog
);

router.get("/blog", BlogController.getAllBlog);

export const BlogRoutes = router;
