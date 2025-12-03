import { model, Schema } from "mongoose";
import { UserRoles, type IUser } from "./user.interface";

const authProviderSchema = new Schema<IUser["auths"][0]>(
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
  { _id: false }
);

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
    type: [authProviderSchema],
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
}, {
  timestamps: true,
  versionKey: false,
});

export const User = model<IUser>("User", userModel);
