// 用户相关的路由表

// 加载模块
let express = require('express')
let usersModel = require('../db/usersModel.js')
let jwt = require('jsonwebtoken')

// 创建路由表（空表）
let router = express.Router()

// 向路由表中添加内容:

// 判断是否已登录接口：
router.get('/islogin',(req,res)=>{
    /* // 前端请求该接口时，携带session id过来
    // express-session插件自动根据session id去匹配到对应的session数据
    // console.log( req.session )
    if (req.session.islogin === 'ok') {
        // 用户已登录
        res.send({"code":1,"msg":"用户已登录","username":req.session.username,"nickname":req.session.nickname})
    } else {
        // 用户未登录
        res.send({"code":0,"msg":"用户未登录","username":"","nickname":""})
    } */

    // 获取前端携带过来的token
    const token = req.headers.authorization
    // 验证token
    jwt.verify(token,'abc123',(err,payload)=>{
        if (err) {
            // 验证token失败
            res.send({"code":0,"msg":"用户未登录","username":"","nickname":""})
        } else {
            // 验证token成功
            res.send({"code":1,"msg":"用户已登录","username":payload.username,"nickname":payload.nickname})
        }
    })
})

// 登录接口：
// 接口地址：http://192.168.21.27:8080/users/login
// 请求方式：post
// 请求参数：user账号  pass密码
// 返回值：{"code":1,"msg":"登录成功","token":"xxx"}
router.post('/login',(req,res)=>{// fn1 请求处理函数
    // 接收前端传输的参数
    let {user,pass} = req.body

    // 查询数据库
    // $and逻辑与，表示后面数组中的条件必须都符合
    // usersModel.find({$and:[{user:user},{pass:pass}]})
    usersModel.find({$and:[{user},{pass}]})
    .then((arr)=>{
        if (arr.length > 0) {
            // 登录成功，响应请求

            // 向session中存储数据
            // req.session.islogin = 'ok' // 已登录的标识
            // req.session.username = arr[0].user // 存储账号
            // req.session.nickname = arr[0].nick // 存储昵称

            // 生成一个token
            let info = {// 要存储的用户信息
                "username": arr[0].user,
                "nickname": arr[0].nick
            }
            let token = jwt.sign(info,'abc123',{expiresIn:60*30})

            // 响应登录结果和token
            res.send({"code":1,"msg":"登录成功","token":token})
        } else {
            // 登录失败，响应请求
            res.send({"code":0,"msg":"账号或密码错误"})
        }
    })
    .catch((err)=>{
        // 登录失败，响应请求
        res.send({"code":-1,"msg":err})
    })
})

// 注册接口：
// 接口地址：http://192.168.21.27:8080/users/register
// 请求方式：post
// 请求参数：user,pass,age,sex,email,nick
// 返回值：{"code":1,"msg":"注册成功"}
router.post('/register',(req,res)=>{// fn2 请求处理函数
    // 接收前端传输的参数
    let {user,pass,age,sex,email,nick} = req.body

    // 先查询数据库（避免重复账号）
    usersModel.find({user})// p1
    .then((arr)=>{
        if (arr.length > 0) {
            // 该账号已被占用，不允许重复注册
            res.send({"code":-1,"msg":"该账号已被占用"})
            // 终止链式调用
            return new Promise(()=>{})
        } else {
            // 然后，数据库没有该账号，可以注册，添加一条数据
            return usersModel.insertMany({user,pass,age,sex,email,nick})// p3
        }
    })// p2
    .then((arr)=>{
        if (arr.length > 0) {
            // 添加成功，注册成功
            res.send({"code":1,"msg":"注册成功"})
        } else {
            // 添加失败，注册失败
            res.send({"code":0,"msg":"注册失败"})
        }
    })
    .catch((err)=>{
        // 添加失败，注册失败
        res.send({"code":-2,"msg":err})
    })
})

router.get('/c',(req,res)=>{// fn3 请求处理函数
    res.send('users /c')
})

// 对外暴露模块内容
module.exports = router
