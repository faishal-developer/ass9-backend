import { Schema, Types, model } from "mongoose";
import { IFaqModel, IFaq } from "./faq.interface";

const blogSchema = new Schema<IFaq, IFaqModel>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: String,
      required: true,
      unique: true,
    },
    ans: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const FaqModel = model<IFaq, IFaqModel>("Faq", blogSchema);
