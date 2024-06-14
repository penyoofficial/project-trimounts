# 常用类 I

## String 类

Java 中的所有字符串，都是 `String` 的对象实例，它在 `java.lang` 包中，所以使用的时候不需要导包。虽然字符串不可变，但可以被共享。字符串效果上相当于字符数组（`char[]`），底层原理上为字节数组（`byte[]`）。

关于八大基础数据类型，请参考：<https://www.runoob.com/java/java-basic-datatypes.html>

下面展示了四种 String 构造方法：

```java
// 创建一个空白字符串对象
public String();

// 根据字符数组内容来创建字符串对象
public String(char[] args);

// 根据字节数组内容来创建字符串对象
public String(byte[] args);

// 直接赋值 "abc" 到新字符串对象
String s = "abc";
```

前三种办法创造的字符串，将无视内容分别占用内存空间。用第四种办法创造的字符串，只要内容相同，则**只占用一块内存区域**，由 JVM 在字符串池中维护。

```java
// str1 与 str2 本质上是一个对象，相当于 String str2 = str1
String str1 = "abc";
String str2 = "abc";

// 可以验证一下
// String 不是基本数据类型，所以在这里比较的是地址值
System.out.println(str1 == str2);

// 如要比较字符串的内容（数据值），则使用 equals() 方法
System.out.println(str1.equals(str2));
```

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html>

### 案例：用户登录系统

已知用户名和密码，请用程序模拟用户登录，要求给出一定的反馈，总共三次机会试错。

```java
import java.util.Scanner;

public class LoginSystem {
    static int count = 3;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入用户名：");
        String UID = sc.nextLine();
        System.out.println("请输入密码：");
        String password = sc.nextLine();
        Check user = new Check();
        if ((count - 1) == 0) {
            System.out.println("错误次数太多！");
            return;
        }
        if (user.dualCheck(UID, password)) {
            System.out.println("欢迎！");
        } else {
            System.out.println("错误！您还有" + --count + "次机会！");
            main(args);
        }
    }
}

class Check {
    private String UID = "Senpai";
    private String password = "114514";

    public boolean dualCheck(String UID, String password) {
        if (UID.equals(this.UID) && password.equals(this.password)) {
            return true;
        }
        return false;
    }
}
```

为了达到展示模块化设计的目的，这里没有从简解决问题。

## 字符串索引与遍历

用 `xx.charAt(bit)` 指定字符串中第 _bit_ 位字符（从 0 开始算）。

```java
// 这里应该输出全角感叹号
String str = "嗯！嘛！啊！";
System.out.println(str.charAt(5));
```

下面演示如何拆解字符串。

```java
import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(Sysytem.in);
        String str = sc.nextLine();

        // xx.length()用于测量xx字符串的长度
        for(int i = 0; i < str.length(); i++) {
            System.out.println(str.charAt(i));
        }
    }
}
```

## StringBuilder 类

`StringBuilder` 是一个**可变**的字符串类，与 `String` 的不可变形成对比。

下面展示两种 `StringBuilder` 的构造方法。

```java
// 创建空白可变字符串对象
public StringBuilder();

// 根据字符串内容创建可变字符串对象
public StringBuilder(String str);
```

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/StringBuilder.html>

## 添加与反转

使用 `xx.append(args)` 对可变对象 _xx_ 追加 _args_，并返回对象本身。使用 `xx.reverse()` 对可变对象 _xx_ 反转，并返回对象本身。

以下是两种方法的示范。

```java
// 新建对象 str，依据字符串 "Megalovania" 产生
// 不可直接赋值字符串给对象
StringBuilder str = new StringBuilder("Megalovania");

// 添加并验证
str.append("114514");
System.out.println(str);

// 链式添加
str.append("1919").append(1919).append("1919");
System.out.println(str);

// 反转
str.reverse();
System.out.println(str);
```

## String 类与 StringBuilder 类间的转换

需要将 `String` 类转换为 `StringBuilder` 类，可用构造方法解决；相反时应用 `toString()` 方法。

下面给出了示例。

```java
String str = "Tieba";

// String类转换为StringBuilder类
StringBuilder sb = new StringBuilder(str);

// StringBuilder类转换为String类
String str2 = sb.toString();
```

依靠转换，可以更方便地执行对字符串的修改，节约了硬件资源。

## ArrayList 类

编程的时候如果要存储多个数据，使用**长度固定**的数组不一定满足我们的需求。这时候引入集合类——存储空间可变的数据模型。 `ArrayList` 类是集合类的一种，存在于 `java.util` 包中，注意导包。

下面展示 `ArrayList` 的构造方法。

```java
// 创建一个空的集合对象
public ArrayList();

// 将指定元素追加到集合末尾
public boolean add(Element e);

// 在集合的指定位置插入指定元素
public void add(int index, Element e);
```

下面演示 `ArrayList` 的用法。

