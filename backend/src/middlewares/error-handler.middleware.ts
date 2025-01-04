import { type Request, type Response, type NextFunction } from "express";

export default () => (error: any, _req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.sendResponse("error/failed", 500, {
      message: error.message
    });

    return;
  }

  next();
};
