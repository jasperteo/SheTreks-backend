"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chatroom_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.chatrooms, { foreignKey: "chatroomId" });
      this.belongsTo(models.users, { foreignKey: "senderId" });
    }
  }
  chatroom_messages.init(
    {
      chatroomId: {
        type: DataTypes.INTEGER,
        references: {
          model: "chatrooms",
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
      message: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "chatroom_messages",
    }
  );
  return chatroom_messages;
};