```java
import java.util.ArrayList;

public class Demo {
    public static void main(String[] args) {
        // 创建一个空集合对象（String型）
        // 自JDK7后，第二个方括号内可不写类型
        ArrayList<String> arr = new ArrayList<String>();

        // 添加元素，其返回值表示添加成功与否
        arr.add("hello");
        String str = "world";
        arr.add(str);

        // 插入元素，受影响的元素均向后移一位
        // 请注意index的合法性
        arr.add(0, "java");

        // 校验
        System.out.println(arr);
    }
}
```

为了完成更丰富的操作，我们引入以下五个常用方法。

```java
// 删除指定元素，返回删除是否成功
public boolean remove(Object o);

// 删除指定索引处的元素，返回被删除的元素
public Element remove(int index);

// 修改指定索引处的元素，返回被修改的元素
public Element set(int index, Element e);

// 返回指定索引处的元素
public Element get(int index);

// 返回集合中的元素的个数
public int size();
```

其中若指定可变集合里有不止一个相同元素，删除该元素时优先操作索引最小的一个。

关于此类的更多信息，请参考：<https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html>

### 精选案例：学生管理系统

创建一个存储学生对象的集合，要具备一定的属性。用户可以自由查增修删学生信息。

```java
import java.util.Scanner;
import java.util.ArrayList;

public class StudentManagement {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        ArrayList<Student> arr = new ArrayList<>();
        while (true) {
            System.out.println("--------欢迎使用学生管理系统--------");
            System.out.println("1 展示学生信息");
            System.out.println("2 添加学生信息");
            System.out.println("3 修改学生信息");
            System.out.println("4 删除学生信息");
            System.out.println("5 退出");
            System.out.println("请输入你的选择：");
            Scanner sc = new Scanner(System.in);
            String function = sc.nextLine();
            switch (function) {
                case "1":
                    showup(arr);
                    break;
                case "2":
                    addon(arr);
                    break;
                case "3":
                    alter(arr);
                    break;
                case "4":
                    delete(arr);
                    break;
                case "5":
                    System.out.println("谢谢使用！");
                    System.exit(0);
                default:
                    System.out.println("非法的选择！");
                    break;
            }
        }
    }

    public static void showup(ArrayList<Student> arr) {
        if (arr.size() == 0) {
            System.out.println("暂时未能查询到任何数据。");
        }
        for (int i = 0; i < arr.size(); i++) {
            Student s = arr.get(i);
            System.out.println("ID: " + s.getId() +
                    "\tName: " + s.getName() +
                    "\tAge: " + s.getAge() +
                    "\t\tAddress: " + s.getAddress());
        }
        System.out.println("按回车返回主界面。");
        sc.nextLine();
    }

    public static void addon(ArrayList<Student> arr) {
        System.out.println("请输入学号：");
        String id = sc.nextLine();
        for (int i = 0; i < arr.size(); i++) {
            if (arr.get(i).getId().equals(id)) {
                System.out.println("该学号已被占用！按回车返回主界面。");
                sc.nextLine();
                return;
            }
        }
        System.out.println("请输入姓名：");
        String name = sc.nextLine();
        System.out.println("请输入年龄：");
        String age = sc.nextLine();
        System.out.println("请输入籍贯：");
        String address = sc.nextLine();
        Student newStudent = new Student(id, name, age, address);
        arr.add(newStudent);
        System.out.println("操作成功！按回车返回主界面。");
        sc.nextLine();
    }

    public static void alter(ArrayList<Student> arr) {
        System.out.println("请输入学号：");
        String id = sc.nextLine();
        for (int i = 0; i < arr.size(); i++) {
            if (arr.get(i).getId().equals(id)) {
                System.out.println("请输入新姓名：");
                String name = sc.nextLine();
                System.out.println("请输入新年龄：");
                String age = sc.nextLine();
                System.out.println("请输入新籍贯：");
                String address = sc.nextLine();
                Student tranStudent = new Student(arr.get(i).getId(), name, age, address);
                arr.set(i, tranStudent);
                System.out.println("操作成功！按回车返回主界面。");
                sc.nextLine();
                return;
            }
        }
        System.out.println("未检索到该学生！按回车返回主界面。");
        sc.nextLine();
    }

    public static void delete(ArrayList<Student> arr) {
        System.out.println("请输入学号：");
        String id = sc.nextLine();
        for (int i = 0; i < arr.size(); i++) {
            if (arr.get(i).getId().equals(id)) {
                System.out.println("确定这样做吗？一旦删除将无法恢复！请手动输入Delete（区分大小写）。");
                String operation = sc.nextLine();
                if (operation.equals("Delete")) {
                    arr.remove(i);
                    System.out.println("操作成功！按回车返回主界面。");
                    sc.nextLine();
                } else {
                    System.out.println("操作已取消。");
                }
                return;
            }
        }
        System.out.println("未检索到该学生！按回车返回主界面。");
        sc.nextLine();
    }
}

class Student {
    private String id, name, age, address;

    public Student() {
    }

    public Student(String id, String name, String age, String address) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```
