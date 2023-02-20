// 入口文件

// 加载模块
let express = require('express')
let path = require('path')
let usersRouter = require('./routers/usersRouter.js')
let goodsRouter = require('./routers/goodsRouter.js')

// 连接数据库
require('./db/connect.js')

// 创建express服务
let app = express()

// 设置CORS跨域资源共享
let cors = require('cors')
app.use('/', cors())

// 解析请求体中的数据
app.use('/', express.json())// 解析json数据
app.use('/', express.urlencoded({ extended: false }))// 解析x-www-form-urlencoded数据

// 使用路由表匹配用户请求
app.use('/users', usersRouter)
app.use('/goods', goodsRouter)

// 设置静态资源目录
app.use('/static', express.static(path.join(__dirname, 'www')))

// 设置 端口号 IP地址 回调函数
app.listen(8080, () => {
    console.log('--------------服务启动成功-------------')
})
