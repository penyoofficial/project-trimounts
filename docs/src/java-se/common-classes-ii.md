# 常用类 II

## Object 类

类 `Object` 是类层次结构的**根**。每个类都有 `Object` 作为超类。所有对象（包括数组）都直接或间接地实现了这个类的方法。

类 `Object` 只有一个构造方法，并且是无参的。这也回应了为什么子类的构造方法默认访问的是父类的无参构造方法——其顶级父类只有无参构造方法。

所以上一节**接口**中留下的问题现在可以解决了。接口的实现类在没有指定父类的情况下，其父类就是 `Object` 类，定义实现的代码上的完全形式应该是：

```java
public class YourLunch extends Object implements HaveLunch {}
```

这也强调了，**接口并不是类的特殊情况**。

接下来我们重点了解其中的两个方法。第一个是 `toString()` 。在输出 `对象.toString()` 时，IDE 会返回 `类的包名@地址值` ，这一般不是我们想要的结果。所以我们应当在类中重写该方法。

```java
public class Demo {
    public static void main(String[] args) {
        OldVocaloid oldMiku = new OldVocaloid();
        Vocaloid miku = new Vocaloid();

        // 直接“输出对象”
        System.out.println(oldMiku);
        System.out.println(miku);
    }
}

class OldVocaloid {
}

class Vocaloid {
    // 重写了 toString() 方法
    public String toString() {
        return "啦啦啦啦啦";
    }
}
```

输出：

```txt
OldVocaloid@1f32e575
啦啦啦啦啦
```

第二个是 `equals(Object obj)` 。在输出 `对象1.toString(对象2)` 时，IDE 会比较两者的地址值，但我们更希望它能比较两者的内容。所以我们应当在类中重写该方法。

```java
public class Demo {
    public static void main(String[] args) {
        Vocaloid miku = new Vocaloid("miku", "female");
        Vocaloid miku2 = new Vocaloid("miku", "female");
        Vocaloid len = new Vocaloid("len", "male");

        System.out.println(miku.equals(miku2));
        System.out.println(miku.equals(len));
    }
}

class Vocaloid {
    // 涉及对比的特征
    private String name, gender;

    public Vocaloid(String name, String gender) {
        this.name = name;
        this.gender = gender;
    }

    // 对象1.equals(对象2)
    public boolean equals(Object obj) {
        // this 代表“对象 1”。如果两者地址相同，则一定真
        if (this == obj)
            return true;

        // 判断“对象 2”是否为空，空则假；比较两者类的字节码，不同则假
        if (obj == null || getClass() != obj.getClass())
            return false;

        // 向下转型（把 obj（“对象2”）转为与“对象 1”相同的类型）
        Vocaloid v = (Vocaloid) obj;

        // 比较 name
        if (name != v.name)
            return false;

        // 比较 gender（gender 只要不为空，就返回 gender 是否相同的 boolean 值）
        return gender != null ? gender.equals(v.gender) : v.gender == null;
    }
}
```

输出：

```txt
true
false
```

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html>

## 内部类

即在类中定义一个类。如下：

```java
public class Demo {
    public class DemoInner {
    }
}
```

内部类可以直接访问外部类所有的成员，包括私有。而外部类要想访问内部类的成员，必须要先新建对象。

下面演示外界创建指定内部类对象的方法：

```java
public class Demo {
    public static void main(String[] args) {
        // 创建 Inner 对象的格式
        Outer.Inner oi = new Outer().new Inner();
        oi.printNum();

        // 间接调用 Inner2 对象
        Outer o2 = new Outer();
        o2.visitInner2();

        // 间接调用 Inner3 对象
        Outer o3 = new Outer();
        o3.Inner3Taker();
    }
}

class Outer {
    private int num = 114514;

    // 一个成员内部类，但这里不安全
    public class Inner {
        public void printNum() {
            System.out.println(num);
        }
    }

    // 于是我们弄个安全的（私有化类）
    private class Inner2 {
        public void printNum() {
            System.out.println(num);
        }
    }

    // 不过要借助内鬼方法
    public void visitInner2() {
        Inner2 i2 = new Inner2();
        i2.printNum();
    }

    public void Inner3Taker() {
        // 一个局部内部类
        class Inner3 {
            public void printNum() {
                System.out.println(num);
            }
        }

        // 设置内鬼
        Inner3 i3 = new Inner3();
        i3.printNum();
    }
}
```

