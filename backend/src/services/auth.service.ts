import { createHmac } from "crypto";
import ApiError from "../class/ApiError";
import userModel from "../database/models/user.model";
import type { TUserSchema } from "../database/schemas/types";
import { signJwt } from "../utils";

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignUpBody extends Omit<TUserSchema, "id" | "uid" | "role" | "createdAt" | "updatedAt"> {}

export const signIn = async (email: string, password: string) => {
  const user = await userModel.getByEmail(email, false);

  if (!user) throw ApiError.notFound("User not found");
  if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY is not defined");

  // if (user.loginWith === "email") {
  const encryptedPassword = createHmac("sha512", process.env.SECRET_KEY).update(password).digest("hex");
  const isPasswordMatch = user.password === encryptedPassword;

  if (!isPasswordMatch) throw ApiError.unauthorized("Invalid password");
  // }

  const token = signJwt({
    uid: user.uid,
    email: user.email
  });

  return {
    user: {
      uid: user.uid,
      email: user.email
    },
    token
  };
};

export const signUp = async (data: SignUpBody) => {
  const isExist = await userModel.isExist({ email: data.email, username: data.username });

  if (isExist) throw ApiError.conflict("User already exist");

  const user = await userModel.create({
    ...data
  });

  if (!user) throw ApiError.internalServerError("Failed to create user");

  return {
    uid: user.uid,
    email: user.email
  };
};

export const getCurrentUser = async (uid: string) => {
  const user = await userModel.getByUID(uid);

  if (!user) throw ApiError.notFound("User not found");

  return user;
};
