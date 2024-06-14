# 面向对象特性 II

## 继承

**继承**是面向对象三大特征之一。可以使得子类（亦称派生类）具有父类（基类、超类）的属性（成员变量）和方法，还可以在子类中重新定义、追加属性和方法。

通用的格式是 `public class 子类 extends 父类 {}` 。

下面演示了继承的应用。

```java
public class Demo {
    public static void main(String[] args) {
        // 分别创建父子对象
        Parent fu = new Parent();
        Child zi = new Child();

        // 从子类对象中访问父类对象的成员
        System.out.println(zi.lotteryCode);
        zi.buyLottery();

        // 同时也没有失去自己的特性
        zi.buyCoke();
    }
}

class Parent {
    // 父亲买彩票
    String lotteryCode = "24-13-08-27-18-29";
    int price = 3;
    public void buyLottery() {
        System.out.println("啥也没中。");
    }
}

// 记得此处的特殊写法
class Child extends Parent{
    // 孩子买可乐
    public void buyCoke() {
        System.out.println(price + "块钱，好喝！");
    }
}
```

但如果父子类中，甚至子类方法内外都有相同的成员，从子类对象访问该成员时遵守“就近原则”。如果要优先访问子类成员变量，需用关键字 `this` ；**如果要优先访问父类成员，需用关键字 `super` ，用法同 `this` 。**

但是如果面对多级父子类关系，子类能否访问父类的父类的成员呢？下面给出检验代码。

```java
public class Test {
    public static void main(String[] args) {
        Layer3 object = new Layer3();
        object.say();
        object.sayyy();
    }
}

class Layer1 {
    String level = "一级";
    public void say() {
        System.out.println("一级");
    }
}

class Layer2 extends Layer1 {
}

class Layer3 extends Layer2 {
    public void sayyy() {
        System.out.println(level);
    }
}
```

实测输出了“一级一级”，所以多级继承是可用的。但请注意，关键字 `super` 不能越级，亦不能链式调用。

此外，父类中的私有成员，子类对象不能调用。

那 A 能不能同时作为 B 和 C 的子类呢（即**钻石继承**）？答案是不能。这里不给出检验代码（因为会报错）。

有关钻石继承的讨论，可以移步：<https://www.zhihu.com/question/582358263>

## 继承与构造方法

若 A 是 B 的子类，在创建 A 的对象时，会有什么样的构造方法被调用呢？我们用代码来检验。

```java
public class Test {
    public static void main(String[] args) {
        Child object = new Child();
        Child anotherObject = new Child(114514);
    }
}

class Parent {
    public Parent() {
        System.out.println("无参的父类构造方法被调用。");
    }

    public Parent(int args) {
        System.out.println("含参的父类构造方法被调用。");
    }
}

class Child extends Parent {
    public Child() {
        System.out.println("无参的子类构造方法被调用。");
    }

    public Child(int args) {
        System.out.println("含参的子类构造方法被调用。");
    }
}
```

实测输出了：

```txt
无参的父类构造方法被调用。
无参的子类构造方法被调用。
无参的父类构造方法被调用。
含参的子类构造方法被调用。
```

说明**子类中所有的构造方法默认都会访问父类的无参构造方法**。

那为什么*父类构造方法被调用*的输出先于子类的出现呢？
因为子类构造方法第一条语句默认是 `super()` ，即调用父类构造方法。因此子类构造方法里的输出语句要滞后执行。

由上，一旦出现继承，务必确保父类的空参构造方法是可用的，或者手动为子类构造方法添加 `super(args)` ，这个参数要符合父类含参构造方法的需求。

## 方法重写

子类中出现与父类**完全相同的方法声明**叫方法重写。当子类需要父类的功能，而功能主体子类有自己特有内容时，可以重写父类中的办法。

下面是一个演示。

```java
public class Demo {
    public static void main(String[] args) {
        Child z = new Child();
        z.fx();
    }
}

class Parent {
    public void fx() {
        System.out.println("father");
    }
}

class Child extends Parent {
    @Override
    public void fx() {
        super.fx();
        System.out.println("son");
    }
}
```

输出：

```txt
father
son
```

使用注解 `@Override` 可以帮助我们检查方法重写的有效性。关于其他注解，请参考：<https://www.runoob.com/w3cnote/java-annotation.html>

此外，子类重写父类方法时，子类方法权限不得低于父类方法。

## 包

**包的实质是文件夹**，作用是对类进行分类管理。

