"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class followings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "userId" });
      this.belongsTo(models.users, { foreignKey: "toFollowId" });
    }
  }
  followings.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      toFollowId: {
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
      modelName: "followings",
    }
  );
  return followings;
};
