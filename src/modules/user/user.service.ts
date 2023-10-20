import { Types, ObjectId, SortOrder } from "mongoose";
import { IUser } from "./user.interface";
import { User, role } from "./user.model";
import ApiError from "../../errorHandler/ApiError";
import httpStatus from "http-status";
import {
  calcSkip,
  calculatePagination,
  verifyAccessToken,
} from "../../shared/commonFunction";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../Interface/Interfaces";

const createUser = async (user: IUser): Promise<IUser | null> => {
  console.log("fine");

  const isExist = await User.findOne({
    email: user.email,
  });
  if (isExist) {
    throw new ApiError(409, "Email is allready used");
  }
  const result = await User.create(user);
  const userData = result.toObject();
  return userData;
};

const getAllUser = async (
  filters: Partial<IUser>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[] | null>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
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

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments(whereConditions);
  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById({ _id: id });
  return result;
};

const getMyProfile = async (accessToken: string) => {
  const verifiedUser = verifyAccessToken(accessToken);
  const result = await User.findOne({ email: verifiedUser.email });
  return result;
};

const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const isExist: IUser | null = await User.findById({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const result = await User.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const updateMyProfile = async (
  accessToken: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  if (Object.keys(data).length <= 0) {
    throw new ApiError(404, "No content found to update");
  }
  if (data.email) {
    throw new ApiError(409, "Please don't change phone number");
  }
  const verifiedUser = verifyAccessToken(accessToken);
  console.log(verifiedUser);

  const isExist: IUser | null = await User.findOne({
    email: verifiedUser.email,
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }

  const result = await User.findOneAndUpdate(
    { email: verifiedUser.email },
    data,
    {
      new: true,
    }
  );
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};
export const userService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
