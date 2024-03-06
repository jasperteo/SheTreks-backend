"use strict";
import { Hono } from "hono";
const router = new Hono();

export default class UsersRouter {
  constructor(controller, clerkMiddleware) {
    this.controller = controller;
    this.clerkMiddleware = clerkMiddleware;
  }

  route() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get(
      "/profile/:username",
      this.controller.getOne.bind(this.controller)
    );
    router.get(
      "/sync/:clerkUid",
      this.clerkMiddleware,
      this.controller.syncUser.bind(this.controller)
    );
    router.put("/:userId", this.controller.updateUser.bind(this.controller));
    return router;
  }
}
