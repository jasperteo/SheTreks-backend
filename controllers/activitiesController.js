"use strict";
import BaseController from "./baseController";
import { Op, literal } from "sequelize";

export default class ActivitiesController extends BaseController {
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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
            {
              "$participants.userId$": {
                [Op.in]: literal(`(
                SELECT "toFollowId" FROM "followings"
                WHERE "userId" = ${userId}
                )`),
              },
            },
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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async deleteActivity(c) {
    const { activityId } = c.req.param();
    try {
      const data = await this.model.findByPk(activityId);
      await data.destroy();
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async getAllCategories(c) {
    try {
      const data = await this.categoriesModel.findAll();
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async getAllGroupSizes(c) {
    try {
      const data = await this.groupSizesModel.findAll();
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async getAllConfirmedParticipants(c) {
    const { activityId } = c.req.param();
    try {
      const data = await this.participantsModel.findAll({
        where: { activityId, status: true },
        include: this.usersModel,
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async confirmParticipant(c) {
    const { participantId } = c.req.param();
    try {
      const data = await this.participantsModel.findByPk(participantId);
      await data.update({ status: true });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async rejectParticipant(c) {
    const { participantId } = c.req.param();
    try {
      const data = await this.participantsModel.findByPk(participantId);
      await data.destroy();
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

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
          this.locationsModel,
          this.groupSizesModel,
          this.categoriesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }
}
