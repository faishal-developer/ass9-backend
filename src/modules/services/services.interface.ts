import { Model, Types } from "mongoose";

type ITimeSlots = {
  startsTime: number;
  endsTime: number;
};

type IreviewRatings = {
  userId: Types.ObjectId;
  review: string;
  rating: number;
};
export type IServices = {
  name: string;
  price: number;
  description: string;
  image: string;
  availableTimeSlots?: ITimeSlots[];
  reviewRatings?: IreviewRatings[];
};

export type ServiceModel = Model<IServices>;

export type IQueryData = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  minPrice?: string;
  maxPrice?: string;
  searchTerm?: string;
  price?: string;
  startsTime?: string;
  endsTime?: string;
};
