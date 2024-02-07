# 流式输入输出

为了与硬盘交互，我们需要学习 Java 中存取数据的类，即**流式 I/O 类**（`java.io`）。在这一章，大多数方法都需要处理异常，请务必注意这一点。

## File 类

`File` 是文件和目标路径名的**抽象表示**。

- 文件和目录是可以通过 File 封装成对象的。
- 对于 File 而言，其封装的并不是一个真正存在的文件，仅仅是一个路径名而已。**它可以是存在的，也可以是不存在的。** 将来是要通过具体的操作把这个路径的内容转换为具体存在的。

下面给出它的三个构造方法，还有一个与[网络通信](./network-io.md)有关，这里不予列出。

| 方法名                            | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| File(String pathname)             | 通过将给定的路径名字符串转换为抽象路径名来创建新的 File 实例 |
| File(String parent, String child) | 从**父路径名字符串**和**子路径名字符串**创建新的 File 实例   |
| File(File parent, String child)   | 从父抽象路径名和子路径名字符串创建新的 File 实例             |

接下来了解一下它的常用方法：

| 方法名                   | 说明                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| boolean createNewFile()  | 当具有该名称的文件不存在的时候，创建一个由该抽象路径名命名的新空文件 |
| boolean mkdir()          | 创建由此抽象路径名命名的目录                                         |
| boolean mkdirs()         | 创建由此抽象路径名命名的目录，包括任何必须但不存在的父目录           |
| boolean isDirectory()    | 测试此抽象路径名表示的 File 是否为目录                               |
| boolean isFile()         | 测试此抽象路径名表示的 File 是否为文件                               |
| boolean exists()         | 测试此抽象路径名表示的 File 是否存在                                 |
| String getAbsolutePath() | 返回此抽象路径名的绝对路径名字符串                                   |
| String getPath()         | 将此抽象路径名转换为路径名字符串                                     |
| String getName()         | 返回由此抽象路径名表示的文件或目录的名称                             |
| String[] list()          | 返回此抽象路径名表示的目录中的文件和目录的名称字符串数组             |
| File[] listFiles()       | 返回此抽象路径名表示的目录中的文件和目录的 File 对象数组             |
| boolean delete()         | 删除由此抽象路径表示的文件或目录，**若为目录，该目录是且应是空目录** |

使用这些方法需要知道**绝对路径**和**相对路径**的区别：

- 绝对路径：完整的路径名，不需要任何其他信息就可以定位它所表示的文件。例如：_C:/User/Penyo/Desktop/今日份收支.txt_
- 相对路径：必须使用取自其他路径名的信息进行解释。例如：_src/settings.txt_

一般情况下， `java.io` 包下的方法在用到 `File` 对象的时候，都会重写一个方法，允许开发者直接输入文件路径，方法承包了包装的过程。

### 案例：遍历目录与文件

我们经常能够看到脑瘫抖音“黑客”发一些弱智视频，内容无非就是开个终端，输入 `dir -r` 命令。现在我们用 Java 来复刻 `dir -r` 的效果。

```java
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

public class Dir {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Give the parent path where the ergodic begins.");
        lay(new File(sc.nextLine()));
    }

    public static void lay(File path) {
        // 安全保证
        if (path.listFiles() != null) {
            if (path.length() != 0) {
                System.out.println("\n\n    目录：" + path.getAbsolutePath() + "\n\n");

                // PrintStream 中的 printf() 让你找回 C 的感觉
                System.out.printf("%20s\t%15s %s\n", "LastWriteTime", "Length", "Name");
                System.out.printf("%20s\t%15s %s\n", "-------------", "------", "----");
            }
            for (File file : path.listFiles()) {
                System.out.printf("%20s\t%15d %s\n",
                        new SimpleDateFormat("yyyy/MM/dd     HH:mm").format(new Date(file.lastModified())),
                        file.length(), file.getName());
                if (file.isDirectory())
                    lay(file);
            }
        }
    }
}
```

## 流

**流**是个抽象的概念，是**对输入输出设备的抽象**，Java 程序中，对于数据的输入/输出操作都是以“流”的方式进行。设备可以是文件，网络，内存等。

