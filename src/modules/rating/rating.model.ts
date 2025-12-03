import { model, Schema } from "mongoose";
import type { IRating } from "./rating.interface";

const ratingModel = new Schema<IRating>(
  {
    userId: {
      type: String,
      required: true,
    },
    hostId: {
      type: String,
      required: true,
    },

    eventId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Rating = model<IRating>("Rating", ratingModel);