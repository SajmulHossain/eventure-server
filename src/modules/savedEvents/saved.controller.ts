import { catchAsync } from "@utils/catchAsync";
import { SavedEventServices } from "./saved.service";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "@utils/sendResponse";

const createSave = catchAsync(async (req, res) => {
  const { id } = req.body;
  const user_id = (req.user as JwtPayload)?.id;

  const data = await SavedEventServices.createSave(user_id, id);

   sendResponse(res, {
    statusCode: 201,
    message: "Event save status changed successfully",
    data,
  });
});

const isSaved = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user_id = (req.user as JwtPayload)?.id;

  const data = await SavedEventServices.isSaved(user_id, id);

  sendResponse(res, {
    statusCode: 200,
    message: "Event is saved status fetched successfully",
    data,
  });
});


const getSavedEvents = catchAsync(async (req, res) => {
  const userId = (req.user as JwtPayload)?.id;
 
  const data = await SavedEventServices.getSavedEvents(userId as string);

  sendResponse(res, {
    message: "Saved events retrived successfully",
    statusCode: 200,
    data,
  });
});

export const SavedEventController = {
  createSave,
  isSaved,
  getSavedEvents
};
