/*
    路由表
*/
const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize")
class Routes extends Model {

}
Routes.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //图标
    icon: {
        type: Sequelize.STRING,
    },
    //路由名称
    name: {
        type: Sequelize.STRING,
        unique:true
    },
    //路由路径
    path: {
        type: Sequelize.STRING
    },
    //父路由id
    fatherRouteId: {
        type: Sequelize.INTEGER,
        defaultValue:-1
    },
    
}, {
    sequelize: db,
    modelName: 'routes'
})
module.exports = Routes