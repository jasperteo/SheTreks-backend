"use strict";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import { cors } from "hono/cors";

// importing DB
import db from "./db/models/index";
const {
  users,
  locations,
  activities,
  participants,
  followings,
  categories,
  group_sizes,
  notifications,
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
const usersController = new UsersController(
  users,
  locations,
  followings,
  notifications
);
const locationsController = new LocationsController(locations);
const activitiesController = new ActivitiesController(
  activities,
  categories,
  group_sizes,
  locations,
  participants,
  users
);

//initializing Routers
const usersRouter = new UsersRouter(usersController).route();
const locationsRouter = new LocationsRouter(locationsController).route();
const activitiesRouter = new ActivitiesRouter(activitiesController).route();

const PORT = process.env.PORT;
const app = new Hono();

//implement cors midddleware to allow all origins
app.use(cors());

//implementing clerk middleware
app.use(clerkMiddleware());
app.use(async (c, next) => {
  const auth = c.get("clerkAuth");
  if (!auth.userId) {
    return c.json({ message: "You are unauthenticated" }, 401);
  }
  await next();
});

//implementing routers
app.route("/users", usersRouter);
app.route("/locations", locationsRouter);
app.route("/activities", activitiesRouter);

//starting app
export default { port: PORT, fetch: app.fetch };
