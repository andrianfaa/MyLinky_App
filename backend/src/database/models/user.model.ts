import { TZDate } from "@date-fns/tz";
import { model } from "mongoose";
import ApiError from "../../class/ApiError";
import type { TUserSchema } from "../schemas/types";
import UserSchema from "../schemas/user.schema";

interface TIsExistParams extends Partial<Omit<TUserSchema, "id" | "createdAt" | "updatedAt">> {}

const userModel = model("user", UserSchema);
const user = {
  /**
   * Check user if exist or not
   */
  isExist: async (params: TIsExistParams) => {
    const user = await userModel.findOne({
      $or: [{ email: params.email }, { username: params.username }, { uid: params.uid }]
    });

    return user ? true : false;
  },

  /**
   * Get user by Email
   *
   * @param {string} email - Email
   */
  getByEmail: async (email: string, toJSON: boolean = true) => {
    const user = await userModel.findOne({
      email
    });

    return toJSON ? user?.toJSON() : user;
  },

  /**
   * Get user by UID
   *
   * @param {string} uid - User UID
   */
  getByUID: async (uid: string) => {
    const user = await userModel.findOne({ uid });

    return user?.toJSON();
  },

  /**
   * Create new user
   *
   * @param {Omit<TUserSchema, "id" | "uid" | "role" | "createdAt" | "updatedAt">} data - User data
   */
  create: async (data: Omit<TUserSchema, "id" | "uid" | "role" | "createdAt" | "updatedAt">) => {
    const newUser = new userModel(data);
    const savedUser = await newUser.save();

    if (!savedUser) {
      throw ApiError.internalServerError("Failed to create user");
    }

    return savedUser.toJSON();
  }
};

export default user;
