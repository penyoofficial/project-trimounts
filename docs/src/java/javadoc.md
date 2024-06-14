# 说明文档

> _一个不会写注释和文档的程序员是失败的，就像他的人生一样，卡在那里，上不去下不来。_

Java 支持三种注释方式。前两种分别是 `//` 和 `/*` `*/` ，第三种被称作**说明文档**，它以 `/**` 开始，以 `*/` 结束。

说明文档允许你在程序中嵌入关于程序的信息，如作者、首次出现版本、关联类等。

## 生成 Web 式文档

你可以使用 javadoc 工具软件来生成信息，并输出到 HTML 文件中。说明注释，使你更加方便的记录你的程序信息。

工具软件识别以下标签：

| 标签           | 描述                                                   | 示例                                  |
| -------------- | ------------------------------------------------------ | ------------------------------------- |
| @author        | 标识一个类的作者                                       | @author description                   |
| @deprecated    | 指名一个过期的类或成员                                 | @deprecated description               |
| \{@docRoot}    | 指明当前文档根目录的路径                               |                                       |
| @exception     | 标志一个类抛出的异常                                   | @exception exception-name explanation |
| \{@inheritDoc} | 从直接父类继承的注释                                   |                                       |
| \{@link}       | 插入一个到另一个主题的链接                             | {@link name text}                     |
| \{@linkplain}  | 插入一个到另一个主题的链接，但是该链接显示纯文本字体   |                                       |
| @param         | 说明一个方法的参数                                     | @param parameter-name explanation     |
| @return        | 说明返回值类型                                         | @return explanation                   |
| @see           | 指定一个到另一个主题的链接                             | @see anchor                           |
| @serial        | 说明一个序列化属性                                     | @serial description                   |
| @serialData    | 说明通过 writeObject() 和 writeExternal() 方法写的数据 | @serialData description               |
| @serialField   | 说明一个 ObjectStreamField 组件                        | @serialField name type description    |
| @since         | 标记当引入一个特定的变化时                             | @since release                        |
| @throws        | 和 @exception 标签一样                                 |                                       |
| \{@value}      | 显示常量的值，该常量必须是 static 属性                 |                                       |
| @version       | 指定类的版本                                           | @version info                         |

在开始的 `/**` 之后，第一行或几行是关于类、变量和方法的主要描述。之后，你可以包含一个或多个各种各样的标签。每一个标签必须在一个新行的开始或者在一行的开始紧跟星号 `*` 。多个相同类型的标签应该放成一组。例如，如果你有三个 `@see` 标签，可以将它们一个接一个的放在一起。

在命令行中键入以下命令生成 Web 式文档：

```txt
javadoc Demo.java
```
