import type { Request, Response } from "express";
import ApiError from "../class/ApiError";
import { authService } from "../services";

export const signIn = async (req: Request<{}, {}, authService.SignInBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authService.signIn(email, password);

    res.sendResponse("success", 200, {
      message: "Successfully sign in",
      data: {
        token: user.token
      }
    });
  } catch (error: any) {
    res.sendResponse("error/failed", error?.statusCode || 500, {
      message: error?.message || "Internal server error"
    });
  }
};

export const signUp = async (req: Request<{}, authService.SignUpBody>, res: Response) => {
  try {
    const user = await authService.signUp(req.body);

    res.sendResponse("success", 201, {
      message: "Successfully sign up",
      data: user
    });
  } catch (error: any) {
    res.sendResponse("error/failed", error?.statusCode || 500, {
      message: error?.message || "Internal server error"
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw ApiError.unauthorized("Unauthorized");

    const user = await authService.getCurrentUser(req.user.uid);

    res.sendResponse("success", 200, {
      message: "Successfully get current user",
      data: {
        email: user.email,
        username: user.username,
        name: user.name
      }
    });
  } catch (error: any) {
    res.sendResponse("error/failed", error?.statusCode || 500, {
      message: error?.message || "Internal server error"
    });
  }
};
