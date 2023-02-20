// 商品相关的路由表

// 加载模块
let express = require('express')
let goodsModel = require('../db/goodsModel.js')

// 创建路由表（空表）
let router = express.Router()

// 向路由表中添加内容
router.post('/a',(req,res)=>{// fn1 请求处理函数
    res.send('goods /a')
})
router.post('/b',(req,res)=>{// fn2 请求处理函数
    res.send('goods /b')
})
router.post('/c',(req,res)=>{// fn3 请求处理函数
    res.send('goods /c')
})

// 对外暴露模块内容
module.exports = router
