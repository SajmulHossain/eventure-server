import { QueryBuilder } from "@utils/QueryBuilder";
import { IEvent, EventStatus } from "./event.interface";
import { Event } from "./event.modle";
import { ApiError } from "@utils/ApiError";

const createEvent = async (palyload: IEvent) => {
  return await Event.create(palyload);
};

const getAllEvents = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    Event.find().populate("host_id"),
    query
  );

  const events = queryBuilder
    .filter()
    .search(["name", "location"])
    .sort()
    .paginate();

  const [data, meta] = await Promise.all([events.build(), events.getMeta()]);

  return {
    data,
    meta,
  };
};

const handleJoin = async (eventId: string, userId: string) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.status === EventStatus.FULL) {
    throw new ApiError(400, "Event is already full");
  }

  if (
    event.status === EventStatus.CANCELLED ||
    event.status === EventStatus.COMPLETED
  ) {
    throw new ApiError(400, "Cannot join this event");
  }

  const isAlreadyJoined = event.joinedParticipants.some(
    (id) => id.toString() === userId
  );

  if (isAlreadyJoined) {
    throw new ApiError(400, "You have already joined this event");
  }

  event.joinedParticipants.push(userId as any);

  if (event.joinedParticipants.length >= event.required_participants) {
    event.status = EventStatus.FULL;
  }

  await event.save();

  return event;
};

const getSingleEvent = async (id: string) => {
  const event = await Event.findById(id).populate("host_id");

  if (!event) {
    throw new ApiError(404, "Event not found!");
  }

  return event;
};

export const EventServices = {
  createEvent,
  getAllEvents,
  handleJoin,
  getSingleEvent
};
