import { Schema, model } from "mongoose";
import { IServices } from "./services.interface";
import { ServiceModel } from "./services.interface";
import { number } from "zod";

const ServiceSchema = new Schema<IServices, ServiceModel>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availableTimeSlots: {
      type: [
        {
          startsTime: Number,
          endsTime: Number,
        },
      ],
    },
    reviewRatings: {
      userId: {
        type: Schema.Types.ObjectId,
      },
      review: {
        type: String,
      },
      rating: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Service = model<IServices, ServiceModel>("Service", ServiceSchema);
