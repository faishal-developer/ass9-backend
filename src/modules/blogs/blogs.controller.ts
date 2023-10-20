import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { IBlog } from "./blogs.interface";
import { BlogModel } from "./blogs.model";
import httpStatus from "http-status";
import { BlogService } from "./blogs.service";
import { pick } from "../../shared/commonFunction";
import { paginationFields } from "../../utils/utils";
import { blogFilterableFields } from "./blogs.constant";
import { Query } from "mongoose";

const createBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const BlogData = req.body;
    const result = await BlogService.createBlog(BlogData);

    sendResponse<Partial<IBlog>>(res, {
      statusCode: 200,
      success: true,
      message: `Blog created successfully`,
      data: result,
    });
  }
);

const getAllBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, blogFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await BlogService.getAllBlog(filters, paginationOptions);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Blog retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await BlogService.getSingleBlog(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Blog retrived successfully",
      data: result,
    });
  }
);

const updateBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await BlogService.updateBlog(id, updatedData);

    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog updated succefully",
      data: result,
    });
  }
);

const deleteBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await BlogService.deleteBlog(id);

    sendResponse<IBlog>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog deleted successfully!",
      data: result,
    });
  }
);

export const BlogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
