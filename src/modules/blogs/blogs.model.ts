import { Schema, Types, model } from "mongoose";
import { IBlog, IBlogModel } from "./blogs.interface";

const BlogSchema = new Schema<IBlog, IBlogModel>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const BlogModel = model<IBlog, IBlogModel>("Blog", BlogSchema);
