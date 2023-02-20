// 商品相关的路由表

// 加载模块
let express = require('express')
let path = require('path')
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

// 后端接收上传的文件
// 使用multer插件接收文件
// 1.安装：npm i multer
// "multer": "^1.4.5-lts.1"
// 2.加载模块
let multer = require('multer')

/* // 3.创建multer对象
let upload = multer({// opts配置对象
    dest: './www/uploads/' // 设置上传文件的存储目录
})
// 4.接收单个文件
// upload.single('upfile') */

// 3.创建multer对象
let upload = multer({// opts配置对象
    limits: {
        // 限制上传文件最大为500kb
        fileSize: 1024 *500
    },
    fileFilter: function (req,file,cb){
        // console.log( file )
        // file = {
        //     fieldname: 'upfile',
        //     originalname: '02.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg'
        // }
        // 过滤上传文件类型
        let reg = /\.(png|jpe?g|gif)$/i
        if (reg.test(file.originalname)) {
            cb(null, true)// 接收文件
        } else {
            cb(null, false)// 拒收文件
        }
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // console.log( file )
            // file = {
            //     fieldname: 'upfile',
            //     originalname: '02.jpg',
            //     encoding: '7bit',
            //     mimetype: 'image/jpeg'
            // }
            // 设置上传文件的存储目录
            cb(null, './www/uploads')
        },
        filename: function (req, file, cb) {
            // console.log( file )
            // file = {
            //     fieldname: 'upfile',
            //     originalname: '02.jpg',
            //     encoding: '7bit',
            //     mimetype: 'image/jpeg'
            // }
            // 设置上传文件的名称
            let filen = 'upload-'+Date.now()+'-'+parseInt(Math.random()*100000)+path.extname(file.originalname)
            cb(null, filen)
        }
    })
})
// 4.接收单个文件
let fun = upload.single('upfile')

// 上传文件接口
router.post('/update',(req,res)=>{// 请求处理函数
    // console.log( req.file )
    // req.file = {
    //     fieldname: 'upfile',
    //     originalname: '02.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: './www/uploads/',
    //     filename: '9012e2d616fe875aba0d6fb769d57aa6',
    //     path: 'www\\uploads\\9012e2d616fe875aba0d6fb769d57aa6',
    //     size: 50687
    // }
    // console.log( req.body )// { user: 'xiaocuo' }

    fun(req,res,(err)=>{// 接收文件之后执行回调函数
        if (err) {
            // 文件大小不符合要求,接收文件出错
            return res.send({"code":-1,"msg":"上传文件最大为500kb"})
        }
        if (!req.file) {
            // 上传文件被拒收
            return res.send({"code":-2,"msg":"上传文件类型错误"})
        }
        res.send({"code":1,"msg":"上传文件成功","imgurl":'http://localhost:8080/static/uploads/'+req.file.filename})
    })
})

// 对外暴露模块内容
module.exports = router
