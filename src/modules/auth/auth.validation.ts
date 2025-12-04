import z from "zod";

export const userRegisterZodSchema = z.object({
  name: z.string({ error: "Name is required" }),
  profile_photo: z
    .string({ error: "Profile photo is required" }).optional(),
  bio: z.string({ error: "Bio is required" }),
  interests: z.array(z.string(), { error: "Interests are required" }),
  location: z.string({ error: "Location is required" }),
  email: z.email({ error: "Email is required" }),
  password: z
    .string({ error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const userLoginZodSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z.string({ error: "Password is required" }),
});
