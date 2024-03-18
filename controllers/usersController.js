"use strict";
import BaseController from "./baseController";

/**
 * Controller for managing user-related operations.
 * @extends BaseController
 */
export default class UsersController extends BaseController {
  /**
   * Creates an instance of UsersController.
   * @param {Object} model - The user model.
   * @param {Object} locationsModel - The locations model.
   * @param {Object} followingsModel - The followings model.
   * @param {Object} notificationsModel - The notifications model.
   */
  constructor(model, locationsModel, followingsModel, notificationsModel) {
    super(model);
    this.locationsModel = locationsModel;
    this.followingsModel = followingsModel;
    this.notificationsModel = notificationsModel;
  }

  /**
   * Retrieves a single user by their username.
   * @param {Object} c - The context object.
   * @returns {Object} The user data.
   */
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

  /**
   * Syncs a user with the provided clerk UID.
   * @param {Object} c - The context object.
   * @returns {Object} The synced user data.
   */
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

  /**
   * Updates a user's information.
   * @param {Object} c - The context object.
   * @returns {Object} The updated user data.
   */
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

  /**
   * Follows a user.
   * @param {Object} c - The context object.
   * @returns {Object} The created following data.
   */
  async followUser(c) {
    const { userId, toFollowId } = c.req.param();
    try {
      const data = await this.followingsModel.create({ userId, toFollowId });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Unfollows a user.
   * @param {Object} c - The context object.
   * @returns {Object} The deleted following data.
   */
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

  /**
   * Retrieves the followers of a user.
   * @param {Object} c - The context object.
   * @returns {Object} The followers data.
   */
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

  /**
   * Retrieves the users that a user is following.
   * @param {Object} c - The context object.
   * @returns {Object} The following data.
   */
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

  /**
   * Retrieves the notifications of a user.
   * @param {Object} c - The context object.
   * @returns {Object} The notifications data.
   */
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

  /**
   * Creates a notification for a user.
   * @param {Object} c - The context object.
   * @returns {Object} The created notification data.
   */
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

  /**
   * Marks a notification as read.
   * @param {Object} c - The context object.
   * @returns {Object} The updated notification data.
   */
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