输出：

```txt
114514
114514
114514
```

由此可见，内部类存在的意义是保护行为。

接下来，我们来介绍一下**匿名内部类**，它的本质是一个继承/实现了所在类/接口的子类匿名对象。

```java
new Inner() {
    @Override
    public void function() {
    }
// 注意下面还有一个分号
};
```

应用演示：

```java
public class Demo {
    public static void main(String[] args) {
        new WildFather() {
            public void eChou() {
                System.out.println(114514);
            }
        // 调用要紧接着进行
        }.eChou();

        // 那要想多次调用，怎么更省事呢
        WildFather n = new WildFather() {
            public void eChou() {
                System.out.println(114514);
            }
        // 注意，下面原有的方法没了
        };
        n.eChou();
        n.eChou();
        n.eChou();
    }
}

class WildFather {
}
```

在实际中，匿名内部类常用于取代一些调用次数少（比如一次）的独立类。

```java
public class Demo {
    public static void main(String[] args) {
        Animal a = new Animal();
        a.bark(new Action() {
            // 这里的重写指向接口中的方法
            @Override
            public void bark() {
                System.out.println("汪汪汪汪汪！");
            }
        });
    }
}

interface Action {
    void bark();
}

class Animal {
    public void bark(Action ac) {
        ac.bark();
    }
}
```

## Math 类

`Math` 类包含执行基本数字运算的方法。 `Math` 类**没有构造方法**，即无法创建对象来调用方法。但由于其中的方法都是**静态的**，你可以直接用类名调用。

接下来列出常用的一些方法。

| 方法名                                | 说明                                               |
| ------------------------------------- | -------------------------------------------------- |
| static int abs(int a)                 | 返回参数的绝对值                                   |
| static double **ceil**(double a)      | 返回**大于等于**参数的最小 double 值，等于一个整数 |
| static double **floor**(double a)     | 返回**小于等于**参数的最小 double 值，等于一个整数 |
| static int round(**float** a)         | 返回参数**四舍五入**后的 int 值                    |
| static int max(int a, int b)          | 返回两个 int 值中的较大值                          |
| static int min(int a, int b)          | 返回两个 int 值中的较小值                          |
| static double pow(double a, double b) | 返回 a 的 b 次幂                                   |
| static double random()                | 返回 \[0.0, 1.0\) 中的随机 double 值               |

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Math.html>

## System类

`System` 类包含系统级的很多属性和控制方法。该类的构造方法是 `private` 的（且该类是 `final` 的），所以无法创建该类的对象。但由于其内部的成员变量和成员方法都是 `static` 的，所以也可以很方便的进行调用。

下面列出常用方法：

| 方法名                          | 说明                                         |
| ------------------------------- | -------------------------------------------- |
| static void exit(int status)    | 终止当前运行的 JVM，非 0 表示异常终止        |
| static long currentTimeMillis() | 返回当前时间（从 1970 年到现在所经过的毫秒） |

`currentTimeMillis()` 方法常用来计算执行代码所消耗的时间。

```java
long startPoint = System.currentTimeMillis();
for (int i = 0; i < 10000; i++) {
    System.out.println(i);
}
long endPoint = System.currentTimeMillis();
System.out.println("共消耗" + (endPoint - startPoint) + "毫秒");
```

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/System.html>

## Arrays 类

