import type { Types } from "mongoose";

export type TUserSchema = {
  id?: Types.ObjectId;
  uid?: string;
  name: string;
  username: string;
  email: string;
  password: string | null;
  avatar?: string | null;
  loginWith?: "email" | "google";
  role?: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};
