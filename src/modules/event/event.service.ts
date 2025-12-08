import { IEvent } from "./event.interface";
import { Event } from "./event.modle";

const createEvent = async (palyload: IEvent) => {
  return await Event.create(palyload);
};

const getAllEvents = async () => {
  return await Event.find();
};

export const EventServices = {
  createEvent,
  getAllEvents,
};
