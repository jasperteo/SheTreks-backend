"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.locations, { foreignKey: "locationId" });
      this.hasMany(models.activities, { foreignKey: "hostId" });
      this.hasMany(models.participants, { foreignKey: "userId" });
      this.hasMany(models.followings, { foreignKey: "userId" });
      this.hasMany(models.followings, { foreignKey: "toFollowId" });
      this.hasMany(models.notifications, { foreignKey: "recipientId" });
      this.hasMany(models.notifications, { foreignKey: "senderId" });
      this.hasMany(models.chatroom_members, { foreignKey: "userId" });
      this.hasMany(models.chatroom_messages, { foreignKey: "senderId" });
    }
  }
  users.init(
    {
      clerkUid: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      about: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      locationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "locations",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
