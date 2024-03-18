"use strict";
import { Hono } from "hono";
const router = new Hono();

/**
 * Represents a router for handling user-related routes.
 */
export default class UsersRouter {
  /**
   * Creates an instance of UsersRouter.
   * @param {Object} controller - The controller object for handling user-related operations.
   */
  constructor(controller) {
    this.controller = controller;
  }

  /**
   * Routes the user-related routes to their respective controller methods.
   * @returns {Object} - The router object.
   */
  route() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post(
      "/follow/:userId/:toFollowId",
      this.controller.followUser.bind(this.controller)
    );
    router.delete(
      "/unfollow/:userId/:toFollowId",
      this.controller.unfollowUser.bind(this.controller)
    );
    router.get(
      "/followers/:toFollowId",
      this.controller.getFollowers.bind(this.controller)
    );
    router.get(
      "/following/:userId",
      this.controller.getFollowing.bind(this.controller)
    );
    router.get(
      "/profile/:username",
      this.controller.getOne.bind(this.controller)
    );
    router.get(
      "/sync/:clerkUid",
      this.controller.syncUser.bind(this.controller)
    );
    router.post(
      "/notifications",
      this.controller.createNotification.bind(this.controller)
    );
    router.put(
      "/notifications/read/:notificationId",
      this.controller.markNotificationAsRead.bind(this.controller)
    );
    router.get(
      "/notifications/:userId",
      this.controller.getNotifications.bind(this.controller)
    );
    router.put("/:userId", this.controller.updateUser.bind(this.controller));

    return router;
  }
}
