import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import path from "path";
import { connectMongoDB } from "../src/database";
import { ErrorHandlerMiddleware, ResponseMiddleware } from "../src/middlewares";
import AppRoutes from "../src/routes";

dotenv.config({
  path: path.resolve(__dirname, "..", process.env.NODE_ENV === "development" ? ".env.development" : ".env")
});

const app = express();
const server = http.createServer(app);

connectMongoDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(ResponseMiddleware());

// v1 API routes
app.use("/api/v1", AppRoutes);

app.use("*", (_, res) => {
  res.sendResponse("error/failed", 404, {
    message: "Route not found"
  });
});

app.use(ErrorHandlerMiddleware());

export default server;
