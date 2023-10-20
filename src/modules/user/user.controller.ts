import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { userService } from "./user.service";
import { ObjectId } from "mongoose";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { pick } from "../../shared/commonFunction";
import { userFilterableFields } from "./user.constant";
import { paginationFields } from "../../utils/utils";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    const result = await userService.createUser(userData);

    if (result) {
      delete result.password;
    }
    sendResponse<Partial<IUser>>(res, {
      statusCode: 200,
      success: true,
      message: `${result?.role} created successfully`,
      data: result,
    });
  }
);

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query);
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await userService.getAllUser(filters, paginationOptions);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "user created successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await userService.getSingleUser(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "user retrived successfully",
      data: result,
    });
  }
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    const result = await userService.getMyProfile(accessToken as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "user retrived successfully",
      data: result,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await userService.updateUser(id, updatedData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated succefully",
      data: result,
    });
  }
);

const updateMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    const updatedData = req.body;
    const result = await userService.updateMyProfile(
      accessToken as string,
      updatedData
    );

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated succefully",
      data: result,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await userService.deleteUser(id);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  }
);

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
