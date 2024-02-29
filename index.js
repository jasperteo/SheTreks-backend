"use strict";

import { Hono } from "hono";
import { cors } from "hono/cors";
import { clerkMiddleware } from "@hono/clerk-auth";

const PORT = process.env.PORT;
const app = new Hono();
app.use(cors());

// importing DB
import db from "./db/models/index";
const { users, locations } = db;

//importing Controllers
import UsersController from "./controllers/usersController";
import LocationsController from "./controllers/locationsController";

//importing Routers
import UsersRouter from "./routers/usersRouter";
import LocationsRouter from "./routers/locationsRouter";

//initializing Controllers
const usersController = new UsersController(users);
const locationsController = new LocationsController(locations);

//initializing Routers
const usersRouter = new UsersRouter(usersController, clerkMiddleware()).route();
const locationsRouter = new LocationsRouter(locationsController).route();

app.route("/users", usersRouter);
app.route("/locations", locationsRouter);

export default { port: PORT, fetch: app.fetch };
