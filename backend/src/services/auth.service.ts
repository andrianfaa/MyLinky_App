import { createHmac } from "crypto";
import ApiError from "../class/ApiError";
import { LinkyModel, UserModel } from "../database/models";
import type { TUserSchema } from "../database/schemas/types";
import { signJwt } from "../utils";

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignUpBody extends Omit<TUserSchema, "id" | "uid" | "role" | "createdAt" | "updatedAt"> {}

/**
 * Sign in user
 *
 * @param {String} email
 * @param {String} password
 */
export const signIn = async (email: string, password: string) => {
  const user = await UserModel.getByEmail(email, false);

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

/**
 * Sign up user
 *
 * @param {SignUpBody} data
 */
export const signUp = async (data: SignUpBody) => {
  const isExist = await UserModel.isExist({ email: data.email, username: data.username });

  if (isExist) throw ApiError.conflict("User already exist");

  const user = await UserModel.create({
    ...data
  });

  if (!user) throw ApiError.internalServerError("Failed to create user");

  console.log(user);

  // Create linky for user
  await LinkyModel.create(user._id || user.id, {
    siteName: `${user.username}'s Linky`,
    siteDescription: `Welcome to ${user.username}'s Linky!`
  });

  return {
    uid: user.uid,
    email: user.email
  };
};

/**
 * Get current user
 *
 * @param {String} uid
 * @returns
 */
export const getCurrentUser = async (uid: string) => {
  const user = await UserModel.getByUID(uid);

  if (!user) throw ApiError.notFound("User not found");

  return user;
};
