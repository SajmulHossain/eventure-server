export interface IUser {
  name: string;
  profile_photo?: string;
  bio: string;
  interests: string[];
  location: string;
}

export enum UserRoles {
  USER="USER",
  HOST="HOST",
  ADMIN="ADMIN"
}