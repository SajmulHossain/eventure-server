import { catchAsync } from "@utils/catchAsync";
import { sendResponse } from "@utils/sendResponse";
import { EventServices } from "./event.service";

const getAllEvents = catchAsync(async (req, res) => {
  const data = await EventServices.getAllEvents();

  sendResponse(res, {
    message: "Events retrived successfully",
    statusCode: 200,
    data,
  });
});

export const EventController = {
    getAllEvents
}