import { model, Schema } from "mongoose";
import { UserRoles, type IUser } from "./user.interface";

const userModel = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  auths: {
    type: [
      {
        provider: {
          type: String,
          enum: ["google", "credentials"],
          required: true,
          default: "credentials",
        },
        providerId: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRoles),
    required: true,
    default: UserRoles.USER,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>("User", userModel);
