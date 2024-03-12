"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class participants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.activities, {
        onDelete: "CASCADE",
        foreignKey: "activityId",
      });
      this.belongsTo(models.users, { foreignKey: "userId" });
    }
  }
  participants.init(
    {
      activityId: {
        type: DataTypes.INTEGER,
        references: {
          model: "activiies",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "participants",
    }
  );
  return participants;
};
