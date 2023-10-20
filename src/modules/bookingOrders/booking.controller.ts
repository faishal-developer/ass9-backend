import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { IBooking } from "./booking.interface";
import { BookingService } from "./booking.service";
import httpStatus from "http-status";
import { pick } from "../../shared/commonFunction";
import { paginationFields } from "../../utils/utils";
import { bookingFilterableFields } from "./booking.constants";

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const BookingData = req.body;
    const result = await BookingService.createBooking(BookingData);

    sendResponse<Partial<IBooking[]>>(res, {
      statusCode: 200,
      success: true,
      message: `Booking created successfully`,
      data: result,
    });
  }
);

const getAllBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, bookingFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await BookingService.getAllBooking(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        result == null ? "Failed to get" : "Booking retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await BookingService.getSingleBooking(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message:
        result == null ? "Failed to get" : "Booking retrived successfully",
      data: result,
    });
  }
);

const updateBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await BookingService.updateBooking(id, updatedData);

    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking updated succefully",
      data: result,
    });
  }
);

const deleteBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await BookingService.deleteBooking(id);

    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking deleted successfully!",
      data: result,
    });
  }
);

export const BookingController = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
