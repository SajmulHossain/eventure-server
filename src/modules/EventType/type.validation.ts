import z from "zod";

export const createEventTypeZodSchema = z.object({
  name: z.string({ error: "Event name is required" }),
    description: z.string({ error: "Event description is required" })
});