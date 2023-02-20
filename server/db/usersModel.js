// 用户相关的数据模型

// 加载模块
let mongoose = require('mongoose')

// 创建Schema对象
let usersSchema = mongoose.Schema({
    user: {
        type: String,// 数据类型
        required: true,// 必填
    },
    pass: {
        type: String,// 数据类型
        required: true,// 必填
    },
    age: {
        type: String,// 数据类型
        required: true,// 必填
    },
    sex: {
        type: String,// 数据类型
        default: '妖',// 默认值
    },
    nick: {
        type: String,// 数据类型
        default: '老王',// 默认值
    },
    email: {
        type: String,// 数据类型
        required: true,// 必填
    }
})

// 编译生成数据模型
let usersModel = mongoose.model('users',usersSchema)

// 对外暴露数据模型
module.exports = usersModel
