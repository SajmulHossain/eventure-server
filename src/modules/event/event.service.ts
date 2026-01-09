import { QueryBuilder } from "@utils/QueryBuilder";
import { IEvent, EventStatus } from "./event.interface";
import { Event } from "./event.modle";
import { ApiError } from "@utils/ApiError";
import { UserRoles } from "@modules/user/user.interface";
import { SavedEvent } from "@modules/savedEvents/saved.model";
import { User } from "@modules/user/user.model";

const createEvent = async (palyload: IEvent) => {
  return await Event.create(palyload);
};

const getAllEvents = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(
    Event.find().populate("host_id type"),
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
  const event = await Event.findById(id).populate("host_id type");

  if (!event) {
    throw new ApiError(404, "Event not found!");
  }

  return event;
};

const getUpcomingEvents = async (id: string, role: string) => {
  if (role === UserRoles.USER) {
    const events = await Event.find({
      joinedParticipants: { $in: [id] },
      status: { $in: [EventStatus.OPEN, EventStatus.FULL] },
    }).populate("type host_id");

    return events;
  } else if (role === UserRoles.HOST) {
    const events = await Event.find({
      host_id: id,
      status: { $in: [EventStatus.OPEN, EventStatus.FULL] },
    }).populate("type host_id");

    return events;
  } else {
    return [];
  }
};

const getCompletedEvents = async (id: string) => {
  const events = await Event.find({
    host_id: id,
    status: EventStatus.COMPLETED,
  }).populate("type host_id");
  return events;
};

const getMyEvents = async (id: string) => {
  const events = await Event.find({ joinedParticipants: { $in: [id] } });

  return events;
};

const getHostedEvents = async (id: string) => {
  return await Event.find({ host_id: id, status: EventStatus.COMPLETED });
}

const deleteEvent = async (userId: string ,id: string) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  const user = await User.findById(userId);

  if (user?._id.toString() !== event?.host_id.toString()) {
    throw new ApiError(400, "You Are not permitted to delete it");
  }

  return await Event.findByIdAndDelete(id);
}

export const EventServices = {
  createEvent,
  getAllEvents,
  handleJoin,
  getSingleEvent,
  getUpcomingEvents,
  getCompletedEvents, 
  getMyEvents,
  getHostedEvents,
  deleteEvent
};
