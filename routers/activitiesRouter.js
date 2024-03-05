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
    router.get(
      "/excludeHost/:currentUserId",
      this.controller.getAllExcludeHost.bind(this.controller)
    );
    router.get(
      "/includeHost/:currentUserId",
      this.controller.getAllByHost.bind(this.controller)
    );
    router.post("/", this.controller.createActivity.bind(this.controller));
    router.get(
      "/categories",
      this.controller.getAllCategories.bind(this.controller)
    );
    router.get(
      "/groupSizes",
      this.controller.getAllGroupSizes.bind(this.controller)
    );
    router.put(
      "/participants/:participantId",
      this.controller.confirmParticipant.bind(this.controller)
    );
    router.delete(
      "/participants/:participantId",
      this.controller.rejectParticipant.bind(this.controller)
    );
    router.delete(
      "delete/:activityId",
      this.controller.deleteActivity.bind(this.controller)
    );

    router.get(
      "/:activityId",
      this.controller.getOneActivity.bind(this.controller)
    );

    router.get(
      "/:activityId/participants",
      this.controller.getAllParticipants.bind(this.controller)
    );
    router.get(
      "/:activityId/participants/confirmed",
      this.controller.getAllConfirmedParticipants.bind(this.controller)
    );
    router.post(
      "/:activityId/participants",
      this.controller.addParticipant.bind(this.controller)
    );

    return router;
  }
}