`Arrays` 类包含用于操作数组的各种方法，需要导包 `java.util.Arrays` 。和前面介绍的几个类一样，该类的方法也全都是静态的。 `Arrays` 类的构造方法是**私有的**，即无法实例化。

下面列出常用的两个方法：

| 方法名                          | 说明                                 |
| ------------------------------- | ------------------------------------ |
| static String toString(int[] a) | 返回指定数组的内容的字符串的表达形式 |
| static void sort(int[] a)       | 按照数字顺序排列指定的数组           |

```java
import java.util.Arrays;

public class Demo {
    public static void main(String[] args) {
        int arr[] = { 9, 8, 7, 6, 5 };
        System.out.println("排序前：" + Arrays.toString(arr));
        Arrays.sort(arr);
        System.out.println("排序后：" + Arrays.toString(arr));
    }
}
```

输出：

```txt
排序前：[9, 8, 7, 6, 5]
排序后：[5, 6, 7, 8, 9]
```

这也为我们设计工具类提供了思路：构造方法是 `private` 的，成员方法是 `public static` 的。

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html>

## 基本数据类型的包装类

将基本数据类型封装到对象的好处在于可以在对象中定义更多的方法操作该数据。比如转换数值和字符串。

| 基本数据类型 | 包装类            |
| ------------ | ----------------- |
| byte         | **B**yte          |
| short        | **S**hort         |
| int          | **I**nt**eger**   |
| long         | **L**ong          |
| float        | **F**loat         |
| double       | **D**ouble        |
| char         | **C**har**acter** |
| boolean      | **B**oolean       |

这里重点解析 `Integer` 类。

| 方法名                           | 说明                                           |
| -------------------------------- | ---------------------------------------------- |
| Integer(int value)               | 根据 int 值创建 Integer 对象 **（已过时）**    |
| Integer(String s)                | 根据 String 值创建 Integer 对象 **（已过时）** |
| static Integer valueOf(int i)    | 返回指定 int 值的 Integer 实例                 |
| static Integer valueOf(String s) | 返回指定 String 对象的 Integer 实例            |

演示：

```java
public class Demo {
    public static void main(String[] args) {
        Integer a = Integer.valueOf(114514);

        // 温馨的建议你不要往字符串里加非数字字符
        Integer b = Integer.valueOf("114514");
        System.out.println(a);
        System.out.println(b);

        // 但是其实可以自动“装箱”、“拆箱”
        Integer c = 1918;
        c += 1;
        System.out.println(c);

        /*
         * 在使用包装类类型时，如果做操作，最好先判断是否为 null
         * 练习时可以为了方便而不验证
         * 但在实践开发中必须验证
         */
    }
}
```

输出：

```txt
114514
114514
1919
```

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Integer.html>

实践一下，看看数值和字符串之间怎么灵活变换。

```java
public class Demo {
    public static void main(String[] args) {
        // 要变换的变量
        int num = 114514;
        String str = "1919810";

        // int to String
        String s1 = "" + num;
        System.out.println(s1);
        String s2 = String.valueOf(num);
        System.out.println(s2);

        // String to int
        int i1 = Integer.valueOf(str);
        System.out.println(i1);
        int i2 = Integer.parseInt(str);
        System.out.println(i2);
    }
}
```

输出：

```txt
114514
114514
1919810
1919810
```

### 精选案例：提取字符串中数字

给出字符串 "ab98.76 +sks54-yyu 32senpai10"，要求编写方法提出所有的五个数字，并排序。

注：

- 不考虑字符串中出现的正负号（+, -），即所有转换结果为非负整数（包括 0 和正整数）
- 不考虑转换后整数超出范围情况，即测试用例中可能出现的最大整数不会超过 unsigned int 可处理的范围
- 需要考虑 '0' 开始的数字字符串情况，比如 "00035" ，应转换为整数 35
- "000" 应转换为整数 0；"00.0035" 应转换为整数 0 和 35（忽略小数点：mmm.nnn 当成两个数 mmm 和 nnn 来识别）
- 输入字符串不会超过 100 Bytes，请不用考虑超长字符串的情况

