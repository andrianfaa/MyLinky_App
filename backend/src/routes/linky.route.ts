import { Router } from "express";
import { body } from "express-validator";
import { linkyController } from "../controllers";
import { JwtMiddleware, validate } from "../middlewares";

const router = Router({
  strict: true
});

router.get("/", JwtMiddleware(), linkyController.getLinkyByAuthorizedUser);

router.put(
  "/",
  validate([
    body("siteName").isString().withMessage("Site name must be a string").trim(),
    body("siteDescription").isString().withMessage("Site description must be a string").trim(),
    body("links").isArray().withMessage("Links must be an array"),
    body("links.*.id")
      .notEmpty()
      .withMessage("ID must not be empty")
      .isString()
      .withMessage("ID must be a string")
      .trim(),
    body("links.*.url")
      .notEmpty()
      .withMessage("URL must not be empty")
      .isString()
      .withMessage("URL must be a string")
      .trim(),
    body("links.*.title").optional().isString().withMessage("Title must be a string").trim(),
    body("links.*.description").optional().isString().withMessage("Description must be a string").trim(),
    body("links.*.type").optional().isString().withMessage("Type must be a string").trim(),
    body("links.*.icon").optional().isString().withMessage("Icon must be a string").trim(),
    body("links.*.isPublished").optional().isBoolean().withMessage("Is published must be a boolean")
  ]),
  JwtMiddleware(),
  linkyController.updateLinky
);

export default router;
