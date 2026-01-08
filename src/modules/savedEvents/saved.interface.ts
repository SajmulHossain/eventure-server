import { ObjectId } from "mongoose";

export interface ISavedEvent {
    user_id: ObjectId;
    event_id: Object;
}