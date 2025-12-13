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

const createEvent = catchAsync(async (req, res) => {
  console.log(req.body);
  const data = await EventServices.createEvent(req.body);

  sendResponse(res, {
    message: "Events created successfully",
    statusCode: 201,
    data,
  });
});

export const EventController = {
  getAllEvents,
  createEvent
};
