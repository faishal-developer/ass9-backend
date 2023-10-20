import { NextFunction, Request, Response } from "express";
import { catchAsync, sendResponse } from "../../shared/catchAsync";
import { IFaq } from "./faq.interface";
import { FaqModel } from "./faq.model";
import httpStatus from "http-status";
import { FaqService } from "./Faq.service";
import { paginationFields } from "../../utils/utils";
import { pick } from "../../shared/commonFunction";
import { faqFilterableFields } from "./faq.constant";

const createFaq = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const FaqData = req.body;
    const result = await FaqService.createFaq(FaqData);

    sendResponse<Partial<IFaq>>(res, {
      statusCode: 200,
      success: true,
      message: `Faq created successfully`,
      data: result,
    });
  }
);

const getAllFaq = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, faqFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await FaqService.getAllFaq(filters, paginationOptions);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Faq retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFaq = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await FaqService.getSingleFaq(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result == null ? "Failed to get" : "Faq retrived successfully",
      data: result,
    });
  }
);

const updateFaq = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await FaqService.updateFaq(id, updatedData);

    sendResponse<IFaq>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faq updated succefully",
      data: result,
    });
  }
);

const deleteFaq = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await FaqService.deleteFaq(id);

    sendResponse<IFaq>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faq deleted successfully!",
      data: result,
    });
  }
);

export const FaqController = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
