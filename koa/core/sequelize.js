//配置sequelize相关参数
const { host, port, user, password, database, logging} =require("../config/config").mysql
const Sequelize=require("sequelize");
const sequelize=new Sequelize(
    database,
    user,
    password,
    {
        dialect:"mysql",
        host:host,
        port:port,
        logging:logging,
        timezone:"+08:00",
        define: {
            freezeTableName: true,//取消自动复数
            paranoid: true, //虚拟删除
            underscored: true,//下划线
        }
    },
)
sequelize.sync()
module.exports = { db: sequelize}