//生成token的模块
const jwt = require('jsonwebtoken')
const { key, expiresIn} = require("../config/config").jsonwebtoken
module.exports = async (sign, spoce) => {
    const token = jwt.sign({
        sign, spoce
    }, key, {
        expiresIn: expiresIn
    })
    return token
}