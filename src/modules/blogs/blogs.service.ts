import httpStatus from "http-status";
import ApiError from "../../errorHandler/ApiError";
import { IBlog, IblogFilters } from "./blogs.interface";
import { BlogModel } from "./blogs.model";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../Interface/Interfaces";
import { calculatePagination } from "../../shared/commonFunction";
import { blogSearchableFields } from "./blogs.constant";
import { SortOrder } from "mongoose";

const createBlog = async (BlogData: IBlog): Promise<IBlog | null> => {
  const result = await BlogModel.create(BlogData);
  return result;
};

const getAllBlog = async (
  filters: IblogFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBlog[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: blogSearchableFields.map((field) => ({
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
  const result = await BlogModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await BlogModel.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  const result = await BlogModel.findById({ _id: id });
  return result;
};

const updateBlog = async (
  id: string,
  data: Partial<IBlog>
): Promise<IBlog | null> => {
  const isExist: IBlog | null = await BlogModel.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog not found !");
  }
  const result = await BlogModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await BlogModel.findByIdAndDelete({ _id: id });
  return result;
};
export const BlogService = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
