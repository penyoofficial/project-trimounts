# Kotlin 基础

想要开发现代化的 Android 应用程序，你必须学习 Kotlin。不像从前你可以用 Java 替代，最新的 Jetpack Compose 完全使用 Kotlin 开发。

虽然 Kotlin 之于 Java 类似 TypeScript 之于 JavaScript，但是还是有很多不同之处的。这份文档主要讲述这些特殊之处。

## 程序入口

与 Java 不同，Kotlin 更有函数式的风范。程序从**主函数**开始：

```kt
fun main() {
  println("Hello, Kotlin!")
}
```

主函数是孤立的，不需要借助类作为载体。

且语句后不强制需求分号作为截断符。

## 基本数据类型与声明

下面展示了 Kotlin 中的最基本的类型：

| 类型名  | 描述          |
| ------- | ------------- |
| String  | 文本          |
| Int     | 整数（32bit） |
| Float   | 低精度小数    |
| Double  | 高精度小数    |
| Boolean | 布尔          |

虽然它们都是“基本类型”，但是又都不是基本类型，而是包装类——Kotlin 里没有真正的基本类型。

:::tip
这并不是全部的基本类型，你可以在[官方文档](https://kotlinlang.org/docs/basic-types.html)上了解更多。
:::

声明**常量**（确切来说是不可变变量）使用关键字 `val`：

```kt
// 开发中总是推荐优先使用常量，性能更好
val str: String = "阿米诺斯！"
```

声明**变量**使用关键字 `var`：

```kt
var str: String = "新年好鸭"
str = "78物业"
```

但解释器会由所赋值自动推断变量的类型（在例子中为 String）。所以其实可以不用显式地标注类型：

```kt
val str = "阿米诺斯！"
```

这和 TypeScript 简直是一模一样了（但没有类型断言，毕竟 Kotlin 还是强类型语言）。

:::warning
如果声明常量/变量时没有一并初始化，则必须给出类型：

```kt
val whatCharIsIt: Char
```

:::

## 模板字符串

JDK 直到 21 版本才支持模板字符串！而且仍然难用得要死！

Kotlin 则早早带来了使用 EL 表达式的模板字符串功能：

```kt
val str = "娇宝"
println("$str，我真的好喜欢你啊！")
// ${str} 也一样，内部值不是表达式的时候，大括号可以省略

val num1 = 13
val num2 = 14
println("$num1 加上 $num2 是应该等于 ${num1 + num2} 呢，还是 $num1$num2 呢？")
```

## 函数

函数让我们更优雅地抽象业务逻辑：

```kt
fun main() {
  meow()
}

fun meow() {
  println("喵~")
}
```

对于不返回值（返回空值）的函数，其类型总为隐式的 `Unit`（其实就是 Java 里的 `void`）。你可以显式指出，这不会有什么影响。

但倘若有返回值：

```kt
fun main() {
  println(meow())
}

// 你必须显式给出返回值类型，解释器不会推断函数的类型！
fun meow(): String {
  return "喵~"
}
```

若有参数：

```kt
fun toString(num: Int): String {
  return "$num"
}
```

:::warning
Kotlin 函数中的参数全部都是不可变的！这也是函数式的根本，免得产生许多副作用。
:::

若有多个参数：

```kt
fun intro(name: String, gender: String) {
  println("$name是$gender孩子！")
}

fun main() {
  // 你熟悉的调用方式
  intro("娇宝", "女")
  // 具名化的调用方式（不需要再在意顺序）
  intro(gender = "女", name = "彤宝")
}
```

参数还可以用有默认值（即具名化遗漏参数时，仍能有值）：

```kt
fun isNeko(name: String = "小明"): Boolean {
  // 省略
}
```

## 条件控制流

需要按照外部输入而做出不同决策？是时候了解 `if-else` 结构了：

```kt
if (condition1) {
  // do something
} else if (condition2) {
  // do something
} else {
  // do something
}
```

——目前看来与 Java 完全一样，但有不同之处：

```kt
val age = 19
val result = if (age > 18) {
  "成年人"
} else if (age > 60) {
  "老年人"
} else {
  "小屁孩"
}

println(result) // 成年人
```

即：若分支结果直接指向数据，则此时控制流可以被视为一个函数，返回此值。_别想着用三目表达式替代，Kotlin 中没有该语法规则。_

在 Kotlin 中，没有 `switch` 结构，与之对应的是 `when` 结构：

```kt
when (condition) {
  value1 -> doSomething()
  value2 -> {
    // do many things
  }
  value3, value4 -> doSomethingElse()
  else -> noValueMatched()
}
```

但不太一样的是，`when` 结构可以借助运算符 `in` 和 `..` 处理连续数据：

```kt
when (hourInDay) {
  // 表示 [1, 6] 区间
  in 1..6 -> "凌晨"
  in 6..9 -> "早上"
  in 9..11 -> "上午"
  in 11..13 -> "中午"
  in 13..17 -> "下午"
  in 17..19 -> "傍晚"
  in 19..23 -> "晚上"
  else -> "深夜"
}
```

:::tip
`in` 运算符可判断集合内是否包含某实例。两个数值之间使用 `..`就构成了一个连续集合。
:::

你还可以借助 `is` 判断类型：

```kt
// 是的，你没看错，Any！
fun knowWhatType(data: Any) {
  return when (data) {
    is Int -> "是整型。"
    is String -> "是字符串型。"
    is Boolean -> "是布尔型。"
    else -> "不太清楚。"
  }
}
```

:::warning
使用控制流给变量赋值时，必须考虑 `else` 分支，否则可能会出现变量取空的意外情况！
:::

## 循环控制流

`for-in` 结构是最简单的循环体：

```kt
// group 可以是任何可迭代的对象，如数组、集合
for (item in group) {
  // do something
}
```

如果想要获得索引而不是直接的元素：

```kt
for (index in group.indices) {
  // do something with group[index]
}

// 或

for ((index, value) in group.withIndex()) {
  // do something with index and value
}
```

此外还有 `while` 和 `do-while` 两种循环体，与 Java 一致。

但 Kotlin 做出了创新：在跳出循环时可以指定层级——通过**标签**：

```kt
layer1@ for (i in arr1) {
  // ...
  layer2@ for (j in arr2) {
    // ...
    layer3@ for (k in arr3) {
      // ...
      if (condition)
        break@layer1
      // ...
    }
  }
}
```

你还可以使用 `repeat()` 高阶函数：

```kt
// 循环 114514 次
repeat(114514) {
  println(it)
}
```

关于 `it` 的含义，查阅[后续章节](#回调函数)。

## 空值

在 Kotlin 中，`null` 只能赋给**可空类型**。一个不可空类型可以通过追加半角问号变为可空类型：

```kt
var address: String? = null
```

如果你想要**安全地**获得可空类型的成员，则也应使用问号：

```kt
println(address?.length)
// 如果 address 是 null，那么 length 也会是 null，而不是直接爆炸
```

必要时可以断言非空：

```kt
println(address!!.length)
```

或者提高健壮性，使用空值默认取值符 `?:`（Elvis 运算符）：

```kt
val str: String? = null
println(str?.length ?: 0)
// 夫人，你也不想字符串的长度是 null 吧
```

## 类与对象

类声明方式与 Java 大致相同，但这里要指出几点不同：

1. 主构造器

```kt
/*
 * 构造器分为主构造器和次构造器，主构造器是类头的一部分。
 * 如果主构造器没有任何注解，也没有任何可见度修饰符，那么 constructor 关键字可以省略。
 * 主构造参数默认是可变的，因此 var 也可以去掉。
 */
class YourClass constructor(var yourAttr: String) {
  // 主构造器里没有代码，但是初始化方法里可以处理主构造器接收的参数
  init {
    println("你传了个什么，我看看，哦！是$yourAttr")
  }
}
```

:::tip
**权限修饰符**未显式指定时，总为 `public`。全部可选项参照下表：

| 关键字    | 描述                                   |
| --------- | -------------------------------------- |
| private   | 类内部可见，所有其它类不可见，包括子类 |
| protected | 本类和子类可见，其它类不可见           |
| internal  | 本模块内可见                           |
| public    | 所有类都可见                           |

:::

2. 次构造器

```kt
class YourClass(yourAttr: String) {
  /*
   * 次构造器必须继承主构造器的全部参数并返回主构造器的类型。
   * 如果本类没有（显式的）主构造器，就需要调用空参主构造器 this() 或父类主构造器 super(...)
   */
  constructor(yourAttr: String, attr2: String): this(yourAttr) {
    // ...
  }
}
```

3. 属性定义

```kt
class YourClass {
  /*
   * 任何类属性都会有同等权限的隐式 getter 和 setter，内容形同下列。
   * field 是仅限于 getter 和 setter 内使用的隐式对象，表示当前字段。
   * 你可以显式地修改两者，以达到特殊目的。
   * 不可变变量的 setter 没有意义。
   */
  var yourAttribute: String = "Haha"
    get() = field
    set(value) {
      field = value
    }

  // 这个 getter 跟上面的 getter 意义相同吗？
  fun getYourAttribute(): String {
    return yourAttribute
  }

  // 常规类方法没什么说的
  fun yourMethod(yourParameter: String = "nothing") {
    println(yourParameter)
  }
}
```

4. 实例化

```kt
val instance = YourClass()
// 没有 new！
```

5. 继承

Kotlin 中所有类都隐式继承自 `Any` 类。

:::warning
`Any` 不是 `java.lang.Object`！
:::

```kt
/*
 * 类以及内部所有成员，默认都是 final 的，即不能被继承/重写。
 * 但 open 可以改变其性质。
 */
open class MyClass(param: String) {
  open fun haha() {
    println("Haha!")
  }
}

class YourClass(param: String) : MyClass(param) {
  // 被覆盖/重写的成员必须使用 override 关键字
  override fun haha() {
    println("Haha!")
  }
}
```

Kotlin 支持多重继承，这意味着是有可能出现**钻石继承**的问题的。

## 委托模式

**委托模式**是软件设计模式中的一项基本技巧。在委托模式中，有两个对象参与处理同一个请求，接受请求的对象将请求委托给另一个对象来处理。

```kt
// 创建接口
interface Base {
    fun print()
}

// 实现此接口的被委托的类
class BaseImpl(val x: Int): Base {
    override fun print() { print(x) }
}

// 通过关键字 by 建立委托类
class Derived(b: Base): Base by b

fun main(args: Array<String>) {
    val b = BaseImpl(10)
    Derived(b).print() // 输出 10
}
```

除了类，类里的成员也可以委托。

## 回调函数

Kotlin 支持将函数存储为变量：

```kt
fun ahhh() {
  println("啊啊啊啊啊啊啊啊啊啊啊！")
}

// :: 表示值引用，必须加上
val yell = ::ahhh
```

但不太优雅。如果 _ahhh_ 不是一个**函数**而是**变量**的话：

```kt
val ahhh = {
  println("啊啊啊啊啊啊啊啊啊啊啊！")
}

// 不用引用了
val yell = ahhh
```

此时 _ahhh_ 的类型就是 `() -> Unit`，也就是无参回调函数。

如果有参：

```kt
val hello: (String) -> Unit = { who ->
  println("Hello, $who!")
}
```

但如果只有一个参数，Kotlin 会隐式分配实参名为 _it_：

```kt
val hello: (String) -> Unit = {
  println("Hello, $it!")
}
```

如果回调函数正好在参数列表的末尾，还可以使用**尾随 lambda 表达式**：

```kt
// 沉默，是今晚的康桥
fun saySomething(say: (() -> Unit)?) {
  if (say != null) say()
}

fun main() {
  // 匿名回调
  saySomething() {
    println("Hello, motherfucker!")
  }
}
```
