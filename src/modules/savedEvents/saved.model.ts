import { model, Schema } from "mongoose";
import { ISavedEvent } from "./saved.interface";

const savedEventModel = new Schema<ISavedEvent>(
  {
    event_id: {
      type: Schema.ObjectId,
      required: true,
    },
    user_id: { type: Schema.ObjectId, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const SavedEvent = model<ISavedEvent>("SavedEvent", savedEventModel);