使用不同包下的类时，**要写类的全路径**，比较麻烦。为了简化操作，我们使用**导包**。导包的通用格式如下：

```java
import layer1.layer2.layer3;
```

想要导入自己的包，需要先**创建**包，创建包的通用格式如下：

```java
package layer1.layer2.layer3;
```

它必须放在 java 文件的第一行，优先于 `import` 语句。

我们知道平常想要编译并运行一个 java 文件，需要：

```txt
javac Project.java
java Project
```

有了包的概念后，需要一些改变：

```txt
javac -d . Project.java
java com.penyo.Project
```

你会发现编译器自动创建了包文件夹树。当然你也可以从简编译运行，代价是手动创建文件夹——不然就报错。

## 修饰符

**权限修饰符**：

|               | 同一个类中 | 同一个包中 | 不同包的子类 | 不同包的无关类 |
| ------------- | ---------- | ---------- | ------------ | -------------- |
| private       | ✓          |            |              |                |
| 无（default） | ✓          | ✓          |              |                |
| protected     | ✓          | ✓          | ✓            |                |
| public        | ✓          | ✓          | ✓            | ✓              |

注意，类只能被 `public` 修饰，或者不被修饰（`default`）。

**状态修饰符**：

|        | 修饰类的特点 | 修饰成员方法的特点 | 修饰成员变量的特点 |
| ------ | ------------ | ------------------ | ------------------ |
| final  | 不能被继承   | 不能被重写         | 不能被再赋值       |
| static | **不修饰类** | 被类的所有对象共享 | 被类的所有对象共享 |

注意， `final` 修饰引用类型变量（对象）时，固定了其地址，而不是地址指向的值； `static` 成员可通过类名直接调用，非静态成员只能通过对象名调用。

此外，**静态方法在访问本类的成员时**，只允许访问静态成员。实例方法则无此限制。

关于其他修饰符的介绍，请参考：<https://www.runoob.com/java/java-modifier-types.html>

## 多态

多态指的是**同一个对象在不同时刻下表现出来的不同形态**。需要具备**有继承/实现关系**、**有方法重写**和**有父（类/接口）引用指向子（类对象/实现）** 这三个前提才能出现多态现象。

以下给出了**具体类多态**的示范。

```java
public class Demo {
    public static void main(String[] args) {
        Animal scottsishFold = new Cat();
        System.out.println(scottsishFold.age);
        scottsishFold.meow();
    }
}

class Animal {
    int age = 5;

    public void meow() {
        System.out.println("Eat meat.");
    }
}

class Cat extends Animal {
    int age = 3;

    @Override
    public void meow() {
        System.out.println("Eat fish.");
    }
}
```

输出：

```txt
5
Eat fish.
```

在多态中，“成员变量编译运行都看父类”，“成员方法编译看父类，运行看子类”。规则区别产生的原因是成员方法被重写了而成员变量没有。

接下来看看多态的实用意义。

```java
public class Demo {
    public static void main(String[] args) {
        Animal c = new Cat();
        Animal d = new Dog();
        Animal o = new Owl();
        HumanizeAnimal ha = new HumanizeAnimal();

        ha.eat(c);
        ha.eat(d);
        ha.eat(o);
    }
}

class HumanizeAnimal {
    public void eat(Animal a) {
        a.eat();
    }
}

class Animal {
    public void eat() {
        System.out.println("Eat what?");
    }
}

class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("Eat fish.");
    }
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("Eat bone.");
    }
}

class Owl extends Animal {
    @Override
    public void eat() {
        System.out.println("Eat bunny.");
    }
}
```

输出：

```txt
Eat fish.
Eat bone.
Eat bunny.
```

可见，合理地运用多态可以提高代码的扩展性。

不过多态不能使用子类的独特功能，这是一种弊端。如果想要使用，除了单独创建一个子类的对象外，我们还可以对指向子类对象的父类引用**向下转型**（即数据类型强制转换）。

```java
Animal a = new Cat();
/*
 * 在实践中，使用向下转型前必须验证对象的本质是不是目标类
 * 使用 instanceof 测试它左边的对象是否是它右边的类的实例
 * 它返回 boolean 的数据类型
 */
if (c instanceof Cat) {
    Cat c = (Cat)a;
}
```

## 抽象类

在 Java 中，一个**没有方法体**的方法应该定义为**抽象方法**，而类中如果有抽象方法，该类必须定义为**抽象类**，但一个抽象类里不一定要有抽象方法。

