"use strict";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { clerkMiddleware } from "@hono/clerk-auth";

const PORT = process.env.PORT;
const app = new Hono();
app.use("*", cors());

// importing DB
import db from "./db/models/index";
const {
  users,
  locations,
  activities,
  participants,
  followings,
  categories,
  groupSizes,
} = db;

//importing Controllers
import UsersController from "./controllers/usersController";
import LocationsController from "./controllers/locationsController";
import ActivitiesController from "./controllers/activitiesController";

//importing Routers
import UsersRouter from "./routers/usersRouter";
import LocationsRouter from "./routers/locationsRouter";
import ActivitiesRouter from "./routers/activitiesRouter";

//initializing Controllers
const usersController = new UsersController(users, locations, followings);
const locationsController = new LocationsController(locations);
const activitiesController = new ActivitiesController(
  activities,
  categories,
  groupSizes,
  locations,
  participants,
  users
);

//initializing Routers
const usersRouter = new UsersRouter(usersController, clerkMiddleware()).route();
const locationsRouter = new LocationsRouter(locationsController).route();
const activitiesRouter = new ActivitiesRouter(
  activitiesController,
  clerkMiddleware()
).route();

app.route("/users", usersRouter);
app.route("/locations", locationsRouter);
app.route("/activities", activitiesRouter);

export default { port: PORT, fetch: app.fetch };
