import { Router } from "express";
// App routes
import authRoutes from "./auth.route";
import linkyRoutes from "./linky.route";

const router = Router({
  strict: true
});

router.get("/", (_, res) => {
  res.sendResponse("success", 200, {
    message: "Welcome to the API"
  });
});

router.use("/auth", authRoutes);
router.use("/linkies", linkyRoutes);

export default router;