流具有方向性，至于是输入流还是输出流则是一个相对的概念，一般以程序为参考，如果数据的流向是程序至设备，我们成为输出流，反之我们称为输入流。

可以将流想象成一个“水流管道”，水流就在这管道中形成了，自然就出现了方向的概念。

当程序需要从某个数据源读入数据的时候，就会开启一个输入流，数据源可以是文件、内存或网络等等。相反地，需要写出数据到某个数据源目的地的时候，也会开启一个输出流，这个数据源目的地也可以是文件、内存或网络等等。

可以从不同的角度对流进行分类：

1. 处理的数据单位不同，可分为：字符流，字节流。
2. 数据流方向不同，可分为：输入流，输出流。
3. 功能不同，可分为：节点流，处理流。

Java 所有的流类位于 `java.io` 包中，都分别继承字以下四种抽象流类型。

|        | 字节流       | 字符流 |
| ------ | ------------ | ------ |
| 输入流 | InputStream  | Reader |
| 输出流 | OutputStream | Writer |

## OutputStream 类与 InputStream 类

**抽象类** `OutputStream` 是所有表示字节输出流的类的超类。如果要向一个文件写入内容，则使用其子类 `FileOutputStream` （文件字节输出流）。

根据需要，我们一般从该类提供的三个方法中选择一个使用：

| 方法名                                 | 说明                                     |
| -------------------------------------- | ---------------------------------------- |
| void write(int b)                      | 将指定的**单个字节**写入此文件输出流     |
| void write(byte[] b)                   | 将指定的**字节数组**写入此文件输出流     |
| void write(byte[] b, int off, int len) | 将指定的**字节数组部分**写入此文件输出流 |

如果我们要写入一个字符串，则需要调用 `String` 下的方法 `getByte()` 。

```java
import java.io.FileOutputStream;
import java.io.IOException;

public class Demo {
    public static void main(String[] args) {
        // false 表示覆盖，true 表示追加；不填写默认为 false
        try (FileOutputStream fos = new FileOutputStream("Text.txt", false)) {
            // String 转 byte[] 的便捷方式
            fos.write("捏麻麻地".getBytes());

            // 早期 Windows 系统认为换行是 \r\n，而不是单纯的 \n
            fos.write("\r\n".getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 判断 fos 是否为空指针（仅在声明和初始化分离的时候有意义）
            if (fos != null)
                try {
                    // 用完流关闭是一种美德
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
    }
}
```

`finally` 后的代码是无论是否发生异常都会执行的。为了节省系统资源，我们希望 `close()` 方法一定执行（如果有必要）。

**抽象类** `InputStream` 是所有表示字节输入流的类的超类。如果要从一个文件读取内容，则使用其子类 `FileInputStream` （文件字节输入流）。

根据需要，我们一般从该类提供的三个方法中选择一个使用：

| 方法名                                | 说明                                                           |
| ------------------------------------- | -------------------------------------------------------------- |
| void read(int b)                      | 从此文件输入流读取**单个字节**，**读到末尾则返回-1**           |
| void read(byte[] b)                   | 从此文件输入流读取最多 b.length 个字节到**字节数组**           |
| void read(byte[] b, int off, int len) | 从此文件输入流读取最多 b.length 个字节到指定的**字节数组部分** |

```java
import java.io.FileInputStream;
import java.io.IOException;

public class Demo {
    public static void main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream("Test.txt");

        // 一个字节一个字节读取
        int b;
        ArrayList<char> ab = new ArrayList<>();
        while ((b = fis.read()) != -1) {
            // 存储读到的字节
            ab.add(b);
        }

        // 一口气读完（InputStream 类中的方法）
        byte[] ba = new FileInputStream("Test.txt").readAllBytes();
    }
}
```

### 案例：复制文件

从一文本文件（_Doc.txt_）中读取全部数据，并将其写入另一个空的文本文件（_NewDoc.txt_）中。整个过程在效果上与“复制”相同。

要操作的文本：

