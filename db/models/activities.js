"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.categories, { through: "activity_categories" });
      this.belongsTo(models.users, { foreignKey: "hostId" });
      this.belongsTo(models.locations, { foreignKey: "locationId" });
      this.belongsTo(models.group_sizes, { foreignKey: "groupSizeId" });
      this.hasMany(models.participants, { foreignKey: "activityId" });
    }
  }
  activities.init(
    {
      hostId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      locationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "locations",
          key: "id",
        },
      },
      address: DataTypes.STRING,
      latitude: DataTypes.REAL,
      longitude: DataTypes.REAL,
      eventDate: DataTypes.DATE,
      groupSizeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "group_sizes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "activities",
    }
  );
  return activities;
};
