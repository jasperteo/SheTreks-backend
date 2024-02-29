"use strict";
import { Hono } from "hono";
const router = new Hono();

export default class ActivitiesRouter {
  constructor(controller, clerkMiddleware) {
    this.controller = controller;
    this.clerkMiddleware = clerkMiddleware;
  }

  route() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:activityId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.createActivity.bind(this.controller));

    return router;
  }
}
