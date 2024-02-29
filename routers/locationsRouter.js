"use strict";

import { Hono } from "hono";
const router = new Hono();

export default class LocationsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  route() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:locationId", this.controller.getOne.bind(this.controller));
    return router;
  }
}