```txt
Package java.io provides for system input and output through data streams, serialization and the file system. Unless otherwise noted, passing a null argument to a constructor or method in any class or interface in this package will cause a NullPointerException to be thrown.
```

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Copy {
    public static void main(String[] args) throws IOException {
        FileInputStream fis = new FileInputStream("Doc.txt");
        FileOutputStream fos = new FileOutputStream("NewDoc.txt");

        fos.write(fis.readAllBytes());

        // 当然你也可以每读一个字节就写一个字节
        /*
            int b;
            while ((b = fis.read()) != -1) {
                fos.write(b);
            }
         */
        // 或者每次读取多个字节
        /*
            byte[] ba = new byte[16];
            int len;
            while ((len = fis.read(ba)) != -1) {
                fos.write(ba, 0, len);
            }
         */

        fis.close();
        fos.close();
    }
}
```

在实际应用中，我们复制的内容可能不仅仅有文本，还有图片、视频、人不能直接辨识的数据库等，字节流对它们来说都是通用的。而之后要学的字符流，则是专门为了处理文本而生。

## BufferedOutputStream 类与 BufferedInputStream 类

它们分别实现了**缓冲字节输出流**和**缓冲字节输入流**，避免了在写/读大量数据的时候频繁调用底层（每操作一次就要调用一次），而是**创建缓冲区**（这也是其唯一的意义，默认为 8 KB 大），一次性操作大量的字节，提升了 IO 效率。**本质上就是每次操作多个字节的官方包装。**

它们的构造器分别需求一个 `OutputStream` 对象和一个 `InputStream` 对象。

在处理较大文件时，我们设计实验分别统计已学的几种方法的耗时，结果如下：

| 操作主要参数                | 耗时     |
| --------------------------- | -------- |
| 无缓冲，每次1字节           | 564252ms |
| 无缓冲，每次512字节         | 911ms    |
| 无缓冲，每次8192字节        | 103ms    |
| 无缓冲，一次读完            | 142ms    |
| 有缓冲（8KB），每次1字节    | 2529ms   |
| 有缓冲（8KB），每次512字节  | 132ms    |
| 有缓冲（8KB），每次8192字节 | 105ms    |
| 有缓冲（8KB），一次读完     | 185ms    |

实验代码：

```java
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

public class Experiment {
    // 原文件为 72.9 MB (76,513,280 字节)
    static File toBeCopied = new File("Test.iso"), copy = new File("NewTest.iso");

    public static void main(String[] args) throws Exception {
        long begin;
        int[] byteNum = {1, 512, 8192, 0};
        for (int bn : byteNum) {
            begin = System.currentTimeMillis();
            noBuffer(bn);
            System.out.println((System.currentTimeMillis() - begin) + "ms");
        }
        for (int bn : byteNum) {
            begin = System.currentTimeMillis();
            hasBuffer(bn);
            System.out.println((System.currentTimeMillis() - begin) + "ms");
        }
    }

    public static void noBuffer(int byteNum) throws Exception {
        FileInputStream fis = new FileInputStream(toBeCopied);
        FileOutputStream fos = new FileOutputStream(copy);

        if (byteNum == 1) {
            int b;
            while ((b = fis.read()) != -1) {
                fos.write(b);
            }
        } else if (byteNum == 0) {
            fos.write(fis.readAllBytes());
        } else {
            byte[] ba = new byte[byteNum];
            int len;
            while ((len = fis.read(ba)) != -1) {
                fos.write(ba, 0, len);
            }
        }

        fis.close();
        fos.close();
    }

