"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chatroom_members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.chatrooms, { foreignKey: "chatroomId" });
      this.belongsTo(models.users, { foreignKey: "userId" });
    }
  }
  chatroom_members.init(
    {
      chatroomId: {
        type: DataTypes.INTEGER,
        references: {
          model: "chatrooms",
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
      lastLoggedIn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "chatroom_members",
    }
  );
  return chatroom_members;
};
