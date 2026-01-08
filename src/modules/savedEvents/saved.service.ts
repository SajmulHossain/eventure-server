import { Event } from "@modules/event/event.modle";
import { ApiError } from "@utils/ApiError";
import { SavedEvent } from "./saved.model";

const createSave = async (user_id: string, event_id: string) => {
  const data = {
    user_id,
    event_id,
    };
    
    const event = await Event.findById(event_id);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    const isExist = await SavedEvent.findOne({ user_id, event_id });

    if (isExist) {
        throw new ApiError(400, "Event already saved");
    }

    return await SavedEvent.create(data);
};

export const SavedEventServices = {
  createSave,
};