# JDBC 技术

**JDBC**（Java Database Connectivity）是 Java 程序连接到关系型数据库的技术，所有的关系型数据库都遵循 JDBC 的标准（Sun 定义接口，数据库厂商编写**实现类/驱动**）。适配 JDBC 的程序设计模式也被称为**面向接口编程**。

使用 JDBC 的基本步骤如下：

- 创建工程，导入驱动 jar 包
- 注册驱动

```java
Class.forName("com.mysql.jdbc.Driver"); // 反射
// MySQL Connector-J 最新版本包名已变为 com.mysql.cj.jdbc
```

- 获取连接

```java
Connection c = DriverManager.getConnection(url, username, password);
// url = "jdbc:mysql://ipOrDomain:port/dbName?argu1=value1&argu2=value2...";
// 若连接本机 MySQL 服务器且端口为默认的 3306，则可省略为 jdbc:mysql:///dbName...
// 配置 useSSL=false 以禁用安全连接，解决警告
```

- 定义 SQL 语句

```java
String sql = "update...";
```

- 获取执行 SQL 语句的对象

```java
Statement s = c.createStatement();
```

- 执行 SQL 语句

```java
s.executeUpdate(sql);
// 返回值为受影响的行数
```

- 处理返回结果（计算、存储、打印...）
- 释放资源

```java
s.close(); // 关闭对象
c.close(); // 关闭连接
```

## DriverManager 类

**DriverManager** 类用于注册驱动和获取数据库连接，其包名为 `java.sql.DriverManager`。该类中所有的方法都是静态方法。

其中有两个方法比较重要：

| 方法名                                                                    | 说明                            |
| ------------------------------------------------------------------------- | ------------------------------- |
| static Connection getConnection(String url, String user, String password) | 尝试建立与给定数据库 URL 的连接 |
| static void registerDriver(Driver driver)                                 | 注册驱动                        |

`com.mysql.jdbc.Driver` 中已经调用了 `registerDriver()` 方法，因此不需要重复调用，只需要直接反射就可以了。MySQL 5.0 及之后的版本会自行注册，无需手动注册/反射（_\*.jar/META-INF/services_ 中有相应信息）。

## Connection 接口

**Connection** 接口用于获取执行 SQL 语句的对象和管理事务，其包名为 `java.sql.Connection`。

获取对象有三种方法：

| 方法名                                          | 说明                                          |
| ----------------------------------------------- | --------------------------------------------- |
| Statement createStatement()                     | 返回普通执行 SQL 对象                         |
| PreparedStatement preparedStatement(String sql) | 返回预编译 SQL 的执行 SQL 对象：防止 SQL 注入 |
| CallableStatement prepareCall(String sql)       | 返回执行存储过程的对象                        |

在 MySQL 中，开启**事务**（命令的集合。要么都执行成功，要么都执行失败。仅部分成功则回滚到执行前）用到 `begin;` 或 `start transaction;`，提交用到 `commit;`，回滚用到 `rollback;`。在 JDBC 中，Connection 接口定义了三个对应的方法：

