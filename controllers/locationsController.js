"use strict";
import BaseController from "./baseController";

export default class LocationsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getOne(c) {
    const { locationId } = c.req.param();
    try {
      const data = await this.model.findOne({
        where: { locationId },
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }
}
