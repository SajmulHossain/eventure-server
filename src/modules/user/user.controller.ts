import { catchAsync } from "@utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "@utils/sendResponse";

const getAllUsers = catchAsync(async (req, res) => {
  const { data, meta } = await UserServices.getAllUsers(req.query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    meta,
    data,
    message: "Users retrieved successfully",
  });
});

const getAllHosts = catchAsync(async (req, res) => {
  const { data, meta } = await UserServices.getAllHosts(req.query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    meta,
    data,
    message: "Hosts retrieved successfully",
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const { data, meta } = await UserServices.getAllAdmins(req.query as Record<string, string>);

  sendResponse(res, {
    statusCode: 200,
    meta,
    data,
    message: "Admins retrieved successfully",
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
  const data = await UserServices.updateUser(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    data,
    message: "User Updated Successfully",
  });
});

export const UserControllers = {
  getAllUsers,
  getAllHosts,
  getAllAdmins,
  getSingleUser,
  updateUser,
};
