import { catchAsync } from "@utils/catchAsync";
import { sendResponse } from "@utils/sendResponse";
import { RatingServices } from "./rating.service";

const createRating = catchAsync(async (req, res) => {
  const data = await RatingServices.createRating(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Rating created successfully",
    data,
  });
});

const getAllRatings = catchAsync(async (req, res) => {
  const { data, meta } = await RatingServices.getAllRatings(
    req.query as Record<string, string>
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Ratings retrieved successfully",
    data,
    meta,
  });
});

const getRatingsByEvent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { data, meta } = await RatingServices.getRatingsByEvent(
    id as string,
    req.query as Record<string, string>
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Event ratings retrieved successfully",
    data,
    meta,
  });
});

const getRatingsByHost = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { data, meta } = await RatingServices.getRatingsByHost(
    id as string,
    req.query as Record<string, string>
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Host ratings retrieved successfully",
    data,
    meta,
  });
});

export const RatingController = {
  createRating,
  getAllRatings,
  getRatingsByEvent,
  getRatingsByHost,
};


