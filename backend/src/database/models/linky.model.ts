import { model, Types } from "mongoose";
import ApiError from "../../class/ApiError";
import LinkySchema from "../schemas/linky.schema";
import { TLinkySchema } from "../schemas/types";
import { TZDate } from "@date-fns/tz";

export type CreateLinkyOptions = {
  siteName: string;
  siteDescription: string;
};

export type UpdateLinkyData = Omit<TLinkySchema, "uid" | "createdAt" | "updatedAt">;

const linkyModel = model("linky", LinkySchema);
const linky = {
  /**
   * Create new linky
   *
   * @param {Types.ObjectId} uid - User ID
   * @param {CreateLinkyOptions} options - Linky options
   */
  create: async (uid: Types.ObjectId, options: CreateLinkyOptions) => {
    const newLinky = new linkyModel({
      uid,
      ...options
    });
    const savedLinky = await newLinky.save();

    if (!savedLinky) throw ApiError.internalServerError("Failed to create linky");

    return savedLinky.toJSON();
  },

  /**
   * Get linky by UID
   *
   * @param {Types.ObjectId} uid - User ID
   */
  getByUID: async (uid: Types.ObjectId, toJSON: boolean = true) => {
    const linky = await linkyModel
      .findOne({
        uid
      })
      .select("-uid -_id"); // Exclude UID and ID

    return toJSON ? linky?.toJSON() : linky;
  },

  /**
   * Update linky by UID
   *
   * @param {Types.ObjectId} uid - User ID
   * @param {UpdateLinkyData} data - Data to update
   */
  updateByUID: async (uid: Types.ObjectId, data: UpdateLinkyData, toJSON: boolean = true) => {
    const updateLinky = await linkyModel.findOneAndUpdate(
      {
        uid
      },
      {
        ...data,
        updatedAt: new TZDate(new Date(), "Asia/Jakarta").toISOString()
      }
    );

    return toJSON ? updateLinky?.toJSON() : updateLinky;
  },

  /**
   * Delete linky by UID
   *
   * @param {Types.ObjectId} uid - User ID
   * @param {Boolean} toJSON - Return JSON or not
   * @returns
   */
  deleteByUID: async (uid: Types.ObjectId, toJSON: boolean = true) => {
    const deletedLinky = await linkyModel.findOneAndDelete({
      uid
    });

    return toJSON ? deletedLinky?.toJSON() : deletedLinky;
  }
};

export default linky;
