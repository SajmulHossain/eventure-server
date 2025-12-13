import z from "zod";
import { EventStatus } from "./event.interface";

export const eventCreateZodSchema = z.object({
  name: z.string().min(3, { error: "Name should atleast 3 characters" }),
  description: z
    .string()
    .min(7, { error: "Description must be atleast 7 characters" }),
  date_and_time: z.coerce
    .date()
    .min(new Date(), { error: "Date and time is required" }),
  location: z.string().min(3, { error: "Location is required" }),
  required_participants: z.coerce
    .number({ error: "Required participants is required" })
    .min(10, { error: "Minimum 10 needed" }),
  image_url: z.file({ error: "Image is required" }).optional(),
  joinning_fee: z.coerce
    .number({ error: "Joinning fee is required" })
    .min(50, { error: "Joinning Fee must be minimum 50 tk" }),
  status: z
    .enum(Object.values(EventStatus), { error: "Status is required" })
    .default(EventStatus.OPEN),
  type: z.string({ error: "Type is required" }),
  host_id: z.string().min(1, { error: "Host id is required" }),
  joinedParticipants: z.number().optional(),
});