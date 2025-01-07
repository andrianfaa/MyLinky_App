import type { Request, Response } from "express";
import ApiError from "../class/ApiError";
import { linkyService } from "../services";

export const getLinkyByAuthorizedUser = async (req: Request, res: Response) => {
  try {
    const linky = await linkyService.getLinkyByAuthorizedUser(req.user.id);

    if (!linky) throw ApiError.notFound("Linky not found");

    res.sendResponse("success", 200, {
      message: "Successfully get linky",
      data: linky
    });
  } catch (error: any) {
    res.sendResponse("error/failed", error?.statusCode || 500, {
      message: error?.message || "Internal server error"
    });
  }
};

export const updateLinky = async (req: Request, res: Response) => {
  try {
    const linky = await linkyService.updateLinky(req.user.id, req.body);

    if (!linky) throw ApiError.notFound("Linky not found or failed to update linky");

    res.sendResponse("success", 200, {
      message: "Successfully update linky"
    });
  } catch (error: any) {
    res.sendResponse("error/failed", error?.statusCode || 500, {
      message: error?.message || "Internal server error"
    });
  }
};
