import { Types, ObjectId, SortOrder } from "mongoose";
import { IFaq, IFaqFilters } from "./faq.interface";
import { FaqModel } from "./faq.model";
import ApiError from "../../errorHandler/ApiError";
import httpStatus from "http-status";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../Interface/Interfaces";
import { calculatePagination } from "../../shared/commonFunction";
import { faqSearchableFields } from "./faq.constant";

const createFaq = async (FaqData: IFaq): Promise<IFaq | null> => {
  const result = await FaqModel.create(FaqData);
  return result;
};

const getAllFaq = async (
  filters: IFaqFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaq[] | null>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: faqSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: "i",
        },
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await FaqModel.find(whereConditions)
    .populate("userId")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await FaqModel.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaq = async (id: string): Promise<IFaq | null> => {
  const result = await FaqModel.findById({ _id: id });
  return result;
};

const updateFaq = async (
  id: string,
  data: Partial<IFaq>
): Promise<IFaq | null> => {
  const isExist: IFaq | null = await FaqModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Faq not found !");
  }
  const result = await FaqModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteFaq = async (id: string): Promise<IFaq | null> => {
  const result = await FaqModel.findByIdAndDelete({ _id: id });
  return result;
};
export const FaqService = {
  createFaq,
  getAllFaq,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
