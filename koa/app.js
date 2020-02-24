const Koa = require("koa")
const app = new Koa()
const InitMar = require("./core/init")
InitMar.initCore(app)
console.log(app)
app.listen(1135)

