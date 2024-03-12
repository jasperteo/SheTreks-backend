"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        as: "recipient",
        foreignKey: "recipientId",
      });
      this.belongsTo(models.users, { as: "sender", foreignKey: "senderId" });
    }
  }
  notifications.init(
    {
      recipientId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      senderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      notifMessage: DataTypes.STRING,
      read: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "notifications",
    }
  );
  return notifications;
};
