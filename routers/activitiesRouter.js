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
    router.post("/", this.controller.createActivity.bind(this.controller));
    router.get(
      "/categories",
      this.controller.getAllCategories.bind(this.controller)
    );
    router.get(
      "/groupSizes",
      this.controller.getAllGroupSizes.bind(this.controller)
    );
    router.get("/:activityId", this.controller.getOne.bind(this.controller));
    router.delete(
      "/:activityId",
      this.controller.deleteActivity.bind(this.controller)
    );
    router.get(
      "/:activityId/participants",
      this.controller.getAllParticipants.bind(this.controller)
    );
    router.post(
      "/:activityId/participants",
      this.controller.addParticipant.bind(this.controller)
    );
    router.put(
      "/:activityId/participants",
      this.controller.confirmParticipant.bind(this.controller)
    );
    router.delete(
      "/:activityId/participants",
      this.controller.rejectParticipant.bind(this.controller)
    );
    return router;
  }
}
