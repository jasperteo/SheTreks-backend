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
      this.belongsTo(models.users, { foreignKey: "recipientId" });
      this.belongsTo(models.users, { foreignKey: "senderId" });
      this.belongsTo(models.notification_types, { foreignKey: "notifId" });
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
      notifId: {
        type: DataTypes.INTEGER,
        references: {
          model: "notification_types",
          key: "id",
        },
      },
      read: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "notifications",
    }
  );
  return notifications;
};
