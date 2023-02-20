// eslint配置文件
module.exports = {
    // 解析选项
    parserOptions: {
        ecmaVersion: 6, // ES语法版本
        sourceType: "module", // ES模块
        ecmaFeatrues: {
            jsx: true // 开启jsx语法检查
        }
    },
    // 语法规则
    // 'off' 或 0 关闭规则
    // 'warn' 或 1 开启规则并发出警告
    // 'error' 或 2 开启规则并发报错
    rules: {// 自定义规则
        'semi': ['error','never'],// 语句末尾禁止使用分号
        'space-infix-ops': 2,// 开启 要求操作符前后有空格
        'no-unused-vars': 2,// 开启 禁止出现未使用的变量
        'no-undef': 0,// 关闭 禁止使用未声明的变量
        // ...
    },
    // 继承ESlint官方推荐的规则
    "extends": "eslint:recommended",
    // 当继承的规则和自定义规则冲突时，自定义规则的优先级更高！
}
