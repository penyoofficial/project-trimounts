# 面向对象特性 I

**面向对象**（Object-Oriented）特性是 Java 中的重要组成部分，OOP 思想也是 Java 的核心编程思想。可以说，学好 OOP，就能学到 Java 的精髓。

## 方法

**方法**在 Java 中的作用可比做 C 中的**函数**。一个**类**里至少要包含一个**方法**才有意义。程序从**主方法**开始执行。

这里定义一个比较两个整型值大小的**空类型方法**。

```java
public class Demo {
    public static void main(String[] args) {
        int x = 1, y = 2;
        whoMax(x, y);
    }
    public static void whoMax(int a, int b) {
        if (a > b) {
            System.out.println(a);
        } else {
            System.out.println(b);
        }
    }
}
```

对于输出模块，你也可以直接用一句 `System.out.println(a > b ? a : b)` 。若不需要直接输出给用户，可以将方法改为整型，再写 `return a > b ? a : b` 。

有时需要在一个类中定义多个**同名但不同参数类型或数量**的方法，这被称为**方法重载**。

### 案例：冒泡排序

定义一个以整型数组为参数的方法，可以将数组中的值按大小顺序排序。

```java
import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        // 让用户指定数组长度，并填充
        Scanner userInput = new Scanner(System.in);
        int size = userInput.nextInt();
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = userInput.nextInt();
        }

        // 开始排序
        Bubble(arr);

        // 输出结果
        for (int i = 0; i < size - 1; i++) {
            System.out.print(arr[i] + ", ");
        }
        System.out.print(arr[arr.length - 1]);
    }

    // 经典的冒泡排序算法
    public static void Bubble(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j + 1] < arr[j]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}
```

## 类与对象

类是对象的数据类型，是具有相同属性和行为的对象的集合。一个程序只能有最多一个主类（包含 `main()` 的类）。

此处创建了文件 _VisualGirl.java_，其中包含一个 _VisualGirl_ 类，用于描述一个简陋的 AI 女友（迫真）。

```java
public class VisualGirl {
    // 成员变量
    String name;
    int age;

    // 成员方法
    public void morningCall() {
        System.out.println("Ohayo！");
    }
    public void nightCall() {
        System.out.println("Sukidesu！");
    }
}
```

此处创建了文件 _Demo.java_，并与 _VisualGirl.java_ 在同一目录下，用于演示在主类里调用 _VisualGirl_ 类中属性的办法。

```java
public class Demo {
    public static void main(String[] args) {
        // 创建对象
        VisualGirl oldMate = new VisualGirl;

        // 使用成员变量
        System.out.println("Halo, I'm " + oldMate.name + ", ");
        System.out.print(oldMate.age + ".");

        oldMate.name = "Duan";
        oldMate.age = 18;

        System.out.println("Halo, I'm " + oldMate.name + ", ");
        System.out.print(oldMate.age + ".");

        // 使用成员方法
        oldMate.morningCall();
        oldMate.nightCall();
    }
}
```

`static` 关键字用来声明同一类对象的**共享**资源，非 `static` 修饰的，是对象实例**独享**的资源。主方法作为程序的入口，为了不在实例化上浪费时间，要求必须是静态的。

## 成员变量与局部变量

下表展示了两者的区别：

| 区别                                                                                         | 成员变量                                       | 局部变量                                         |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| 在类中的位置                                                                                 | 类中、方法外                                   | 方法内或方法声明上（形参）                       |
| [在内存中的位置](https://wenku.baidu.com/view/0e3d2b55a16925c52cc58bd63186bceb19e8edfa.html) | 堆内存                                         | 栈内存                                           |
| 生命周期                                                                                     | 随着**对象的存在**而存在，随着对象的消失而消失 | 随着**方法的调用**而存在，随着方法调用完毕而消失 |
| 初始化值                                                                                     | 有默认的初始化值                               | 没有默认的初始化值，必须先定义、赋值才能使用     |

## 私有

有时为了提高数据的安全性，用 `private` 关键字而不是 `public` 修饰成员，可使成员只可在本类中被访问。

使用 `get变量名()` 方法**获取**成员变量的值，方法用 `public` 修饰。使用 `set变量名(参数)` 方法**设置**成员变量的值，方法亦用 `public` 修饰。

此处建立 _EChou.java_。

```java
public class EChou {
    // 私有化变量code，使得不能被直接访问
    private int code = 114514;

    // 安插内鬼（预留接口）
    public int getCode() {
        return code;
    }
    public void setCode(int code) {
        // this.xx会指向被调用对象下的成员变量xx
        this.code = code;
    }
}
```

此处建立 _Demo.java_，与 _EChou.java_ 同目录。

```java
public class Demo {
    public static void main(String[] args) {
        EChou Senpai = new EChou();

        // 想要访问Senpai.code肯定是不能直接调用，需要借助内鬼方法getCode()
        System.out.println(Senpai.getCode);

        // 现在尝试修改Senpai.code的值
        Senpai.setCode(1919810);
        System.out.println(Senpai.getCode);
    }
}
```

如果你熟知 C，应该意识到， `get变量名()` 和 `set变量名(参数)` 叫什么其实并无所谓，这里只是为了便于使用才设立了命名规则。

## 封装

封装是面向对象三大特征之一（**封装、继承、多态**），是面向对象编程语言**对客观世界的模拟**，客观世界里成员变量都是隐藏在对象内部的，外界是无法直接操作的。

封装讲究将类的某些信息隐藏在类的内部，不允许外部程序直接访问，而是通过该类提供的方法来实现对隐藏信息的访问和操作。对于私有的成员，提供对应的 `getXx()` 和 `setXx(args)` 方法。

封装的意义在于**提高代码的安全性和复用性**。

## 构造方法

在创建对象时，我们会发现行末总有一对小括号，里面甚至还有参数，而这通常是方法的标志。

```java
Scanner sc = new Scanner(System.in);
```

这其实是**构造方法**（构造器），用于创建对象后对对象内数据初始化，但与一般方法不同，构造方法**没有数据类型**。它的名称必须与类相同。

下面展示一个构造方法。

```java
public class Homo {
    public Homo(/*按照需要添加形参*/) {
        /*按照需要添加行为*/
    }
}
```

也就是说， `public a b(c);` 表示名称为 b、接收参数类型为 c（不排除不是基本数据类型）、返回值类型为 a（不排除不是基本数据类型）。

如果我们没有手动构造方法，IDE 会自动产生一个**空参**构造方法。如果构造方法需要接受多种类型的数据（或者不接受），可以使用**方法重载**。
