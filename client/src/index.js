// index入口文件
console.log( 'index入口文件' )

// 加载执行JS模块
import {fn1} from './js/module1.js'
fn1(10,20)

// 加载其他模块
import './less/index.less'
