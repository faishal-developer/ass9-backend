import { Types, ObjectId, SortOrder } from "mongoose";
import { IBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import ApiError from "../../errorHandler/ApiError";
import httpStatus from "http-status";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../Interface/Interfaces";
import { calculatePagination } from "../../shared/commonFunction";

const createBooking = async (
  BookingData: IBooking[]
): Promise<IBooking[] | null> => {
  const result = await BookingModel.insertMany(BookingData);
  return result;
};

const getAllBooking = async (
  filters: Partial<IBooking>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[] | null>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { ...filtersData } = filters;

  const andConditions = [];
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await BookingModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await BookingModel.countDocuments(whereConditions);
  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await BookingModel.findById({ _id: id });
  return result;
};

const updateBooking = async (
  id: string,
  data: Partial<IBooking>
): Promise<IBooking | null> => {
  const isExist: IBooking | null = await BookingModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Booking not found !");
  }
  const result = await BookingModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await BookingModel.findByIdAndDelete({ _id: id });
  return result;
};
export const BookingService = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
