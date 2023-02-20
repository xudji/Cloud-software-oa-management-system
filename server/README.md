# 项目说明文档
- project/ 项目根目录
    + README.md 项目说明文档
    + package.json 记录项目和依赖包信息的配置文件
    + package-lock.json 依赖包信息的锁定文件
    + node_modules/ 安装的依赖包目录
    + index.js 入口文件(第一个执行的程序所在的文件)
    + routers/ 路由表目录
        + usersRouter.js 用户相关的路由表
        + goodsRouter.js 商品相关的路由表
    + www/ 静态资源目录
    + utils/ 自定义模块目录
        + mail.js 发送邮件模块
        + 注意：mail.js模块内部换成自己的配置！
    + db/ 数据库目录
        + connect.js 连接数据库模块
        + usersModel.js 用户数据模型
        + goodsModel.js 商品数据模型
        
- 技术栈
+ node.js
+ express
+ mongodb
