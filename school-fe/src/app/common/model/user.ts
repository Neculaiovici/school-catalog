import { Profile } from "./profile";

export class User {
  createdAt?: Date;
  username?: string;
  password?: string;
  role?: string;
  profile?: Profile;
}