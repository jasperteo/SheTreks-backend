"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class activity_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.activities, { foreignKey: "activityId" });
      this.belongsTo(models.categories, { foreignKey: "categoryId" });
    }
  }
  activity_categories.init(
    {
      activityId: {
        type: DataTypes.INTEGER,
        references: {
          model: "activiies",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "activity_categories",
    }
  );
  return activity_categories;
};
