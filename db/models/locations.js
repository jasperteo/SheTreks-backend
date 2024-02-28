"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.users, { foreignKey: "locationId" });
      this.hasMany(models.activities, { foreignKey: "locationId" });
    }
  }
  locations.init(
    {
      country: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "locations",
    }
  );
  return locations;
};
