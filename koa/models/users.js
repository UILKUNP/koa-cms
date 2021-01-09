/*
    后台用户表
*/
const Mar = require("./mar");
const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize");
class Users extends Model {}
Users.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    openId: {
      type: Sequelize.STRING,
    },
    marId: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
  },
  {
    sequelize: db,
    modelName: "Users",
  }
);
//外键 角色表
Users.belongsTo(Mar, {
  as: "Mar",
  foreignKey: "marId",
  targetKey: "id",
});
module.exports = Users;
