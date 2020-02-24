/*
    角色表
*/
const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize")
class Roles extends Model {

}
Roles.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //角色名字
    roleName: {
        type: Sequelize.STRING,
        unique: true
    },
    //角色标识
    roleMark: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    sequelize: db,
    modelName: 'roles'

})
module.exports = Roles