import { EventType } from "./event.model";
import { IEventType } from "./type.interface";

const getAllEventTypes = async () => {
 return await EventType.find();
};

const getSingleEventType = async (id: string) => {
  return await EventType.findById(id);
}

const createEventType = async (payload: IEventType) => {
    return await EventType.create(payload);
}

export const EventTypeService = {
    getAllEventTypes,
    getSingleEventType,
    createEventType,
}