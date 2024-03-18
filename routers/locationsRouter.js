"use strict";
import { Hono } from "hono";
const router = new Hono();

/**
 * Represents a router for handling location-related routes.
 */
export default class LocationsRouter {
  /**
   * Creates an instance of LocationsRouter.
   * @param {Object} controller - The controller object for handling location-related operations.
   */
  constructor(controller) {
    this.controller = controller;
  }

  /**
   * Routes the location-related routes to their respective controller methods.
   * @returns {Object} - The router object.
   */
  route() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:locationId", this.controller.getOne.bind(this.controller));

    return router;
  }
}
