import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils";
import { UserModel } from "../database/models";

export default () => async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")?.[1] || "'";

  if (!token) {
    return res.sendResponse("error/failed", 401, {
      message: "Unauthorized"
    });
  }

  try {
    const user = verifyJwt<Request["user"]>(token);

    if (!user) {
      return res.sendResponse("error/failed", 401, {
        message: "Unauthorized"
      });
    }

    const authorizedUser = await UserModel.getByUID(user.uid);

    if (!authorizedUser) {
      return res.sendResponse("error/failed", 401, {
        message: "Unauthorized"
      });
    }

    if (authorizedUser.email !== user.email) {
      return res.sendResponse("error/failed", 401, {
        message: "Unauthorized"
      });
    }

    req.user = {
      id: authorizedUser.id,
      uid: authorizedUser.uid || user.uid,
      email: authorizedUser.email || user.email
    };

    next();
    return;
  } catch (error) {
    return res.sendResponse("error/failed", 401, {
      message: "Unauthorized"
    });
  }
};
