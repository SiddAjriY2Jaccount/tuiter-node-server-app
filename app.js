import express, { json } from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import tuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import dotenv from "dotenv";
dotenv.config();
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tuiter";
// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

const app = express();
const PORT = 4000;
const allowedOrigins = ['https://a5--jolly-gaufre-12c5d0.netlify.app', 'http://localhost:3000'];

// Middleware
app.use(json());
app.use(
  session({
    secret: "string",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

HelloController(app);
UserController(app);
tuitsController(app);
AuthController(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
