"use strict";
export default class BaseController {
  constructor(model) {
    this.model = model;
  }

  async getAll(c) {
    try {
      const data = await this.model.findAll();
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }
}
