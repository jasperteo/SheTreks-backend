"use strict";
import BaseController from "./baseController";

/**
 * Controller class for handling locations.
 * @extends BaseController
 */
export default class LocationsController extends BaseController {
  /**
   * Creates an instance of LocationsController.
   * @param {Object} model - The model object for locations.
   */
  constructor(model) {
    super(model);
  }

  /**
   * Retrieves a single location by its ID.
   * @param {Object} c - The context object containing the request and response objects.
   * @returns {Object} - The JSON response containing the location data.
   */
  async getOne(c) {
    const { locationId } = c.req.param();
    try {
      const data = await this.model.findByPk(locationId);
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }
}
