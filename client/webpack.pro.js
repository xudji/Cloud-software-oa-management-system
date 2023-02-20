// 生产模式配置文件
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    // 多页面配置：

    // 入口
    entry: {
        index: './src/index.js',
    },

    // 输出
    output: {
        path: path.join(__dirname,'dist'),// 打包输出的目录（会自动创建）
        filename: './js/[name]-[hash:6].js',// 打包输出的文件名
        clean: true// 每次打包之前先清空上次打包的内容
    },

    // 加载器
    module: {
        rules: [
            // loader配置
            {
                // 匹配.css结尾的模块/资源
                test: /\.css$/i,
                // 匹配对应的模块/资源后，使用下面的laoder来处理（从右到左）
                use: [MiniCssExtractPlugin.loader, "css-loader",'postcss-loader'],
            },
            {
                // 匹配.less结尾的模块/资源
                test: /\.less$/i,
                // 匹配对应的模块/资源后，使用下面的laoder来处理（从下到上）
                use: [
                   MiniCssExtractPlugin.loader,// 提取css
                  'css-loader',// 处理css资源
                  'postcss-loader',
                  'less-loader',// 编译成css
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
            {
                // 匹配.js结尾的模块/资源
                test: /\.js$/,
                // 排除node_modules目录
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                //   options: {
                //     // presets预设：智能预设（允许使用新的JS语法）
                //     presets: ['@babel/preset-env']
                //   }
                }
            }
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
            chunks: ['index'],
            // 打包浏览器标签页图标
            favicon: path.join(__dirname,'public/favicon.ico')
        }),
        new MiniCssExtractPlugin({
            // 设置提取出来的css文件目录和名称
            filename: 'css/[name]-[hash:6].css'
        }),
        new CssMinimizerWebpackPlugin(),// 压缩css
    ],

    // 模式
    mode: 'production',// 打包模式 development 和 production

}