下面展示了一个含抽象方法的抽象类。

```java
public abstract class Demo {
    // 它没有以花括号对为标志的方法体
    public abstract void function();
}
```

**抽象类无法直接建立对象**，但可以借助多态间接建立。这也叫**抽象类多态**。

```java
public class Demo {
    public static void main(String[] args) {
        Animal c = new Cat();
        c.eat();

        // 子类里若没有可调用的同名成员，则只好调用父类中的
        c.sleep();
    }
}

abstract class Animal {
    // 抽象类虽然无法直接实例化，但也可以有构造方法，用于子类访问父类数据的初始化
    public Animal() {
    }

    public abstract void eat();

    public void sleep() {
        System.out.println("Sleep.");
    }
}

class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("Eat fish.");
    }
}
```

输出：

```txt
Eat fish.
Sleep.
```

此外，抽象类的子类要么是抽象类，要么是**重写了其所有抽象方法**的非抽象类。

## 接口

接口是一种**公共的规范标准**，Java 中的接口更多的体现在**对行为的抽象**，与**抽象类**不同，是**对事务的抽象**。

下面演示一个接口和**实现**（`implements`）其的类，也叫**接口多态**。

```java
public class Demo {
    public static void main(String[] args) {
        Sing daoXiang = new Jay();
        daoXiang.sing();
    }
}

// 接口的效果等同于只能容忍方法为抽象型的抽象类
// JDK 8 后，静态和默认方法可以拥有方法体
interface Sing {
    public abstract void sing();

    // 由于默认接口里的方法都是公共的抽象方法，所以不强制要求使用修饰符 public abstract
    void shout();
}

// 类实现接口用关键字 implements，与 extends 用法相仿
// 实现类和抽象类的子类要求一致：要么是抽象类，要么重写接口中的所有（抽象）方法
class Jay implements Sing {
    public void sing() {
        System.out.println("还记得你说家是唯一的城堡");
    }
}
```

接下来来看看接口的成员特性。

```java
public class Test {
    public static void main(String[] args) {
        HaveLunch gaiJiaoFan = new YourLunch();

        // 以下语句会报错，故注释掉
        // gaiJiaoFan.price1 = 8;
        System.out.println(gaiJiaoFan.price1);
        System.out.println(HaveLunch.price1);
    }
}

interface HaveLunch {
    // 你觉得以下三个变量的类型一样吗
    int price1 = 5;
    final int price2 = 10;
    static int price3 = 15;

    // 连构造方法也得......不，接口根本没有构造方法
    // HaveLunch();
}

class YourLunch implements HaveLunch {
    public YourLunch() {
        // 如果其接口没有构造方法，那这个 super() 有什么用呢
        // 下一节会详细说明，现在只需要知道超到 Object 类去了就行了
        super();
    }
}
```

输出：

```txt
5
5
```

这说明了接口内的成员变量**默认**是**静态的、最终的**，当然了，还是**公共的**。

此外，接口/实现可以继承多个接口。

```java
// X, Y, Z, B, C, D 都是接口
interface W extends X, Y, Z {}

class A implements B, C, D {}
```

### 案例：猫娘乐园 Lite

对猫猫们进行训练，它们就可以变成猫娘了。要求使用抽象类和接口实现，并在主类中测试。

```java
public class NekoparaLite {
    public static void main(String[] args) {
        /*
         * // Stupid Operation As Follows
         * Humanization hc = new Cat();
         * Pet pc = new Cat();
         * // Average Operation As Follows
         */
        Cat cc = new Cat("Chocolates", "straight");
        Cat cv = new Cat("Vanilla", "oblique");
        System.out.print(cc.getName() + ": ");
        cc.sayHello();
        System.out.print(cv.getName() + ": ");
        cv.eat();
    }
}

interface Humanization {
    void sayHello();
}

abstract class Pet {
    private String name, attribute;

    public Pet() {
    }

    public Pet(String name, String attribute) {
        this.name = name;
        this.attribute = attribute;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public abstract void eat();
}

class Cat extends Pet implements Humanization {
    public Cat() {
    }

    public Cat(String name, String attribute) {
        super(name, attribute);
    }

    @Override
    public void sayHello() {
        System.out.println("ご主人様、こんにちは。");
    }

    @Override
    public void eat() {
        System.out.println("主人の作ったご飯は本当においしいですね。");
    }
}
```
