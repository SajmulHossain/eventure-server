import { QueryBuilder } from "@utils/QueryBuilder";
import { IRating } from "./rating.interface";
import { Rating } from "./rating.model";
import { User } from "@modules/user/user.model";
import { UserRoles } from "@modules/user/user.interface";

const createRating = async (payload: IRating) => {
  const rating = await Rating.create(payload);
  return rating;
};

const getAllRatings = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Rating.find(), query);

  const ratings = queryBuilder.filter().sort().paginate();

  const [data, meta] = await Promise.all([ratings.build(), ratings.getMeta()]);

  return {
    data,
    meta,
  };
};

const getRatingsByEvent = async (eventId: string, query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Rating.find({ eventId }), query);

  const ratings = queryBuilder.filter().sort().paginate();

  const [data, meta] = await Promise.all([ratings.build(), ratings.getMeta()]);

  return {
    data,
    meta,
  };
};

const getRatingsByHost = async (hostId: string, query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Rating.find({ hostId }), query);

  const ratings = queryBuilder.filter().sort().paginate();

  const [data, meta] = await Promise.all([ratings.build(), ratings.getMeta()]);

  return {
    data,
    meta,
  };
};

export const RatingServices = {
  createRating,
  getAllRatings,
  getRatingsByEvent,
  getRatingsByHost,
};


