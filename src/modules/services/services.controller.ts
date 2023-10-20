import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { IServices } from "./services.interface";
import { ServiceService } from "./services.service";
import httpStatus from "http-status";

const createService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ServiceData = req.body;
    const result = await ServiceService.createService(ServiceData);

    sendResponse<Partial<IServices>>(res, {
      statusCode: 200,
      success: true,
      message: `Service created successfully`,
      data: result,
    });
  }
);

const getAllService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryData = req.query;
    const result = await ServiceService.getAllService(queryData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        result == null ? "Failed to get" : "Service retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await ServiceService.getSingleService(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        result == null ? "Failed to get" : "Service retrived successfully",
      data: result,
    });
  }
);

const updateService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ServiceService.updateService(id, updatedData);

    sendResponse<IServices>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service updated succefully",
      data: result,
    });
  }
);

const deleteService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await ServiceService.deleteService(id);

    sendResponse<IServices>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Service deleted successfully!",
      data: result,
    });
  }
);

export const ServiceController = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
