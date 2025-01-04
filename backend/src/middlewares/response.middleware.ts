import type { NextFunction, Request, Response } from "express";

type SendResponseParams = Parameters<Express.Response["sendResponse"]>;

/**
 * Send Response Middleware
 *
 * @param _req {Request} Express Request Object
 * @param res {Response} Express Response Object
 * @param next {NextFunction} Express Next Function
 */
export default () => (_req: Request, res: Response, next: NextFunction) => {
  res.sendResponse = <T = null>(
    type: SendResponseParams[0],
    statusCode: SendResponseParams[1] = 200,
    options: SendResponseParams[2]
  ) => {
    const { message, data } = options;

    return res
      .status(statusCode)
      .json({
        status: type,
        status_code: statusCode,
        message,
        data,
        total_data: (data && Array.isArray(data) ? data.length : 0) || undefined
      } as ApiResponseModel<T>)
      .end();
  };

  next();
};
