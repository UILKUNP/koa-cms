module.exports={
    mysql:{
        host: '47.96.156.222',
        port: '3306',
        user: 'koaCms',
        password: 'yCJd8AFwtbTBfJD8',
        database: 'koaCms',
        logging:false,
        connectionLimit: 20000
    },
    upload:{
        //上传文件后，返回文件地址的前缀
        baseurl:"http://localhost:1135/",
    },
    admin:{password:'DQ3GD1DD'},
    jsonwebtoken: {
        key: "3MjU0LCJleHAiOj",//密码  ！！！重要，不可泄漏
        expiresIn: 60*10*10 // token过期时间，单位秒
    }
}