/* eslint-disable no-console */
import { User } from "./user.model";

const getAllUsers = async() => {
    return User.find();
}

const getSingleUser = async(id: string) => {
    console.log(id);
}
const updateUser = async(id: string) => {
    console.log(id);
}

export const UserServices = {
    getAllUsers,
    getSingleUser,
    updateUser,
}