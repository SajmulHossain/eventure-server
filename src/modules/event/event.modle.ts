import { model, Schema } from "mongoose";
import { EventStatus, type IEvent } from "./event.interface";

const eventModel = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date_and_time: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    required_participants: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
    },
    joinning_fee: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(EventStatus),
      required: true,
      default: EventStatus.OPEN,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "EventType",
      required: true,
    },
    host_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedParticipants: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Event = model<IEvent>("Event", eventModel);
