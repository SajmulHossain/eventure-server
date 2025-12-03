import { catchAsync } from "@utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "@utils/sendResponse";

const register = catchAsync(async (req, res) => {
  const data = await UserServices.register(req.body);

  sendResponse(res, {
    statusCode: 201,
    data,
    message: "User Registered Successfully",
  });
});

const getAllUsers = catchAsync(async (_req, res) => {
  const data = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    data,
    message: "User Retrived Successfully",
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await UserServices.getSingleUser(id as string);

  sendResponse(res, {
    statusCode: 200,
    data,
    message: "User Retrived Successfully",
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await UserServices.updateUser(id as string);

  sendResponse(res, {
    statusCode: 200,
    data,
    message: "User Updated Successfully",
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  register,
};
