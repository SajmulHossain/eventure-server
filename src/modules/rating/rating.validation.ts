import z from "zod";

export const createRatingZodSchema = z.object({
  userId: z.string({ message: "User id is required" }).min(1, { message: "User id is required" }),
  hostId: z.string({ message: "Host id is required" }).min(1, { message: "Host id is required" }),
  eventId: z
    .string({ message: "Event id is required" })
    .min(1, { message: "Event id is required" }),
  rating: z
    .number({ message: "Rating is required" })
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string({ message: "Comment is required" })
    .min(1, { message: "Comment is required" })
    .max(500, { message: "Comment must be at most 500 characters" }),
});


