const {Sequelize,Model} = require("sequelize");
const {db}=require("../core/sequelize")
class User extends Model{

}
User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    //登陆账号
    userName:{
        type:Sequelize.STRING,
        unique:true
    },
    //昵称
    nickName:{
        type:Sequelize.STRING,
        unique:true
    },
    //头像
    headImg:{
        type:Sequelize.STRING
    },
    //email
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    //备用邮箱
    email2: {
        type: Sequelize.STRING,
        unique: true
    },
    signature:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING,
        unique:true
    }
  
},{
        sequelize: db,
        modelName: 'user'
        
})

module.exports = User