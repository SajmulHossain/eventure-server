import { IEvent } from "./event.interface";
import { Event } from "./event.modle";

const createEvent= async(palyload: IEvent) => {
    
    return await Event.create(palyload);
}

export const EventServices = {
    createEvent,
}