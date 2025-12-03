import { catchAsync } from "@utils/catchAsync";
import { sendResponse } from "@utils/sendResponse";
import { EventTypeService } from "./type.service";

const createEventType = catchAsync(async (req, res) => {
  const data = await EventTypeService.createEventType(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Event Type created successfully",
    data,
  });
});

const getAllEventTypes = catchAsync(async (req, res) => {
  const data = await EventTypeService.getAllEventTypes();
  sendResponse(res, {
    statusCode: 200,
    message: "Event Types retrieved successfully",
    data,
  });
});

const getSingleEventType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = await EventTypeService.getSingleEventType(id);
  sendResponse(res, {
    statusCode: 200,
    message: "Event Type retrieved successfully",
    data,
  });
});

export const EventTypeController = {
  createEventType,
  getAllEventTypes,
  getSingleEventType,
};
