//文章分类中间表
//表示文章和分类之间的映射关系
const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize")
class ArticleSort extends Model {
}
ArticleSort.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //分类的id
    sortId: {
        type: Sequelize.INTEGER,
    },
    //文章的id
    articleId: {
        type: Sequelize.INTEGER,
    },
}, {
    sequelize: db,
        modelName: 'articleSort'

})

module.exports = ArticleSort