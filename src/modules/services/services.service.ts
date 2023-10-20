import { Types, ObjectId } from "mongoose";
import { IQueryData, IServices } from "./services.interface";
import { Service } from "./service.model";
import ApiError from "../../errorHandler/ApiError";
import httpStatus from "http-status";
import { calcSkip } from "../../shared/commonFunction";
import { maxNumber } from "../../utils/utils";
import { ServiceSearchableFields } from "./service.constant";
import { IGenericResponse } from "../../Interface/Interfaces";

const createService = async (
  ServiceData: IServices
): Promise<IServices | null> => {
  const result = await Service.create(ServiceData);
  return result;
};

const getAllService = async (
  queryData: Partial<IQueryData>
): Promise<IGenericResponse<IServices[] | null>> => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    minPrice = 0,
    maxPrice = maxNumber,
    searchTerm,
    startsTime,
    endsTime,
  } = queryData;
  const pagination = calcSkip(page, limit);
  let query: any = {};
  //pricing
  query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  if (startsTime && endsTime) {
    query["availableTimeSlots.startsTime"] = { $gte: Number(startsTime) };
    query["availableTimeSlots.endsTime"] = { $lte: Number(endsTime) };
  }
  //searchTerm
  if (searchTerm) {
    query["$or"] = ServiceSearchableFields.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: "i",
      },
    }));
  }

  //sorting condition
  type TSort = "asc" | "desc";
  const sortCondition: { [key: string]: TSort } = {};
  if (sortBy) {
    sortCondition[sortBy] = (sortOrder as TSort) ?? "asc";
  }

  console.log("query", query);
  const result = await Service.find(query)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  const total = await Service.countDocuments(query);
  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

const getSingleService = async (id: string): Promise<IServices | null> => {
  const result = await Service.findById({ _id: id });
  return result;
};

const updateService = async (
  id: string,
  data: Partial<IServices>
): Promise<IServices | null> => {
  const isExist: IServices | null = await Service.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Service not found !");
  }
  const result = await Service.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteService = async (id: string): Promise<IServices | null> => {
  const result = await Service.findByIdAndDelete({ _id: id });
  return result;
};
export const ServiceService = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
