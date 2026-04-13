import express from "express";
import DbConnection from "./database/DbConnection.js";
import dotenv from "dotenv";
import router from "./router/AuthRouter.js";
// import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import morgan from 'morgan'
import { rateLimit } from 'express-rate-limit'
// import helmet from "helmet";
// import session from 'express-session'
const app = express();
const server = http.createServer(app);    //first request receive and generte response
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   // using for formula k liya
app.use(cors());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan('dev'))   //  4 method morgan dev('method, url,status ,response time' ) , combined(id address,url,http,status),short(method,response ,url) ,tiny (url, method time , response) 
// app.use(helmet());  
// app.use(session({
//   secret: process.env.SESSION_SECRET, // secret key for encrypting session
//   resave: false,                       // session tab tak save hoga jab change ho
//   saveUninitialized: false,            // new session save nahi hoga jab tak use na ho
//   cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // 1 hour
// }));
DbConnection();
app.use("/uploads", express.static("uploads"));    
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})
app.use(limiter)


app.use("/api/auth", router);
const Port = process.env.Port || 5000;

server.listen(Port, () => {
  console.log(`The server port is ${Port}`);
});



// use cookie local store data npm install cookie
// use session store data in server  and data secure 
// crsf token attack  user ko form or cookie sa app k website hack karta ya server down kar skta hain
// MVC model Db logic view ui templates our controless (res,res)
// logging  winston, pino , bunyan, 
// passport use outhuzation 
// passport-goolge-oauth20
// const mongoSanitize = require("express-mongo-sanitize")  

// app.use(mongoSanitize())