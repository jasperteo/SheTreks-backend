"use strict";

import { Hono } from "hono";
import { cors } from "hono/cors";
import { clerkMiddleware } from "@hono/clerk-auth";

const PORT = process.env.PORT;
const app = new Hono();
app.use(cors());

// importing DB
import db from "./db/models/index";
const { users } = db;

//importing Controllers
import UsersController from "./controllers/usersController";

//importing Routers
import UsersRouter from "./routers/usersRouter";

//initializing Controllers
const usersController = new UsersController(users);

//initializing Routers
const usersRouter = new UsersRouter(usersController, clerkMiddleware()).route();

app.route("/users", usersRouter);

export default { port: PORT, fetch: app.fetch };
