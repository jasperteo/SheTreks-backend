'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chatroom_members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chatroom_members.init({
    chatroomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    lastLoggedIn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'chatroom_members',
  });
  return chatroom_members;
};