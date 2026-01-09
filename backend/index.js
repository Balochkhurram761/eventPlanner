import express from "express";
import DbConnection from "./database/DbConnection.js";
import dotenv from "dotenv";
import router from "./router/AuthRouter.js";
// import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);    //first request receive and generte response
// const io = new Server(server, { 
//   cors: { origin: "*" },
// });
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

DbConnection();
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", router);
const Port = process.env.Port || 5000;

server.listen(Port, () => {
  console.log(`The server port is ${Port}`);
});
