"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group_sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.activities, { foreignKey: "groupSizeId" });
    }
  }
  group_sizes.init(
    {
      size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "group_sizes",
    }
  );
  return group_sizes;
};
