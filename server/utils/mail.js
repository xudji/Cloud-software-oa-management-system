// 发送邮件模块

// 加载模块
const nodemailer = require("nodemailer")

function senMail(eamil,sub,content){
    // 创建 transporter 对象
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",// 管理员邮箱的主机名 (查看下方 配置1)
        port: 465, // (查看下方 配置1)
        secure: true, // 端口是465时为true，其他端口为false (查看下方 配置1)
        auth: {
            user: '99835885@qq.com', // 管理员邮箱地址
            pass: 'lgfuvydmpaudcadi', // 管理员邮箱的SMTP授权码 (查看下方 配置2)
        },
    });

    return new Promise((resolve,reject)=>{
        // 发送邮件(异步)
        transporter.sendMail({
            from: '"网站管理员 👻" <99835885@qq.com>', // 管理员邮箱地址
            to: eamil, // 邮件接收者邮箱地址
            subject: sub, // 邮件主题
            text: content, // 文本格式的邮件内容(二选一)
            // html: "<b>Hello world?</b>", // html格式的邮件内容(二选一)
        },(err)=>{
            if (err) {
                console.log( '邮件发送失败' )
                reject()
            } else {
                console.log( '邮件发送成功' )
                resolve()
            }
        });
    })
}

// 对外暴露模块内容
module.exports = {senMail}

// let mail = require('./mail.js')
// mail.senMail('2239222721@qq.com','注册验证码','您的验证码是：12345')
// .then(
//     ()=>{
//         console.log( '邮件发送成功后再执行的程序' )
//     },
//     ()=>{
//         console.log( '发送邮件失败' )
//     }
// )