```java
import java.util.Arrays;

public class Extractor {
    public static void main(String[] args) {
        String str = "ab98.76 +sks54-yyu 32senpai10";
        StringEnhancement se = new StringEnhancement();
        int[] arr = se.numExtractor(str);
        System.out.println(Arrays.toString(arr));
    }
}

class StringEnhancement {
    public int[] numExtractor(String str) {
        str = prelude(str);
        /*
         * public String[] split(String regex)
         * 会按照正则表达式 regex 匹配字符串中的字符作为断点，切割字符串
         * 返回值是字符串数组（切开的字符串“碎片”）
         * 但如果字符串开头就被切割，则报错
         * 这里用 \D+ 匹配所有非数字字符
         */
        String[] sArr = str.split("\\D+");
        int[] arr = new int[sArr.length];
        for (int i = 0; i < sArr.length; i++) {
            arr[i] = Integer.parseInt(sArr[i]);
        }
        Arrays.sort(arr);
        return arr;
    }

    // 用于处理字符串开头的非数字字符
    private String prelude(String str) {
        StringBuilder sb = new StringBuilder(str);
        for (int i = 0; i < str.length(); i++) {
            // 从第 0 位遍历，只要不是数字便换成 0
            // 0 与遇到的第一个正常数字结合，相当于隐式
            if (str.charAt(i) < '0' || str.charAt(i) '9') {
                sb.setCharAt(i, '0');
            } else {
                break;
            }
        }
        str = sb.toString();
        return str;
    }
}
```

输出：

```txt
[10, 32, 54, 76, 98]
```

## 时间类

**Date 类**：

`Date` 类在 JDK 1.0 中被推出，它是第一代**时间类**。该类归属于多个包，我们在这里选用 `java.util.Date` 。有两种未过时的构造方法：

| 方法名          | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| Date()          | 分配一个 Date 对象并初始化，以表示分配的时刻，精确到毫秒     |
| Date(long date) | 分配一个 Date 对象并初始化，以表示从 1970 年至今经过的毫秒数 |

关于“1970 年”：指 GMT 1970/01/01 00:00:00。系统在输出的时候会给出 CMT 的结果，想要得到 GMT 值，应该减去 8 小时。**这一切的一切，都是命运石之门的选择！**（Unix 系统认为“1970 年”是时间的开始）

下面列出两种常用的方法：

| 方法名                  | 说明                               |
| ----------------------- | ---------------------------------- |
| long getTime()          | 返回**从 1970 年至今**经过的毫秒数 |
| void setTime(long time) | 依据给出的毫秒值设置时间           |

演示：

```java
import java.util.Date;

public class Demo {
    public static void main(String[] args) {
        // 现在（d产生的瞬间）的日期
        Date d = new Date();
        System.out.println(d);

        // 1970年又1000毫秒的日期
        Date d1 = new Date(1000);
        System.out.println(d1);

        // 1970年至今（getTime()调用的瞬间）经过的毫秒数
        long time = d.getTime();
        System.out.println(time);

        // 1970年又1000毫秒的日期
        d.setTime(1000);
        System.out.println(d);
    }
}
```

输出：

```txt
Wed May 04 13:54:36 CST 2022
Thu Jan 01 08:00:01 CST 1970
1651643676707
Thu Jan 01 08:00:01 CST 1970
```

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Date.html>

**SimpleDateFormat 类**：

该类包名为 `java.text.SimpleDateFormat` ，用于以区域敏感的方式格式化和解析日期。本处列出两种构造方法：

| 方法名                           | 说明                                 |
| -------------------------------- | ------------------------------------ |
| SimpleDateFormat()               | 构建对象，使用默认模式和日期格式     |
| SimpleDateFormat(String pattern) | 构建对象，使用**指定**模式和日期格式 |

