import { model, Schema } from "mongoose";
import { IEventType } from "./type.interface";

const eventTypeModel = new Schema<IEventType>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const EventType = model<IEventType>("EventType", eventTypeModel);