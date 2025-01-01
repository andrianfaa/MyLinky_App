import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

app.get("/", (_, res) => {
  res.json({
    status: "success",
    status_code: 200,
    message: "🚀 Server is running!"
  });
});

export default server;
