"use strict";
import BaseController from "./baseController";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default class UsersController extends BaseController {
  constructor(model, locationsModel, followingsModel, notificationsModel) {
    super(model);
    this.locationsModel = locationsModel;
    this.followingsModel = followingsModel;
    this.notificationsModel = notificationsModel;
  }

  async getOne(c) {
    const { username } = c.req.param();
    try {
      const data = await this.model.findOne({
        where: { username },
        include: this.locationsModel,
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
        include: this.locationsModel,
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
    try {
      const { about, locationId } = await c.req.json();
      const data = await this.model.findByPk(userId);
      await data.update({ about, locationId });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async followUser(c) {
    const { userId, toFollowId } = c.req.param();
    try {
      const data = await this.followingsModel.create({ userId, toFollowId });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async unfollowUser(c) {
    const { userId, toFollowId } = c.req.param();
    try {
      const data = await this.followingsModel.destroy({
        where: { userId, toFollowId },
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async getFollowers(c) {
    const { toFollowId } = c.req.param();
    try {
      const data = await this.followingsModel.findAndCountAll({
        where: { toFollowId },
        include: [{ model: this.model, as: "user" }],
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async getFollowing(c) {
    const { userId } = c.req.param();
    try {
      const data = await this.followingsModel.findAndCountAll({
        where: { userId },
        include: [{ model: this.model, as: "toFollow" }],
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async getNotifications(c) {
    const { userId } = c.req.param();
    try {
      const data = await this.notificationsModel.findAll({
        where: { recipientId: userId },
        order: [["createdAt", "DESC"]],
        include: [{ model: this.model, as: "sender" }],
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async createNotification(c) {
    try {
      const { recipientId, senderId, notifId } = await c.req.json();
      const data = await this.notificationsModel.create({
        recipientId,
        senderId,
        notifId,
        read: false,
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async markNotificationAsRead(c) {
    const { id } = c.req.param();
    try {
      const data = await this.notificationsModel.findByPk(id);
      await data.update({ read: true });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }
}
