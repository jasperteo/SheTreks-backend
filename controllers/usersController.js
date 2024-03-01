"use strict";
import BaseController from "./baseController";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default class UsersController extends BaseController {
  constructor(model, locationsModel, followingsModel) {
    super(model);
    this.locationsModel = locationsModel;
    this.followingsModel = followingsModel;
  }

  async getOne(c) {
    const { username } = c.req.param();
    try {
      const data = await this.model.findOne({
        where: { username },
        includes: this.locationsModel,
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async syncUser(c) {
    const { clerkUid } = c.req.param();
    try {
      const [user] = await this.model.findOrCreate({
        where: { clerkUid },
      });
      const clerkUser = await clerkClient.users.getUser(clerkUid);
      await user.update({
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.username,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
      });
      return c.json(user);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async updateUser(c) {
    const { userId } = c.req.param();
    const { about, locationId } = c.req.json();
    try {
      const user = await this.model.findByPk(userId);
      await user.update(about, locationId);
      return c.json(user);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }
}
