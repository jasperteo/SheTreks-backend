"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notification_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.notifications, { foreignKey: "notifType" });
    }
  }
  notification_types.init(
    {
      notifTypeName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "notification_types",
    }
  );
  return notification_types;
};
