// 开发模式配置文件
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
    // 多页面配置：

    // 入口
    entry: {
        index: './src/index.js',
    },

    // 输出
    output: {
        path: undefined,//开发模式不需要输出目录
        filename: '[name]-[hash:6].js'// 打包输出的文件名
    },

    // 加载器
    module: {
        rules: [
            // loader配置
            {
                // 匹配.css结尾的模块/资源
                test: /\.css$/i,
                // 匹配对应的模块/资源后，使用下面的laoder来处理（从右到左）
                use: ["style-loader", "css-loader"],
            },
            {
                // 匹配.less结尾的模块/资源
                test: /\.less$/i,
                // 匹配对应的模块/资源后，使用下面的laoder来处理（从下到上）
                use: [
                  'style-loader',
                  'css-loader',
                  'less-loader',
                ],
            },
            {
                // 匹配.png|.jpg|.jpeg|.gif结尾的模块/资源
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 图片小于10kb时，转成base64格式
                        // 优点：减少请次数，减轻服务器压力
                        // 缺点：图片体积变大，加载偏慢
                        maxSize: 1024 * 10
                    }
                },
                generator: {
                    // 设置图片打包输出目录和名称
                    // [name] 占位符，使用图片原来的名称
                    // [hash:6] 占位符，使用6位哈希值作为图片名称
                    // [ext] 占位符，使用图片原来的后缀
                    filename: 'imgs/[hash:6][ext]'
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)/,
                type: 'asset',
                generator: {
                    // 设置匹配资源打包输出目录和名称
                    // [query] 占位符，使用资源原来的查询字符串
                    filename: 'fonts/[name][ext][query]'
                }
            },
        ]
    },

    // 插件
    plugins: [
        // plugin配置（创建插件实例）
        new HtmlWebpackPlugin({
            // 以public/index.html作为模板打包一份到dist目录中
            // dist/index.html有两个特征：
            // 1.内容和模板文件一模一样；
            // 2.打包出来的html文件自动引入打包生成的js资源
            template: path.join(__dirname,'public/index.html'),
            // 设置打包生成html的输出目录和文件名称
            filename: './index.html',
            // 设置对应关系，使用index入口打包出来的资源
            chunks: ['index']
        }),
        new EslintWebpackPlugin({
            // 指定eslint检查的文件目录
            context: path.join(__dirname,'src'),
            // 排除某些目录不进行eslint检查
            exclude: path.join(__dirname,'src/js/lib'),
        })
    ],

    // 模式
    mode: 'development',// 打包模式 development 和 production

    // 开发服务器
    devServer: {
        host: 'localhost',// 主机名
        port: 9090,// 端口号
        open: true,// 服务器启动后自动打开默认浏览器
        hot: true,// 模块热替换（自动刷新）
    }
}
