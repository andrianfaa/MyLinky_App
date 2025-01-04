import { Router } from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.controller";
import { JwtMiddleware, validate } from "../middlewares";

const router = Router({
  strict: true
});

router.post(
  "/signIn",
  validate([
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isString()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 to 20 characters")
      .isStrongPassword()
      .withMessage("Password must contain at least one lowercase, one uppercase, one number, and one special character")
  ]),
  authController.signIn
);
router.post(
  "/signUp",
  validate([
    body("name").isString().withMessage("Name must be a string").notEmpty().withMessage("Name is required"),
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isString()
      .withMessage("Username must be a string")
      .isLowercase()
      .withMessage("Username must be lowercase"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isString()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 to 20 characters")
      .isStrongPassword()
      .withMessage("Password must contain at least one lowercase, one uppercase, one number, and one special character")
  ]),
  authController.signUp
);

router.get("/", JwtMiddleware(), authController.getCurrentUser);

export default router;
