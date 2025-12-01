import { model, Schema } from "mongoose";
import type { IUser } from "./user.interface";

const userModel = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  profile_photo: {
    type: String
  },
  bio: {
    type: String,
    required: true
  },
  interests: {
    type: [String],
    required: true
  },
  location: {
    type: String,
    required: true
  }
})

export const User = model<IUser>("User", userModel);