import { Model, Schema } from "mongoose";

export type IBlog = {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  image: string;
};

export type IBlogModel = Model<IBlog>;

export type IblogFilters = {
  searchTerm?: string;
};
