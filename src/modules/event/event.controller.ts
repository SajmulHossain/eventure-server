import { catchAsync } from "@utils/catchAsync";
import { sendResponse } from "@utils/sendResponse";
import { EventServices } from "./event.service";
import { User } from "@modules/user/user.model";
import { ApiError } from "@utils/ApiError";
import { JwtPayload } from "jsonwebtoken";

const getAllEvents = catchAsync(async (req, res) => {
  const { data, meta } = await EventServices.getAllEvents(
    req.query as Record<string, string>
  );

  sendResponse(res, {
    message: "Events retrived successfully",
    statusCode: 200,
    data,
    meta,
  });
});

const createEvent = catchAsync(async (req, res) => {
  const data = await EventServices.createEvent(req.body);

  sendResponse(res, {
    message: "Events created successfully",
    statusCode: 201,
    data,
  });
});

const handleJoin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const userEmail = (req.user as JwtPayload)?.email;
  if (!userEmail) {
    throw new ApiError(401, "User not authenticated");
  }

  // Find user to get their ID
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const data = await EventServices.handleJoin(
    id as string,
    user._id.toString()
  );

  sendResponse(res, {
    message: "Successfully joined the event",
    statusCode: 200,
    data,
  });
});

const getSingleEvent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await EventServices.getSingleEvent(id);

  sendResponse(res, {
    message: "Events retrived successfully",
    statusCode: 201,
    data,
  });
});

const getUpcomingEvents = catchAsync(async (req, res) => {
  const userId = (req.user as JwtPayload)?.id;
  const userRole = (req.user as JwtPayload)?.role;
 
  const data = await EventServices.getUpcomingEvents(userId as string, userRole as string);

  sendResponse(res, {
    message: "Upcoming events retrived successfully",
    statusCode: 200,
    data,
  });
});

const getCompletedEvents = catchAsync(async (req, res) => {
  const userId = (req.user as JwtPayload)?.id;
 
  const data = await EventServices.getCompletedEvents(userId as string);

  sendResponse(res, {
    message: "Completed events retrived successfully",
    statusCode: 200,
    data,
  });
});

export const EventController = {
  getAllEvents,
  createEvent,
  handleJoin,
  getSingleEvent,
  getUpcomingEvents,
  getCompletedEvents
};
