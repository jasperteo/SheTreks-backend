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
      this.belongsTo(models.activities, { foreignKey: "activityId" });
      this.belongsTo(models.users, { foreignKey: "userId" });
    }
  }
  participants.init(
    {
      activityId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "participants",
    }
  );
  return participants;
};
