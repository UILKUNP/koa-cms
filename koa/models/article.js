//文章表
const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize")
class Article extends Model {

}
Article.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },   
    //用户id
    userId: {
        type: Sequelize.INTEGER
    },
    //标题
    title: {
        type: Sequelize.STRING
    },
    //主图
    mainImg: {
        type: Sequelize.STRING
    },
    //内容:
    contant:{
        type:Sequelize.JSON
    },
    //归档id
    archiveId:{
        type: Sequelize.INTEGER,
    }
}, {
    sequelize: db,
        modelName: 'article'

})

module.exports = Article