```java
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;

public class Demo {
    // 此处抛出一个异常，后面会详细介绍
    public static void main(String[] args) throws ParseException {
        Date d = new Date();
        SimpleDateFormat sdf1 = new SimpleDateFormat();
        SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");

        // 格式化：Date to String
        // public final String format(Date date)A
        String str1 = sdf1.format(d);
        System.out.println(str1);
        String str2 = sdf2.format(d);
        System.out.println(str2);

        // 解析：String to Date
        // public Date parse(String source)
        String str3 = "1919年08月10日 11:45:14";
        Date dd = sdf2.parse(str3);
        System.out.println(dd);
    }
}
```

输出：

```txt
2022/5/4 下午3:52
2022年05月04日 15:52:44
Mon Aug 10 11:45:14 CST 2020
```

CST 表示夏令时，不同国家和地区实行夏令时的时间各不相同。这里不深入研究。经过实测，将 _str3_ 中年份改为 2022 后，输出 CST 而不再是 CDT。

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/text/SimpleDateFormat.html>

**Calendar 类**：

`Calendar` 类在 JDK 1.1 中被推出，它是第二代时间类，但并没有取代 `Date` 类。该类包名为 `java.util.Calendar` ，为某一时刻和一组日历字段之间的转换提供了一些方法，并为操作日历字段提供了一些方法。

`Calendar` 虽然是**抽象类**，但提供了一个类方法（静态方法） `getInstance` 用于获取 Calendar 对象，其日历字段已使用当前日期和时间初始化。

```java
// 本质有着多态的形式
Calendar c = Calendar.getInstance();
```

演示：

```java
import java.util.Calendar;

public class Demo {
    public static void main(String[] args) {
        Calendar c = Calendar.getInstance();
        System.out.println(c);

        // public int get(int field)
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH) + 1;
        int date = c.get(Calendar.DATE);
        System.out.println(year + "年" + month + "月" + date + "日");
    }
}
```

输出：

```txt
java.util.GregorianCalendar[time=1651655560585,areFieldsSet=true,areAllFieldsSet=true,lenient=true,zone=sun.util.calendar.ZoneInfo[id="Asia/Shanghai",offset=28800000,dstSavings=0,useDaylight=false,transitions=31,lastRule=null],firstDayOfWeek=1,minimalDaysInFirstWeek=1,ERA=1,YEAR=2022,MONTH=4,WEEK_OF_YEAR=19,WEEK_OF_MONTH=1,DAY_OF_MONTH=4,DAY_OF_YEAR=124,DAY_OF_WEEK=4,DAY_OF_WEEK_IN_MONTH=1,AM_PM=1,HOUR=5,HOUR_OF_DAY=17,MINUTE=12,SECOND=40,MILLISECOND=585,ZONE_OFFSET=28800000,DST_OFFSET=0]
2022年5月4日
```

第一次输出了 Calendar 里的全部信息，这不是我们想要的；第二次输出了我们易于理解的结果。注意 `Calendar.MONTH` 是从 0 开始计数的。

接下来再看两个常用方法：

| 方法名                                        | 说明                               |
| --------------------------------------------- | ---------------------------------- |
| abstract void add(int field, int amount)      | 根据日历规则，为指定字段增减时间量 |
| final void set(int year, int month, int date) | 设置当前日历的年月日               |

```java
// 当前年份减去1
cal.add(Calendar.YEAR, -1);

// 设置当前日历为2022年1月1日
cal.set(2022, 1, 1);
```

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Calendar.html>

**Instant、LocalDate、LocalTime 和 LocalDateTime 类**：

它们是第三代时间类，加入了对**线程安全**的支持。

- Instant：可以精确地获取到纳秒。
- LocalDate：输出*年-月-日*格式的时间类。
- LocalTime：输出*时-分-秒.毫秒*格式的时间类。
- LocalDateTime：输出*年-月-日 时-分-秒.毫秒*格式的时间类。

