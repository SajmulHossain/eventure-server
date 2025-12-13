import { UserRoles } from "@modules/user/user.interface";
import z from "zod";

export const userRegisterZodSchema = z.object({
  name: z.string({ error: "Name is required" }),
  profile_photo: z
    .string({ error: "Profile photo is required" }).optional(),
  bio: z.string({ error: "Bio is required" }),
  interests: z.array(z.string(), { error: "Interests are required" }),
  location: z.string({ error: "Location is required" }),
  email: z.email({ error: "Email is required" }),
  role: z.enum(Object.values(UserRoles), "Role is required!"),
  password: z
    .string({ error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const userLoginZodSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z.string({ error: "Password is required" }),
});

export const changePasswordZodSchema = z.object({
  oldPassword: z.string({ error: "Old password is required" }),
  newPassword: z
    .string({ error: "New password is required" })
    .min(6, { message: "New password must be at least 6 characters long" }),
});

export const updateProfileZodSchema = z.object({
  name: z.string({ error: "Name is required" }).optional(),
  bio: z.string({ error: "Bio is required" }).optional(),
  interests: z.array(z.string(), { error: "Interests are required" }).optional(),
  location: z.string({ error: "Location is required" }).optional(),
  profile_photo: z.string({ error: "Profile photo is required" }).optional(),
  description: z.string({ error: "Description is required" }).optional(),
});