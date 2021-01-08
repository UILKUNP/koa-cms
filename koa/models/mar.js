const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize");
class Mar extends Model {}
Mar.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    info: {
      type: Sequelize.JSON,
    },
  },
  {
    sequelize: db,
    modelName: "Mar",
  }
);
module.exports = Mar;
