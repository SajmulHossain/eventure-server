import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

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
};
