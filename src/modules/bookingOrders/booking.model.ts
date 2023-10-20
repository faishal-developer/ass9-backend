import { Schema, model } from "mongoose";
import { IBooking, BookingModel as IBookingModel } from "./booking.interface";

const BookingSchema = new Schema<IBooking, IBookingModel>(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timeSlot: {
      startsTime: {
        type: Number,
        required: true,
      },
      endsTime: {
        type: Number,
        required: true,
      },
    },
    status: {
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

export const BookingModel = model<IBooking, IBookingModel>(
  "Booking",
  BookingSchema
);
