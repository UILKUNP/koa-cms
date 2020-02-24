/*
    后台用户表
*/
const Roles = require("./roles")
const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize")
class AdminUsers extends Model {

}
AdminUsers.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //用户名
    userName: {
        type: Sequelize.STRING,
        unique: true
    },
    //密码
    password: {
        type: Sequelize.STRING
    },
    //邮箱
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    //电话
    phone: {
        type: Sequelize.STRING,
        unique: true
    },
    //角色Id
    roleId: {
        type: Sequelize.INTEGER,
        defaultValue: -1
    },
}, {
    sequelize: db,
    modelName: 'adminUsers'
})
//外键 角色表
AdminUsers.belongsTo(Roles, {
    as: 'Roles', 
    foreignKey:'roleId', 
    targetKey: 'id'
});
module.exports = AdminUsers