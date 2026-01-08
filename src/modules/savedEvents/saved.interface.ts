import mongoose, { ObjectId } from "mongoose";

export interface ISavedEvent {
    user_id: mongoose.Types.ObjectId;
    event_id: mongoose.Types.ObjectId;
}