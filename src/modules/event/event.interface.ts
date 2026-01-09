import { ObjectId, Types } from "mongoose";

export interface IEvent {
  name: string;
  description: string;
  date_and_time: Date;
  location: string;
  required_participants: number;
  image_url?: string;
  joinning_fee: number;
  status: EventStatus;
  type: ObjectId;
  host_id: ObjectId;
  joinedParticipants: Types.ObjectId[];
}

export enum EventStatus {
  OPEN = "OPEN",
  FULL = "FULL",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}
