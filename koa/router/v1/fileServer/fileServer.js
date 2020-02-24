const Router = require("koa-router")
const fs = require("fs")
const path = require("path")
const uuid = require('node-uuid');
const baseUrl = require("../../../config/config").upload.baseurl
const router = new Router({
    prefix: '/v1/fileServer'
})
// /v1/fileServer/uploadfile
router.post('/uploadfile', async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    file.extname = path.extname(file.name); // 获取扩展名
    file.name = uuid.v1() + file.extname
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = `${process.cwd()}/public/upload/`+ `${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.body = {
        path: baseUrl + `${file.name}`
    }
});
module.exports = router