| 方法名                                  | 说明                                                    |
| --------------------------------------- | ------------------------------------------------------- |
| void setAutoCommit(boolean autoCommint) | 是否自动提交事务。为 false 则是手动提交事务，即开启事务 |
| void commit()                           | 提交事务                                                |
| void rollback()                         | 回滚事务                                                |

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Demo {
    public static void main(String[] args) throws SQLException {
        // 设置 serverTimezone=UTC 参数可以无视本地与服务器时区差异
        Connection c = DriverManager.getConnection("jdbc:mysql:///?useSSL=false&serverTimezone=UTC", "root", "1234");
        Statement s = c.createStatement();

        // 包装事务
        try {
            // 手动接管事务
            c.setAutoCommit(false);
            s.executeUpdate("drop database if exists demo");
            s.executeUpdate("create database demo");
            s.executeUpdate("use demo");
            s.executeUpdate("create table map(k text, v text)");
            s.executeUpdate("insert into map values('樱桃', '德国')");
            s.executeUpdate("insert into map values('凯华', '中国大陆')");
            s.executeUpdate("insert into map values('高特', '中国台湾')");
            // 提交事务
            c.commit();
            System.out.println("狠狠的成功了！");
        } catch (Exception e) {
            // 失败就回滚事务
            c.rollback();
            e.printStackTrace();
            System.out.println("狠狠的失败了！");
        }
    }
}
```

## Statement 接口

**Statement** 接口用于执行 SQL 语句。

它有两个很重要的方法：

| 方法名                             | 说明                                 |
| ---------------------------------- | ------------------------------------ |
| int executeUpdate(String sql)      | 执行 DDL 和 DML 语句。返回受影响行数 |
| ResultSet executeQuery(String sql) | 执行 DQL 语句。返回结果集            |

前者的返回值为 0 时，只能说明 0 行被改动，不能代表操作失败。此外，删除数据库也被视为 0 行被改动（因为没有具体操作某行）。

## ResultSet 接口

**ResultSet** 接口封装了 DQL 查询语句的结果。它虽然名称中含有 "Set"，但并不继承/实现任何 `Set`，因此不得使用迭代器对此对象进行“迭代”。

“迭代”结果集对象使用方法：

| 方法名             | 说明                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| boolean next()     | 将光标从当前位置向后移动一单元（默认光标指向表头）。返回目标行的有效性，下同 |
| boolean previous() | 将光标从当前位置向前移动一单元                                               |
| boolean first()    | 将光标移动到第一单元                                                         |
| boolean next()     | 将光标移动到最后一单元                                                       |
| boolean absolute() | 将光标移动到指定单元                                                         |

获取确定行的数据使用方法：

| 方法名                                 | 说明                                                        |
| -------------------------------------- | ----------------------------------------------------------- |
| Type getType(columnNameOrColumnNumber) | 获取当前行指定数据类型的数据。参数为列名或列数（从 1 开始） |

开发中经常出现的场景：

```java
while (rs.next()) {
    rs.getType(argu);
}
```

为了便于操作数据，我们会针对表头专门设计一个类。每一行数据都以此类实例化，并存储到 `ArrayList` 等集合中。之后获取数据就形如：

```java
al[19].getSpecificItem();
```

## PreparedStatement 接口

**PreparedStatement** 接口继承自 **Statement** 接口，表示预编译 SQL 的对象，能够预防 SQL **注入**。

不法分子会通过修改事先定义好的 SQL 语句，以达到执行代码攻击服务器的目的。如：将要提交给服务器的用户输入数据写成 SQL 代码。假设场景，你正在制作一个登陆界面，通过判断用户输入的值是否存在来确定登陆状态：

```java
String sql = "select * from user where username = '" + username + "' and password = '" + password + "'";
```

若用户输入密码为 _1' or '1' = '1_，则直接改变了 SQL 语句的意义，导致一定登陆成功。

PreparedStatement 能够提前编译 SQL 语句，将敏感字符转义以保证安全。获取该对象需要调用 `(Connection)c.prepareStatement(sql)`，SQL 中的参数用半角问号代替。如下：

```sql
select * from user where username = ? and paswword = ?
```

设置这些参数使用 `setType(paraIndex, para)` 方法。执行采用 PreparedStatement 中重写的 `executeUpdate()` 或 `executeQuery()` 方法，不置放 SQL 参数。

此外，PreparedStatement 的性能还更高，因为它提前将 SQL 语句提交给数据库服务器来编译（想要获得额外的预编译需要配置 useServePrepStmts=true、更改 my.ini）。且一个 PreparedStatement 对象可以作为模板重复使用，对于某些使用场景非常高效。

## 数据库连接池

:::tip
在真实场景中，不可能每来一个用户请求，就新建一套连接，这太耗费性能了，因此使连接可复用是十分重要的。这也同样适用于后端设计中的线程管理。
:::

**数据库连接池**是一个“连接”的容器，负责分配、管理数据库连接。它允许应用程序**重复**使用一个现有的数据库连接，而不是重新建立一个。_释放空闲时长超过最大空闲时间连接，来避免因为没有释放连接而引起的连接**遗漏**（当所有的连接都分配殆尽，就无法再服务其他用户，等待时间较长可能导致用户离开）。_

其标准接口是 **DataSource**，使用其中的 `getConnection()` 方法来获取连接，这是一种可复用的、易于回收的连接，与 DriverManeger 给出的连接不同。比较流行的第三方实现类有 **DBCP**、**C3P0** 和 **Druid**。Druid 是目前最好的开源数据库连接池，下面的内容基于其编写。

要想使用 Druid，需要先导包，再[配置文件](https://blog.csdn.net/h273979586/article/details/87932220)。

- 加载配置：

```java
Properties p = new Properties();
p.load(new FileInputStream(/* 配置文件的路径 */));
```

- 创建池、获取连接：

```java
DataSource ds = DruidDataSourceFactory.createDataSource(p);
Connection c = ds.getConnection();
```

之后就可以按照熟悉的方法获取数据了。

:::details 提问：_.class_ 文件在哪里？（怎么写配置文件的相对路径？）

- System.getProperties("user.dir") 表示当前字节码文件路径
- 利用反射，获取当前类加载器，调用其 `getResourcesAsStream()` 方法，如：

  ```java
  DemoClass.class.getClassLoader().getResourceAsStream("user.properties");
  ```

  以获取包名根目录下的指定文件。

:::