    public static void hasBuffer(int byteNum) throws Exception {
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(toBeCopied));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(copy));

        if (byteNum == 1) {
            int b;
            while ((b = bis.read()) != -1) {
                bos.write(b);
            }
        } else if (byteNum == 0) {
            bos.write(bis.readAllBytes());
        } else {
            byte[] ba = new byte[byteNum];
            int len;
            while ((len = bis.read(ba)) != -1) {
                bos.write(ba, 0, len);
            }
        }

        bis.close();
        bos.close();
    }
}
```

## 字符流与字符编码

为了更好地处理文本读写，我们需要学习字符流。一个经典的应用场景就是，我们要控制输出的文本为 GBK（ANSI）编码或 UTF-8（Unicode）编码，不同的编码在字节数组上肯定是不一样的。Java 程序内部默认使用 UTF-8 编码，但 Windows 平台却是使用 GBK 编码（仅限中国大陆）。如果我们想要统一，就要手动指定字符集。

字符流是字节流和**编码表**（自然语言字符到二进制数的唯一映射）的集合。

先来认识一些常见的中国大陆编码表：

- GB2312：简体中文码表。一个小于 127 的字符的意义与原来相同，但两个大于 127 的字符连在一起时，就表示一个汉字，这样大约可以组合了包含 7000 多个简体汉字。此外数学符号、罗马希腊的字母、暗的假名等都编进去了，连在 ASCII 里本来就有的数字、标点、字母都统统重新编了两个字节长的编码，这就是常说的“全角”字符，而原来在 127 号以下的那些就叫“半角”字符了。
- GBK：**最常用的中文码表。** 是在 GB2312 标准基础上的扩展规范，使用了双字节编码方案，共收录了 21003 个汉字，完全兼容 GB2312 标准，同时支持繁体汉字以及日韩汉字等。
- GB18030：最新的中文码表。收录汉字 70244 个，采用多字节编码，每个字可以由 1 个、2 个或 4 个字节组成。支持中国国内少数民族的文字，同时支持繁体汉字以及日韩汉字等。

以及 Unicode 的一些知识：

- 它是为表达任意语言的任意字符而设计的，是业界的一种标准，也称为统一码、标准万国码。它最多使用 4 个字节的数字来表达每个字母、符号，或者文字。有三种编码方案，UTF-8、UTF-16 和 UTF-32。最为常用的为 UTF-8 编码。
- UTF-8 编码：可以用来表示 Unicode 标准中任意字符，它是电子邮件、网页及其他存储或传送文字的应用中优先采用的编码。互联网工程工作小组（IETF）要求所有互联网协议都必须支持 UTF-8 编码。它使用一至四个字节为每个字符编码。
  编码规则:
  - 128 个 ASCII 字符只需一个字节编码。
  - 拉丁文等字符需要两个字节编码。
  - 大部分常用字（含中文）使用三个字节编码。
  - 其他极少使用的辅助字符使用四个字节编码。

涉及编码的常用方法：

| 方法名                              | 说明                                                                         |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| byte[] getBytes()                   | 使用平台的默认字符集将该 String 编码为一系列字节，将结果存储到新的字节数组中 |
| byte[] getBytes(String charsetName) | 使用指定的字符集将该 String 编码为一系列字节，将结果存储到新的字节数组中     |

涉及解码的常用方法：

| 方法名                                   | 说明                                                        |
| ---------------------------------------- | ----------------------------------------------------------- |
| String(byte[] bytes)                     | 通过使用平台的默认字符集解码指定的字节数组来构造新的 String |
| String(byte[] bytes, String charsetName) | 通过指定的字符集解码指定的字节数组来构造新的 String         |

## OutputStreamWriter 类与 InputStreamReader 类

在**字符流**中若要**指定字符集**，则使用 `OutputStreamWriter` 类或 `InputStreamReader` 类。它们的部分构造器如下列：

| 方法名                                                   | 说明                                          |
| -------------------------------------------------------- | --------------------------------------------- |
| OutputStreamWriter(OutputStream out)                     | 创建一个使用默认字符编码的 OutputStreamWriter |
| OutputStreamWriter(OutputStream out, String charsetName) | 创建一个使用指定字符集的 OutputStreamWriter   |
| InputStreamReader(InputStream in)                        | 创建一个使用默认字符集的 InputStreamReader    |
| InputStreamReader(InputStream in, String charsetName)    | 创建一个使用指定字符集的 InputStreamReader    |

字符流**写**数据的五种方法：

| 方法名                                    | 说明                 |
| ----------------------------------------- | -------------------- |
| void write(int c)                         | 写一个字符           |
| void write(char[] cbuf)                   | 写入一个字符数组     |
| void write(char[] cbuf, int off, int len) | 写入字符数组的一部分 |
| void write(String str)                    | 写一个字符串         |
| void write(String str, int off, int len)  | 写一个字符串的一部分 |

相比较于字节流，字符流自带缓冲区，因此要想顺利写入数据，我们需要使用 `flush()` 方法**刷新**流（释放缓存）。如果流使用完毕，则使用 `close()` **刷新并关闭**流。

字符流**读**数据的两种方法：

| 方法名                | 说明                   |
| --------------------- | ---------------------- |
| int read()            | 一次读一个字节         |
| int read(char[] cbuf) | 一次读一个字符数组数据 |

## FileWriter 类与 FileReader 类

~~当读写数据不需要在意字符编码和缓冲区时（全部应用UTF-8），~~ 为了简化程序，我们可以使用 `FileWriter` 类和 `FileReader` 类，它们分别是 `OutputStreamWriter` 类和 `InputStreamReader` 类的**直接子类**。

它们的构造器假定默认字符编码和默认字节缓冲区大小是适当的，参数方面最少接收一个路径名字符串或 `File` 对象（若写，则还可以指定是否要“追加写入”）。

这两类中没有自己独特的方法。

## BufferedWriter 类与 BufferedReader 类

此两类可指定字符流的大小，或使用默认缓冲区（`char[8192]`）大小。

这里特别介绍两个它们独有的方法：

| 方法名            | 说明                                                       |
| ----------------- | ---------------------------------------------------------- |
| void newLine()    | 写一个行分隔符，具体内容由系统属性定义                     |
| String readLine() | 读一行文字，结果**不包含行分隔符**，若已读到末尾则返回null |

因此，我们连续读取又多了一个方式：

```java
BufferedReader br = new BufferedReader(new FileReader("Test.txt"));
String line;
while ((line = br.readLine()) != null) {
    System.out.println(line);
}
```

若需要精确地写入，使用 `BufferedWriter` 类，否则可以使用 `PrintWriter` 类。

### 案例：复制多级文件夹

难点在于要对未知层深的文件夹和文件分别处理，以及“标准地”解决问题。

```java
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Copy {
    public static void main(String[] args) {
        // 创建数据源 File 对象
        File srcFile = new File("X:\\");

        // 创建目的地 File 对象
        File destFile = new File("Y:\\");

        // 写方法实现文件夹的复制，参数为数据源 File 对象和目的地 File 对象
        copyFolder(srcFile, destFile);
    }

    private static void copyFolder(File srcFile, File destFile) {
        // 判断数据源 File 是否是目录
        if (srcFile.isDirectory()) {
            // 在目的地下创建和数据源 File 名称一样的目录
            String srcFileName = srcFile.getName();
            File newFolder = new File(destFile, srcFileName);

            // 若文件夹不存在则创建
            if (!newFolder.exists())
                newFolder.mkdir();

            // 获取数据源 File 下所有文件或者目录的 File 数组
            File[] fileArray = srcFile.listFiles();

            // 遍历该 File 数组，得到每一个 File 对象
            for (File file : fileArray) {
                // 把该 File 作为数据源 File 对象，递归调用复制文件夹的方法
                copyFolder(file, newFolder);
            }
        } else {
            // 说明是文件，直接复制，用字节流
            File newFile = new File(destFile, srcFile.getName());
            copyFile(srcFile, newFile);
        }
    }

    // 字节缓冲流复制文件
    private static void copyFile(File srcFile, File destFile) {
        BufferedInputStream bis = null; // 麻烦，但是标准
        BufferedOutputStream bos = null;
        try {
            bis = new BufferedInputStream(new FileInputStream(srcFile));
            bos = new BufferedOutputStream(new FileOutputStream(destFile));

            byte[] bys = new byte[1024];
            int len;
            while ((len = bis.read(bys)) != -1) {
                bos.write(bys, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                bos.close();
                bis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 精选案例：本地课程表载入

> 该 case 基于 Penyo 的项目 [Cyainidation](https://github.com/penyoofficial/Cyanidation) 编写。

本地课程表文件：

```txt
下北泽大学 软件工程专业（2021级 2班）2021-2022 学年 第二学期@2022-02-21
$大学物理A@我修院
1, 1 - 03, 14@36-201
3, 4 - 03, 14@36-201
5, 3 - 03, 14@36-201
$大学物理实验@淳平
2, 1 - 15, 18@37-612
2, 2 - 15, 18@37-612
$工程应用数学B@田所浩二
1, 2 - 03, 17@36-2JT
3, 2 - 03, 17@36-2JT
4, 2 - 03, 17@36-2JT
$大学英语II@便乘光
1, 3 - 01, 13@35-508
2, 2 - 01, 09@35-508
5, 2 - 01, 13@35-508
```

_com.penyo.cyanidation.ClassInfo_ 类

```java
package com.penyo.cyanidation;

import java.util.ArrayList;

/**
 * 该类用于抽象不同名称、授课教师的课程。
 *
 * @author Penyo
 */
public class ClassInfo {
    /** 课程概要，包含课程名称和授课教师姓名。 */
    public String[] gist;

    /** 课程因时间而多态化的信息。 */
    public ArrayList<TimeMoph> timeMophPack = new ArrayList<>();

    /**
     * 该类用于进一步抽象不同时间的同一课程。
     *
     * @author Penyo
     */
    public class TimeMoph {
        /** 与课程相关的时间信息。 */
        int weekBegin, weekEnd, dayOfWeek, phaseOfDay;

        /** 对课程在单一时间段下的注释。 */
        String spInfo;

        /**
         * 该构造器用于接收课程信息碎片来对其抽象实例化。
         *
         * @param infoCut 课程信息碎片。
         */
        public TimeMoph(String infoCut) {
            String[] info = infoCut.split("@");
            dayOfWeek = info[0].charAt(0) - '0';
            phaseOfDay = info[0].charAt(3) - '0';
            weekBegin = Integer.parseInt(info[0].substring(7, 9));
            weekEnd = Integer.parseInt(info[0].substring(11, 13));
            try {
                spInfo = info[1];
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 该构造器用于接收课程信息来对其抽象实例化。
     *
     * @param entireInfo 课程信息。
     */
    public ClassInfo(String entireInfo) {
        String[] infoCut = entireInfo.split("\n");
        gist = infoCut[0].split("@");
        for (int i = 1; i < infoCut.length; i++)
            timeMophPack.add(new TimeMoph(infoCut[i]));
    }
}
```

_com.penyo.cyanidation.Core_ 类

```java
package com.penyo.cyanidation;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * 该类用于处理明文和密文之间的转换。
 *
 * @author Penyo
 */
public class Core {
    /** 课程表文件默认路径。 */
    public File defaultPath = new File("com\\penyo\\cyanidation\\cs.txt");

    /** 整个课程表的概要，包含标题和开学日期。 */
    public String[] csGist = new String[2];

    /** 周数偏移 */
    public int weekSkewing = 0;

    /** 周数上限 */
    public int weekLimit = 20;

    /** 课程表数据缓存。 */
    private ArrayList<ClassInfo> cs = new ArrayList<>();

    /** 来自程序本身的操作。 */
    private boolean fromCore = false;

    /**
     * 该方法用于读取本地课程表文件。
     *
     * @param ioCS 字节流化的课程表文件。
     * @return 课程表数据。
     */
    public String[] parse(FileInputStream ioCS) {
        try {
            byte[] parsedCS_I = new byte[ioCS.available()];
            ioCS.read(parsedCS_I);
            String[] parsedCS_II = new String(parsedCS_I).split("\\$");
            csGist = parsedCS_II[0].split("@");

            if (fromCore) {
                fromCore = false;
                return new String[35];
            }

            cs = new ArrayList<>();
            for (int i = 1; i < parsedCS_II.length; i++)
                cs.add(new ClassInfo(parsedCS_II[i]));
            String[] result = new String[35];
            int i = getWeek() + weekSkewing;
            for (ClassInfo thisCS : cs)
                for (ClassInfo.TimeMoph tm : thisCS.timeMophPack)
                    if (tm.weekBegin <= i && tm.weekEnd >= i)
                        result[(tm.phaseOfDay - 1) * 7 + (tm.dayOfWeek - 1)] = "" + thisCS.gist[0] + " / " + tm.spInfo
                                + "\n" + thisCS.gist[1];
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new String[35];
    }

    /**
     * 该方法用于保存课程表文件。
     *
     * @param path    文件路径。
     * @param contain 课程表的内容。
     */
    public void save(String path, String contain) {
        // JDK 7 后，以这种方式定义流对象可以在使用完后自动释放资源，并消灭异常
        try (FileOutputStream f = new FileOutputStream(path);) {
            f.write(contain.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        /*
            // JDK 9 后，一种新的处理异常的办法产生了，它也能自动释放用完的资源
            FileOutputStream f = new FileOutputStream(path);
            try (f) {
                f.write(contain.getBytes());
            } catch (Exception e) {
                e.printStackTrace();
            }
            // 但仍然会产生异常......
            // 只能在需要释放资源但仍需要进一步处理异常时才能用到
         */
    }
}
```

## 标准输入输出流

如果我们想要与硬件设备交互，则必须使用标准流。 `System` 类中有两个成员变量，_in_ 和 _out_，它们分别是 `InputStream` 的对象和 `PrintStream` 的对象。

API 文档里是这样描述它们的：

| in                                                                                                                                                                                                                                                                                                                                                                       | out                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The "standard" input stream. This stream is already open and ready to supply input data. Typically this stream corresponds to keyboard input or another input source specified by the host environment or user. In case this stream is wrapped in a **InputStreamReader**, **Console.charset()** should be used for the charset, or consider using **Console.reader()**. | The "standard" output stream. This stream is already open and ready to accept output data. Typically this stream corresponds to display output or another output destination specified by the host environment or user. The encoding used in the conversion from characters to bytes is equivalent to **Console.charset()** if the **Console** exists, **Charset.defaultCharset()** otherwise.<br><br>For simple stand-alone Java applications, a typical way to write a line of output data is:<br><br>&emsp;_System.out.println(data)_<br><br>See the methods **println** in class **PrintStream**. |

该演示实现了输出键入的字符的效果：

```java
import java.io.IOException;
import java.io.InputStreamReader;

public class Demo {
    public static void main(String[] args) throws IOException {
        // InputStream 识别中文字符不方便，我们把它转换成 InputStreamReader
        InputStreamReader isr = new InputStreamReader(System.in);

        int b;
        while ((b = isr.read()) != -1) {
            System.out.println((char) b);
        }
        // 如果需要一次读取一行，则用 BufferedReader 包装
        // 如果需要读取数值，则用 Integer.parseInt() 方法转换
    }
}
```

以上就是 [Scanner](./101.md#输入) 类的底层原理。

而 _System.out_ 则是专职向控制台输出信息的对象。

`PrintStream` 也可以向文件写入数据，用父类的 `write()` 方法或自己独有的 `print()` 和 `println()` 方法。

## ObjectOutputStream 类和 ObjectInputStream 类

**对象序列化**就是将对象保存到磁盘中，或者在网络中传输对象，需要用到 `ObjectOutputStream` 类。

这种机制就是使用一个字节序列表示一个对象，该字节序列包含：对象的类型、对象的数据和对象中存储的属性等信息。字节序列写到文件之后，相当于文件中持久保存了一个对象的信息。

反之，读取并重构对象则称为**对象反序列化**，需要用到 `ObjectInputStream` 类。

`ObjectOutputStream` 类的构造器需求一个 `OutputStream` 对象作为参数， `ObjectInputStream` 类同理。

读写对象所用到的方法：

| 方法名                       | 说明                                |
| ---------------------------- | ----------------------------------- |
| void writeObject(Object obj) | 将指定的对象写入 ObjectOutputStream |
| Object readObject()          | 从 ObjectInputStream 读取一个对象   |

序列化相关的类**必须**实现 `Serializable` （自动）或 `Externalizable` （手动）接口，尽管前者不包含任何方法，只是作为一种标记存在。

为了保证数据安全，Java 会给序列化的对象赋予一个**序列化版本码**（_serialVersionUID_），只要数据（内容、路径、类定义......）发生了改变，序列化版本码就会变化。一旦在反序列化时发现不匹配，就会拒绝载入。如果我们并不计较细微的改动，可以在类定义中显式指定序列化版本码的值，它是**静态、最终和长整型的**，此外，最好还是**私有的**。

对于不想被序列化的成员（在对象里的值），可用 `transient` 或 `static` 修饰。

如果我们希望序列化后的数据是人易读的，则可以使用 `Properties` 类（实现了 `Map` 接口）。

### 精选案例：通讯录

> 该 case 基于 Penyo 的项目 [Contacts](https://github.com/penyoofficial/Contacts) 编写。

_pers.penyo.contacts.People_ 类

```java
package pers.penyo.contacts;

import pers.penyo.Contacts.Items.Email;
import pers.penyo.Contacts.Items.Person;
import pers.penyo.Contacts.Items.Tel;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.text.Collator;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Locale;
import java.util.TreeSet;

/**
 * {@code People} 是 {@link Person} 类的集合（本质是按照姓名顺序排序的 {@link TreeSet}
 *）表达，并集成了一些操作方法。该类在初始化时，会自动调用 {@link #initialize()} 方法以尝试读取本地的通讯录文件。
 *
 * <p>
 * 我们已按照程序的实际需要重写了 {@link Collection} 接口的部分方法，你可以直接调用它们。
 *
 * @author Penyo
 * @see Person
 */
public class People {
    /**
     * 通讯录数据文件在本地的位置。
     */
    private File contacts = new File("pers/penyo/contacts/Contacts.oos");

    /**
     * {@link Person} 类的集合（本质是按照姓名顺序排序的 {@link TreeSet}）。
     */
    private TreeSet<Person> people = new TreeSet<>((p1, p2) -> {
        return Collator.getInstance(Locale.CHINA).compare(p1.getName(), p2.getName());
    });

    /**
     * 该构造器用于在本地生成通讯录数据文件（如果不存在），并调用 {@link #initialize()} 方法。
     */
    public People() {
        try {
            contacts.createNewFile();
        } catch (Exception e) {
            e.printStackTrace();
        }
        initialize();
    }

    /**
     * 该方法用于从本地读取 {@code Contacts.oos} 文件，并载入到集合中。
     * 如果本地文件不可用，则集合默认为空。
     *
     * @see #save()
     */
    @SuppressWarnings("unchecked")
    private void initialize() {
        try (ObjectInputStream contacts = new ObjectInputStream(new FileInputStream(this.contacts))) {
            people.addAll((ArrayList<Person>) contacts.readObject());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 该方法用于从集合中读取数据，并向本地写入 {@code Contacts.oos} 文件。
     *
     * @see #initialize()
     */
    private void save() {
        try (ObjectOutputStream contacts = new ObjectOutputStream(new FileOutputStream(this.contacts))) {
            contacts.writeObject(new ArrayList<>(people));
        } catch (Exception e) {
            e.printStackTrace();
        }
        initialize();
    }

    /**
     * 该方法用于向集合添加元素。
     *
     * @param p {@link Person} 的对象。
     */
    public People add(Person p) {
        if (p.getTel().size() > 0 || p.getEmail().size() > 0)
            people.add(p);
        save();
        return this;
    }

    /**
     * 该方法用于移除集合中的元素。与 {@link Collection} 中的 {@code remove()}
     * 方法不同，该方法只需要接受姓名就可以移除集合中对应的元素。
     *
     * @param name 姓名。
     * @return 移除的结果。
     */
    public People remove(String name) {
        for (Person p : people)
            if (p.getName().equals(name)){
                people.remove(p);
                break;
            }
        save();
        return this;
    }

    /**
     * 该方法用于返回集合的尺寸。
     *
     * @return 集合的尺寸。
     */
    public int size() {
        return people.size();
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        int target = 0;
        for (Person p : people) {
            str.append(p.getName() + "\n");

            target = 0;
            for (Tel t : p.getTel()) {
                str.append(t + "\t");
                target++;
            }
            if (target != 0)
                str.append("\n");

            target = 0;
            for (Email e : p.getEmail()) {
                str.append(e + "\t");
                target++;
            }
            if (target != 0)
                str.append("\n");

            str.append("\n");
        }
        return str.toString();
    }
}
```

对联系人的抽象表达，此处受限于篇幅，不予展示。
