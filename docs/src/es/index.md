# 介绍

:::tip
阅读本文档需要您具备 C、任意一门 C-like 面向对象语言、HTML 与 CSS 的基础知识储备。
:::

现在说的 ECMAScript，可与 JavaScript 混淆。

JavaScript 最初是由 Netscape 公司在 1995 年开发的，当时名为 LiveScript。由于 Sun Microsystems 公司持有 “Java” 这个品牌的商标，为了复刻 Java 的成功，Netscape 决定将其脚本语言的名字更改为 JavaScript。随着 JavaScript 的流行，ECMA 组织（欧洲佬）决定将其标准化，并在第一版 ECMAScript 规范发布后，JavaScript 成为了 ECMAScript 的一种实现方式（被夺舍了）。

下表列出了历代 ES 的主要更新内容：

| 版本号      | 发布时间          | 更新内容                                                     |
| ----------- | ----------------- | ------------------------------------------------------------ |
| ES1         | 1997 年           | 基础语言结构，包括变量、函数、控制流语句、基本数据类型等     |
| ES2         | 1998 年           | 此版本主要是修订和纠正 ES1 的一些错误和瑕疵                  |
| ES3         | 1999 年           | 引入正则表达式、try...catch 异常处理机制、更严格的错误处理等 |
| ES4         | 2000 年（未通过） | 大幅度改进与扩展，包括类、模块化、接口、泛型等，但由于争议过大而未被采纳 |
| ES5         | 2009 年           | 增加了严格模式、JSON 对象、Object.create()、Function.prototype.bind() 等 |
| ES6/ES2015  | 2015 年           | 增加了 let/const 关键字、箭头函数、解构赋值、类、模板字符串、Promise、Generator 等 |
| ES7/ES2016  | 2016 年           | 引入了 includes() 方法、指数运算符等                         |
| ES8/ES2017  | 2017 年           | 增加了 async/await、Object.entries()/Object.values() 等      |
| ES9/ES2018  | 2018 年           | 引入了 rest 参数和扩展运算符、正则表达式相关功能的扩展等     |
| ES10/ES2019 | 2019 年           | 引入了 Array.flat() 和 Array.flatMap() 方法、String.trimStart()/trimEnd() 等 |
| ES11/ES2020 | 2020 年           | 引入了可选链操作符、空值合并运算符、Promise.allSettled() 等  |
| ES12/ES2021 | 2021 年           | 增加了字符串 replaceAll()、Promise.any() 等                  |
| ES13/ES2022 | 2022 年           | 引入了类成员私有化、静态类成员等面向对象机制，支持数组逆序索引等 |

那 Java 和 JavaScript 是什么关系？就像狗与热狗的的关系——毫无关系。

JavaScript 是 Web 的编程语言。所有现代的 HTML 页面都可以使用 JS。利用 JS，我们可以做到很多重量级语言难以做到的事情：比如编写动态的 GUI。想要成为一位*优秀的全栈工程师*（狗），前端开发是跑不掉的，而 JS 绝对有充足的理由让你选择它。

当然，JS 也是一个令人尴尬的玩具语言，因为它一点都不严谨。开发者的小小疏忽会给生产带来巨大的损失。因此 TypeScript 出世，意图取代 JS......这正在成为一种趋势。
