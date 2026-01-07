/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from "@utils/ApiError";
import { User } from "./user.model";
import { QueryBuilder } from "@utils/QueryBuilder";
import { UserRoles } from "./user.interface";

const getAllUsers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find({ role: UserRoles.USER }), query);
  const users = queryBuilder.filter().search(["name", "email"]).sort().paginate();

  const [data, meta] = await Promise.all([users.build(), users.getMeta()]);

  return {
    data,
    meta,
  };
};

const getAllHosts = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find({ role: UserRoles.HOST }), query);
  const hosts = queryBuilder.filter().search(["name", "email"]).sort().paginate();

  const [data, meta] = await Promise.all([hosts.build(), hosts.getMeta()]);

  return {
    data,
    meta,
  };
};

const getAllAdmins = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    User.find({ role: UserRoles.ADMIN }), query);
  const admins = queryBuilder.filter().search(["name", "email"]).sort().paginate();

  const [data, meta] = await Promise.all([admins.build(), admins.getMeta()]);

  return {
    data,
    meta,
  };
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.password = undefined;

  return user;
};

const updateUser = async (id: string, updateData: Partial<any>) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const forbiddenKeys = ["password", "auths", "role", "email"];
  forbiddenKeys.forEach((key) => delete (updateData as any)[key]);

  Object.assign(user, updateData);

  await user.save();

  user.password = undefined;

  return user;
};

export const UserServices = {
  getAllUsers,
  getAllHosts,
  getAllAdmins,
  getSingleUser,
  updateUser,
};
