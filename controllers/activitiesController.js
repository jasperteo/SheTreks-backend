"use strict";
import BaseController from "./baseController";
import { Op } from "sequelize";

export default class ActivitiesController extends BaseController {
  constructor(
    model,
    categoriesModel,
    groupSizesModel,
    locationsModel,
    participantsModel,
    usersModel,
    activityCategoriesModel
  ) {
    super(model);
    this.categoriesModel = categoriesModel;
    this.groupSizesModel = groupSizesModel;
    this.locationsModel = locationsModel;
    this.participantsModel = participantsModel;
    this.usersModel = usersModel;
    this.activityCategoriesModel = activityCategoriesModel;
  }

  async getAllExcludeHost(c) {
    const { currentUserId } = c.req.param();
    try {
      const data = await this.model.findAll({
        where: {
          hostId: { [Op.ne]: currentUserId },
        },
        order: [["eventDate", "ASC"]],
        include: [
          this.usersModel,
          this.categoriesModel,
          this.locationsModel,
          this.participantsModel,
          this.groupSizesModel,
        ],
      });
      return c.json(data);
    } catch (error) {
      return c.status(500).json({ error: true, msg: error.message });
    }
  }

  async getAllByHost(c) {
    const { currentUserId } = c.req.param();
    try {
      const data = await this.model.findAll({
        where: { hostId: currentUserId },
        order: [["eventDate", "ASC"]],
        include: this.locationsModel,
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
