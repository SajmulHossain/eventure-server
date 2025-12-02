export interface IUser {
  name: string;
  profile_photo?: string;
  bio: string;
  interests: string[];
  location: string;
  auths: IAuthProvider[];
  role: UserRoles;
  email: string;
  password: string;
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export enum UserRoles {
  USER="USER",
  HOST="HOST",
  ADMIN="ADMIN"
}