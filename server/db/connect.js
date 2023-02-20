// 连接数据库模块

// 加载模块
let mongoose = require('mongoose')

// 连接数据库（如果没有会自动创建数据库）
mongoose.connect('mongodb://127.0.0.1:27017/haha')

// 加上成功提醒和失败警告
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))// 失败警告
mongoose.connection.once('open', ()=>{
    console.log( '------------数据库连接成功------------' )
})// 成功提醒
