"use strict";
import BaseController from "./baseController";
import { Op, literal } from "sequelize";

/**
 * Controller for managing activity-related operations.
 * @extends BaseController
 */
export default class ActivitiesController extends BaseController {
  /**
   * Creates an instance of ActivitiesController.
   * @constructor
   * @param {Object} model - The model object for activities.
   * @param {Object} categoriesModel - The model object for categories.
   * @param {Object} groupSizesModel - The model object for group sizes.
   * @param {Object} locationsModel - The model object for locations.
   * @param {Object} participantsModel - The model object for participants.
   * @param {Object} usersModel - The model object for users.
   */
  constructor(
    model,
    categoriesModel,
    groupSizesModel,
    locationsModel,
    participantsModel,
    usersModel
  ) {
    super(model);
    this.categoriesModel = categoriesModel;
    this.groupSizesModel = groupSizesModel;
    this.locationsModel = locationsModel;
    this.participantsModel = participantsModel;
    this.usersModel = usersModel;
  }

  /**
   * Retrieves all activities excluding the ones hosted by a specific user.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the activities data.
   */
  async getAllExcludeHost(c) {
    const { userId } = c.req.param();
    try {
      const data = await this.model.findAll({
        where: {
          hostId: { [Op.ne]: userId },
          eventDate: { [Op.gt]: new Date() },
          id: {
            [Op.notIn]: literal(
              `(SELECT "activityId" FROM "participants"
              WHERE "userId" = ${userId})`
            ),
          },
        },
        order: [["eventDate", "ASC"]],
        include: [
          {
            model: this.participantsModel,
            include: this.usersModel,
          },
          this.locationsModel,
          this.usersModel,
          this.categoriesModel,
          this.groupSizesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves all activities hosted by a specific user.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the activities data.
   */
  async getAllByHost(c) {
    const { userId } = c.req.param();
    try {
      const data = await this.model.findAll({
        where: { hostId: userId, eventDate: { [Op.gt]: new Date() } },
        order: [["eventDate", "ASC"]],
        include: [
          {
            model: this.participantsModel,
            include: this.usersModel,
          },
          this.locationsModel,
          this.usersModel,
          this.categoriesModel,
          this.groupSizesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves all past activities associated with a specific user.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the activities data.
   */
  async getAllPast(c) {
    const { userId } = c.req.param();
    try {
      const data = await this.model.findAll({
        where: {
          [Op.or]: [
            { hostId: userId },
            literal(`EXISTS (
            SELECT 1 FROM "participants"
            WHERE "participants"."activityId" = "activities"."id"
            AND "participants"."userId" = ${userId}
            AND "participants"."status" = true
            )`),
          ],
          eventDate: { [Op.lt]: new Date() },
        },
        order: [["eventDate", "ASC"]],
        include: [
          {
            model: this.participantsModel,
            include: this.usersModel,
            where: { status: true },
            required: true,
          },
          this.locationsModel,
          this.usersModel,
          this.categoriesModel,
          this.groupSizesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves all current activities associated with a specific user.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the activities data.
   */
  async getAllCurrent(c) {
    const { userId } = c.req.param();
    try {
      const data = await this.model.findAll({
        where: {
          [Op.or]: [
            { hostId: userId },
            literal(`EXISTS (
            SELECT 1 FROM "participants"
            WHERE "participants"."activityId" = "activities"."id"
            AND "participants"."userId" = ${userId}
            AND "participants"."status" = true
            )`),
          ],
          eventDate: { [Op.gt]: new Date() },
        },
        order: [["eventDate", "ASC"]],
        include: [
          {
            model: this.participantsModel,
            include: this.usersModel,
          },
          this.locationsModel,
          this.usersModel,
          this.categoriesModel,
          this.groupSizesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves all activities joined by a specific user.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the activities data.
   */
  async getAllJoinedByUser(c) {
    const { userId } = c.req.param();
    try {
      const data = await this.model.findAll({
        where: {
          [Op.eq]: literal(`EXISTS (
            SELECT 1 FROM "participants"
            WHERE "participants"."activityId" = "activities"."id"
            AND "participants"."userId" = ${userId}
            AND "participants"."status" = true
            )`),
          eventDate: { [Op.gt]: new Date() },
        },
        order: [["eventDate", "ASC"]],
        include: [
          {
            model: this.participantsModel,
            include: this.usersModel,
          },
          this.locationsModel,
          this.usersModel,
          this.categoriesModel,
          this.groupSizesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves all activities followed by a specific user.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the activities data.
   */
  async getAllFollowing(c) {
    const { userId } = c.req.param();
    try {
      const data = await this.model.findAll({
        where: {
          [Op.or]: [
            {
              hostId: {
                [Op.in]: literal(`(
                SELECT "toFollowId" FROM "followings"
                WHERE "userId" = ${userId}
                )`),
              },
            },
            literal(`EXISTS (
            SELECT 1 FROM "participants"
            WHERE "participants"."activityId" = "activities"."id"
            AND "participants"."userId"
            IN (SELECT "toFollowId" FROM "followings"
            WHERE "userId" = ${userId}))`),
          ],
          eventDate: { [Op.gt]: new Date() },
        },
        order: [["eventDate", "ASC"]],
        include: [
          {
            model: this.participantsModel,
            include: this.usersModel,
            required: false,
          },
          this.locationsModel,
          this.usersModel,
          this.categoriesModel,
          this.groupSizesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Creates a new activity.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the created activity data.
   */
  async createActivity(c) {
    try {
      const {
        hostId,
        title,
        description,
        imageUrl,
        cost,
        locationId,
        address,
        latitude,
        longitude,
        eventDate,
        groupSizeId,
        selectedCategoryIds,
      } = await c.req.json();
      const data = await this.model.create({
        hostId,
        title,
        description,
        imageUrl,
        cost,
        locationId,
        address,
        latitude,
        longitude,
        eventDate,
        groupSizeId,
      });
      const selectedCategories = await this.categoriesModel.findAll({
        where: { id: selectedCategoryIds },
      });
      await data.setCategories(selectedCategories);
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves a specific activity by its ID.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the activity data.
   */
  async getOneActivity(c) {
    const { activityId } = c.req.param();
    try {
      const data = await this.model.findByPk(activityId, {
        include: [
          this.locationsModel,
          this.groupSizesModel,
          { model: this.participantsModel, include: this.usersModel },
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Deletes a specific activity by its ID.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the deleted activity data.
   */
  async deleteActivity(c) {
    const { activityId } = c.req.param();
    try {
      const data = await this.model.findByPk(activityId);
      await data.destroy();
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves all categories.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the categories data.
   */
  async getAllCategories(c) {
    try {
      const data = await this.categoriesModel.findAll();
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves all group sizes.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the group sizes data.
   */
  async getAllGroupSizes(c) {
    try {
      const data = await this.groupSizesModel.findAll();
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Adds a participant to an activity.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the created participant data.
   */
  async addParticipant(c) {
    const { activityId } = c.req.param();
    try {
      const { userId } = await c.req.json();
      const data = await this.participantsModel.create({
        activityId,
        userId,
        status: false,
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Retrieves all confirmed participants of an activity.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the participants data.
   */
  async getAllConfirmedParticipants(c) {
    const { activityId } = c.req.param();
    try {
      const data = await this.participantsModel.findAll({
        where: { activityId, status: true },
        include: this.usersModel,
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Confirms a participant for an activity.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the updated participant data.
   */
  async confirmParticipant(c) {
    const { participantId } = c.req.param();
    try {
      const data = await this.participantsModel.findByPk(participantId);
      await data.update({ status: true });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }

  /**
   * Rejects a participant for an activity.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the deleted participant data.
   */
  async rejectParticipant(c) {
    const { participantId } = c.req.param();
    try {
      const data = await this.participantsModel.findByPk(participantId);
      await data.destroy();
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }
  /**
   * Searches for activities based on specified criteria.
   * @async
   * @param {Object} c - The context object.
   * @returns {Object} The response object containing the search results.
   */
  async searchActivities(c) {
    try {
      const {
        startDate,
        endDate,
        searchTerm,
        locationId,
        selectedCategoryIds,
        groupSizeId,
        currentUserId,
      } = await c.req.json();
      const data = await this.model.findAll({
        where: {
          hostId: { [Op.ne]: currentUserId },
          "$participants.userId$": {
            [Op.notIn]: literal(`(
                SELECT "userId" FROM "participants"
                WHERE "userId" = ${currentUserId}
                )`),
          },
          ...(startDate &&
            endDate && { eventDate: { [Op.between]: [startDate, endDate] } }),
          ...(startDate && !endDate && { eventDate: { [Op.gte]: startDate } }),
          ...(endDate && !startDate && { eventDate: { [Op.lte]: endDate } }),
          ...(searchTerm && { title: { [Op.iLike]: `%${searchTerm}%` } }),
          ...(locationId && { locationId }),
          ...(groupSizeId && { groupSizeId }),
          ...(selectedCategoryIds?.length > 0 && {
            "$categories.id$": {
              [Op.in]: selectedCategoryIds,
            },
          }),
        },
        include: [
          {
            model: this.participantsModel,
            include: this.usersModel,
          },
          this.locationsModel,
          this.usersModel,
          this.categoriesModel,
          this.groupSizesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.json({ message: error.message }, 500);
    }
  }
}
