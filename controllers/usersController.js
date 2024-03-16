"use strict";
import BaseController from "./baseController";

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
      return c.json({ message: error.message }, 500);
    }
  }

  async syncUser(c) {
    const clerkClient = c.get("clerk");
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
      return c.json({ message: error.message }, 500);
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
      return c.json({ message: error.message }, 500);
    }
  }

  async followUser(c) {
    const { userId, toFollowId } = c.req.param();
    try {
      const data = await this.followingsModel.create({ userId, toFollowId });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
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
      return c.json({ message: error.message }, 500);
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
      return c.json({ message: error.message }, 500);
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
      return c.json({ message: error.message }, 500);
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
      return c.json({ message: error.message }, 500);
    }
  }

  async createNotification(c) {
    try {
      const { recipientId, senderId, notifMessage } = await c.req.json();
      const data = await this.notificationsModel.create({
        recipientId,
        senderId,
        notifMessage,
        read: false,
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  async markNotificationAsRead(c) {
    const { notificationId } = c.req.param();
    try {
      const data = await this.notificationsModel.findByPk(notificationId);
      await data.update({ read: true });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }
}