你还可以使用 `DateTimeFormatter` 类定义时间的格式。

现在学习线程安全的概念可能太过于早，其他细节请由读者自行查阅 API 文档学习。

## 异常类

**异常**就是程序出现了不正常的情况。与其相关的最终超类为 `Throwable` ，它有两个子类， `Error` 和 `Exception` 。其中 Error 类代表严重错误，如硬件损坏；Exception 类代表一般错误，是程序自身可以处理的问题。它又有一个子类 `RuntimeException` ，代表运行时产生的错误（亦称运行时异常、非受检异常）；非该类代表编写时产生的错误，不处理则无法通过编译。

如果程序出现了异常，JVM 默认会将异常的名称、原因和位置输出到终端，并终止程序。但我们希望它能暂时修复/忽略这个异常而执行之后的代码，所以我们要手动处理异常。

第一种办法是使用 `try-catch`。

```java
try {
    /*可能出现异常的代码段*/
} catch (Exception e) {
    /*异常的处理*/
}
```

演示：

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println("Program starts.");
        exceptionGenerator();
        System.out.println("Progrem ends.");
    }

    public static void exceptionGenerator() {
        // 挖个坑
        int[] a = new int[0];
        try {
            // 这句话执行一定会失败，异常类名为 ArrayIndexOutOfBoundsException
            System.out.println(a[0]);
        // 创建异常类的对象 aioobe
        } catch (ArrayIndexOutOfBoundsException aioobe) {
            // 输出问题名称、原因和位置
            aioobe.printStackTrace();
        }
    }
}
```

输出：

```txt
Program starts.
java.lang.ArrayIndexOutOfBoundsException: Index 0 out of bounds for length 0
        at Demo.exceptionGenerator(Demo.java:13)
        at Demo.main(Demo.java:4)
Progrem ends.
```

第二种方法是使用 `throws` 抛出异常。

```java
方法 throws 异常类名
```

在之前就演示了这种办法的应用，这里不再演示。

请注意，**抛出异常只能转移错误**，少部分情况下效果才等同于解决错误。若抛出无效，则遵从“谁调用谁解决”的原则（还是需要 `try-catch`）。**解决异常的最好办法永远是直接修正错误。**

接下来我们来了解一下**自定义异常**，一般用于在我们设定的环境里检查逻辑错误。

```java
// 继承自 RuntimeException 类也是可以的
public class 异常类名 extends Exception {
    public 异常类名() {
    }

    // 向父类 Exception 传递 massage
    public 异常类名(String massage) {
        super(massage);
    }
}
```

演示：

```java
import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String gender = sc.nextLine();

        // 异常解决
        Gender g = new Gender();
        try {
            g.checkGender(gender);
        } catch (GenderException ge) {
            ge.printStackTrace();
        }

        // 检查异常是否真的解决了
        System.out.println("Program ends normally.");
    }
}

class Gender {
    // 记得抛出
    public void checkGender(String gender) throws GenderException {
        if (gender.equals("male") ||
                gender.equals("female")) {
            System.out.println("合法的性别。");
        } else {
            // 注意是 throw 而不是 throws
            throw new GenderException("非法的性别！");
        }
    }
}

// 记得继承
class GenderException extends Exception {
    public GenderException() {
    }

    public GenderException(String message) {
        super(message);
    }
}
```

输出（输入：futanari）：

```txt
GenderException: 非法的性别！
        at Gender.checkGender(Demo.java:28)
        at Demo.main(Demo.java:11)
Program ends normally.
```

如果去除 `throw new GenderException("非法的性别！")` 中的参数， `GenderException` 将会被调用无参构造方法，_"非法的性别！"_ 将不会作为 _message_ 传递到 `Exception` 中。故而输出中也不会包含该字符串。
