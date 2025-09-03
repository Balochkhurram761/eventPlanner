import express from "express";
import DbConnection from "./database/DbConnection.js";
import dotenv from "dotenv";
import router from "./router/AuthRouter.js";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
DbConnection();
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", router);
const Port = process.env.port || 5000;

server.listen(Port, () => {
  console.log(`The server port is ${Port}`);
});
