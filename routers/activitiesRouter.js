"use strict";
import { Hono } from "hono";
const router = new Hono();

/**
 * Represents a router for handling user-related routes.
 */
export default class ActivitiesRouter {
  /**
   * Creates an instance of ActivitiesRouter.
   * @param {Object} controller - The controller object for handling acitivity-related operations.
   */
  constructor(controller) {
    this.controller = controller;
  }

  /**
   * Routes the activity-related routes to their respective controller methods.
   * @returns {Object} - The router object.
   */
  route() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.createActivity.bind(this.controller));
    router.post(
      "/search",
      this.controller.searchActivities.bind(this.controller)
    );
    router.get(
      "/excludeHost/:userId",
      this.controller.getAllExcludeHost.bind(this.controller)
    );
    router.get(
      "/includeHost/:userId",
      this.controller.getAllByHost.bind(this.controller)
    );
    router.get(
      "/past/:userId",
      this.controller.getAllPast.bind(this.controller)
    );
    router.get(
      "/current/:userId",
      this.controller.getAllCurrent.bind(this.controller)
    );
    router.get(
      "/joinedByUser/:userId",
      this.controller.getAllJoinedByUser.bind(this.controller)
    );
    router.get(
      "/feed/:userId",
      this.controller.getAllFollowing.bind(this.controller)
    );
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
      "/delete/:activityId",
      this.controller.deleteActivity.bind(this.controller)
    );
    router.get(
      "/:activityId",
      this.controller.getOneActivity.bind(this.controller)
    );
    router.post(
      "/:activityId/participants",
      this.controller.addParticipant.bind(this.controller)
    );
    router.get(
      "/:activityId/participants/confirmed",
      this.controller.getAllConfirmedParticipants.bind(this.controller)
    );

    return router;
  }
}
