//归档 archive
//分类表
const { Sequelize, Model } = require("sequelize");
const { db } = require("../core/sequelize")
class Archive extends Model {
}
Archive.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //用户id
    userId: {
        type: Sequelize.INTEGER
    },
    //归档图片
    archiveImg: {
        type: Sequelize.STRING
    },
    //归档名字
    archiveName: {
        type: Sequelize.STRING
    }

}, {
    sequelize: db,
    modelName: 'archive'

})

module.exports = Archive