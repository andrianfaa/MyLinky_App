import { Router } from "express";
// App routes
import authRoutes from "./auth.route";

const router = Router({
  strict: true
});

router.get("/", (_, res) => {
  res.sendResponse("success", 200, {
    message: "Welcome to the API"
  });
});

router.use("/auth", authRoutes);

export default router;
