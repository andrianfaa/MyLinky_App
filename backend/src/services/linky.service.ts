import { LinkyModel } from "../database/models";
import { Types } from "mongoose";

/**
 * Create new linky
 *
 * @param {Types.ObjectId} uid - User ID
 */
export const getLinkyByAuthorizedUser = async (uid: Types.ObjectId) => {
  const linky = await LinkyModel.getByUID(uid);

  return linky;
};

/**
 * Update linky by UID
 *
 * @param {Types.ObjectId} uid - User ID
 * @param {UpdateLinkyData} data - Data to update
 */
export const updateLinky = async (uid: Types.ObjectId, data: any) => {
  const linky = await LinkyModel.updateByUID(uid, data);

  return linky;
};

/**
 * Delete linky by UID
 *
 * @param {Types.ObjectId} uid - User ID
 */
export const deleteLinky = async (uid: Types.ObjectId) => {
  const deletedLinky = await LinkyModel.deleteByUID(uid);

  return deletedLinky;
};
