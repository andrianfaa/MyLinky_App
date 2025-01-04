import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils";

export default () => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")?.[1] || "'";

  if (!token) {
    return res.sendResponse("error/failed", 401, {
      message: "Unauthorized"
    });
  }

  const user = verifyJwt<Request["user"]>(token);

  if (!user) {
    return res.sendResponse("error/failed", 401, {
      message: "Unauthorized"
    });
  }

  req.user = user;

  next();
};
