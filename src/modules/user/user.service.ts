/* eslint-disable no-console */
import { ApiError } from "@utils/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { hashPassword } from "@utils/hashPassword";

const getAllUsers = async() => {
    return User.find();
}

const getSingleUser = async(id: string) => {
    console.log(id);
}
const updateUser = async(id: string) => {
    console.log(id);
}

const register = async({email, password, ...rest}: Partial<IUser>) => {
    const isUserExist = await User.findOne({ email });
    if(isUserExist){
        throw new ApiError(400, 'User already exists');
    }

    const hashedPassword = await hashPassword(password as string);

    const authProvider = {
      provider: "credentials" as const,
      providerId: email as string,
    };

  const user =  await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    });

    user.password = undefined;

    return user;
}

export const UserServices = {
    getAllUsers,
    getSingleUser,
    updateUser,
    register
}