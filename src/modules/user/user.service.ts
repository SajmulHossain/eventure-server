/* eslint-disable no-console */
import { ApiError } from "@utils/ApiError";
import { User } from "./user.model";

const getAllUsers = async () => {
  return User.find();
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.password = undefined;

  return user;
};
const updateUser = async (id: string) => {
  console.log(id);
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
};
