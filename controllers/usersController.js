"use strict";
import BaseController from "./baseController";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getOne(c) {
    const { username } = c.req.param();
    try {
      const data = await this.model.findOne({
        where: { username },
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
        where: { clerkUid: clerkUid },
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
}
