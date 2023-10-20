import { Model, Schema } from "mongoose";
import { type } from "os";

export type IFaq = {
  userId: Schema.Types.ObjectId;
  question: string;
  ans?: string;
};

export type IFaqModel = Model<IFaq>;

export type IFaqFilters = {
  searchTerm?: string;
};
