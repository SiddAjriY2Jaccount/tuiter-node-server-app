import express, { json } from "express";
import session from "express-session";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import tuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";

const app = express();
const PORT = 4000;
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
    origin: "https://a5--jolly-gaufre-12c5d0.netlify.app/",
  })
);

HelloController(app);
UserController(app);
tuitsController(app);
AuthController(app);

// Start the server
app.listen(process.env.PORT || 4000);