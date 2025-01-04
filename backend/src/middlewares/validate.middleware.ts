import type { NextFunction, Request, Response } from "express";
import { ValidationChain, type ValidationError } from "express-validator";

type ValidationErrorWithPath = ValidationError & {
  path?: string;
};

// can be reused by many routes
const validate = (chains: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of chains) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        return res.sendResponse("error/failed", 400, {
          message: result.array()?.[0]?.msg || "Validation error"
        });
      }
    }

    next();
  };
};

export default validate;
