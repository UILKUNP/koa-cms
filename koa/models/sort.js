//分类表
const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize")
class Sort extends Model {

}
Sort.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //用户id
    userId: {
        type: Sequelize.INTEGER
    },
    //分类图片
    sortImg: {
        type: Sequelize.STRING
    },
    //分类名字 唯一
    sortName: {
        type: Sequelize.STRING
    }

}, {
    sequelize: db,
    modelName: 'sort'

})

module.exports = Sort