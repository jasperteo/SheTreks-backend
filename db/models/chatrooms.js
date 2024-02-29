"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chatrooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.activities, { foreignKey: "activityId" });
      this.hasMany(models.chatroom_members, { foreignKey: "chatroomId" });
      this.hasMany(models.chatroom_messages, { foreignKey: "chatroomId" });
    }
  }
  chatrooms.init(
    {
      activityId: {
        type: DataTypes.INTEGER,
        references: {
          model: "activiies",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "chatrooms",
    }
  );
  return chatrooms;
};
