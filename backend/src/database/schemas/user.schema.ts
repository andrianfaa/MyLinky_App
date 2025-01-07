import { TZDate } from "@date-fns/tz";
import { createHmac, randomUUID } from "crypto";
import { Schema } from "mongoose";
import type { TUserSchema } from "./types";

const UserSchema = new Schema<TUserSchema>({
  uid: {
    type: String,
    default: () => randomUUID().replaceAll("-", "")
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  loginWith: {
    type: String,
    default: () => "email"
  },
  avatar: {
    type: String,
    default: () => null
  },
  createdAt: {
    type: String,
    default: () => new TZDate(new Date(), "Asia/Jakarta").toISOString()
  },
  updatedAt: {
    type: String,
    default: () => new TZDate(new Date(), "Asia/Jakarta").toISOString()
  }
});

UserSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.set("updatedAt", new TZDate(new Date(), "Asia/Jakarta").toISOString());

    next();
    return;
  }

  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined");
  }

  const password = this.get("password")!;
  const hashedPassword = createHmac("sha512", process.env.SECRET_KEY).update(password).digest("hex");

  this.set("password", hashedPassword);

  next();
});

export default UserSchema;
