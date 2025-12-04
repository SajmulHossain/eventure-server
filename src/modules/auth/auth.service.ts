import { IUser } from "@modules/user/user.interface";
import { User } from "@modules/user/user.model";
import { ApiError } from "@utils/ApiError";
import { hashPassword, hashPassword } from "@utils/hashPassword";
import { compare } from "bcryptjs";

const register = async ({ email, password, ...rest }: Partial<IUser>) => {
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await hashPassword(password as string);

  const authProvider = {
    provider: "credentials" as const,
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  user.password = undefined;

  return user;
};

const updateProfile = async (userId: string, updateData: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.password = undefined;
  return user;
};

const changePassword = async (userId: string, password:{oldPassword: string, newPassword: string }) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await compare(password.oldPassword, user.password as string);
  if (!isMatch) {
    throw new ApiError(400, "Old password is incorrect");
  }

  const hashedPassword = await hashPassword(password.newPassword);

  user.password = hashedPassword;
  await user.save();
  user.password = undefined;
  return user;
}

export const AuthServices = {
    register,
    updateProfile,
    changePassword,
}