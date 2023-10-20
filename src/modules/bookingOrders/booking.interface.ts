import { Model, Types } from "mongoose";

export type IBooking = {
  serviceId: Types.ObjectId;
  userId: Types.ObjectId;
  timeSlot: {
    startsTime: number;
    endsTime: number;
  };
  status: string;
};

export type BookingModel = Model<IBooking>;
