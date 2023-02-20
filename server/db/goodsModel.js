// 商品相关的数据模型

// 加载模块
let mongoose = require('mongoose')

// 创建Schema对象
let goodsSchema = mongoose.Schema({
    name: {
        type: String,// 数据类型
        required: true,// 必填
    },
    price: {
        type: String,// 数据类型
        required: true,// 必填
    },
    desc: {
        type: String,// 数据类型
        required: true,// 必填
    },
    imgurl: {
        type: String,// 数据类型
        required: true,// 必填
    },
    num: {
        type: String,// 数据类型
        required: true,// 必填
    },
    type: {
        type: String,// 数据类型
        required: true,// 必填
    }
})

// 编译生成数据模型
let goodsModel = mongoose.model('goods',goodsSchema)

// 对外暴露数据模型
module.exports = goodsModel
