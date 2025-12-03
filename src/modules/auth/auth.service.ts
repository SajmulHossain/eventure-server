import { IUser } from "@modules/user/user.interface";
import { User } from "@modules/user/user.model";
import { ApiError } from "@utils/ApiError";
import { hashPassword } from "@utils/hashPassword";

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

export const AuthServices = {
    register,
}