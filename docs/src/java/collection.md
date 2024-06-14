# 集合

集合类是 Java 数据结构的实现，**提供一种存储空间可变的数据模型**，容量可以随时发生改变。集合类是 `java.util` 包中的重要内容，它允许以各种方式将元素分组，并定义了各种使这些元素更容易操作的方法。集合类是可以往里面保存多个对象的类，存放的是对象，不同的集合类有不同的功能和特点，适合不同的场合，用以解决一些实际问题。

Java 中有许多种集合类，比如单列的 `Collection` **接口**和双列的 `Map` **接口**。其中 Collection 接口中又包含元素可重复的 `List` **接口**和不可重复的 `Set` **接口**。之前学习的 `ArrayList` 就是 `List` 的一个**实现类**。

## Collection 接口与迭代器

想要实例化 `Collection`，必须借助**多态**的方式：

```java
Collection<Class> c = new ArrayList<Class>();
```

接下来给出一些常用的方法：

| 方法名                     | 说明                       |
| -------------------------- | -------------------------- |
| boolean add(Element e)     | 添加元素                   |
| boolean remove(Object o)   | 移除指定元素               |
| void clear()               | 清空元素                   |
| boolean contains(Object o) | 判断集合中是否存在指定元素 |
| boolean isEmpty()          | 判断集合是否为空           |
| int size()                 | 返回集合的长度             |

演示：

```java
import java.util.ArrayList;
import java.util.Collection;

public class Demo {
    public static void main(String[] args) {
        Collection<String> c = new ArrayList<String>();
        c.add("Fxxk U");
        c.add("Fxxk Me");
        c.add("Fxxk Him");
        System.out.println("列举元素：" + c);

        // 判断是否真的去除成功了（输出 boolean 值）
        System.out.println("是否去除成功：" + c.remove("Fxxk Her"));

        c.remove("Fxxk Him");

        // 判断集合中是否包含指定元素
        // public boolean contain(Object o)
        System.out.println("是否包含：" + c.contains("Fxxk U"));

        // 输出现在集合的长度和它的元素
        System.out.println("集合长度：" + c.size() + "，再列举元素：" + c);

        // 清空集合并验证
        c.clear();
        System.out.println("是否为空：" + c.isEmpty());
    }
}
```

输出：

```txt
列举元素：[Fxxk U, Fxxk Me, Fxxk Him]
是否去除成功：false
是否包含：true
集合长度：2，列举元素：[Fxxk U, Fxxk Me]
是否为空：true
```

当我们想要对集合中的元素进行遍历时，需要引入**迭代器**（iterator, /ɪtə'reɪtə/），一种用于访问集合的方法。别忘记**导包**。

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class Demo {
    public static void main(String[] args) {
        Collection<String> c = new ArrayList<String>();
        c.add("Fxxk U");
        c.add("Fxxk Me");
        c.add("Fxxk Him");

        // 依据集合 c 的 iterator() 方法建立 String 型迭代器
        Iterator<String> istr = c.iterator();

        // 是否存在下一个元素
        while (istr.hasNext()) {
            // 输出“下一个”元素
            System.out.println(istr.next());
        }
    }
}
```

输出：

```txt
Fxxk U
Fxxk Me
Fxxk Him
```

在使用迭代器遍历集合时，不可进行**导致集合尺寸变化**的行为，否则会触发**并发修改异常**。

### 案例：人物信息遍历

定义 `Character` 类，包含有人物的基本信息。利用**迭代器**，将 `Character` 的集合遍历输出。

```java
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class Demo {
    public static void main(String[] args) {
        Collection<Character> c = new ArrayList<Character>();
        c.add(new Character("胡桃", "璃月", 16));
        c.add(new Character("可莉", "蒙德", 8));
        c.add(new Character("绫华", "稻妻", 16));
        Iterator<Character> istr = c.iterator();
        while (istr.hasNext()) {
            System.out.println(istr.next());
        }

        // 重置迭代器，再单独输出一遍 name
        istr = c.iterator();
        while (istr.hasNext()) {
            System.out.println(istr.next().name);
        }
    }
}

class Character {
    String name, birthPlace;
    int age;

    public Character() {
    }

    public Character(String name, String birthPlace, int age) {
        this.name = name;
        this.birthPlace = birthPlace;
        this.age = age;
    }

    public String toString() {
        return name + "：" + birthPlace + "人，" + age + "岁。";
    }
}
```

输出：

```txt
胡桃：璃月人，16岁。
可莉：蒙德人，8岁。
绫华：稻妻人，16岁。
胡桃
可莉
绫华
```

## List 接口与列表迭代器

`List` 类为**有序集合**，亦称**列表**，相比于 `Collection` 类多了**索引**的概念。 `List` 类允许重复的元素。

接下来介绍一下 List 类特有的一些方法：

| 方法名                            | 说明                                       |
| --------------------------------- | ------------------------------------------ |
| void add(int index, Element e)    | 在集合的指定位置插入指定元素               |
| Element remove(int index)         | 删除指定索引处的元素，**返回被删除的元素** |
| Element set(int index, Element e) | 修改指定索引处的元素，**返回被删除的元素** |
| Element get(int index)            | 返回指定索引处的元素                       |

```java
import java.util.ArrayList;
import java.util.List;

public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();

        // 两个不一样的 add()
        list.add("雷泽");
        list.add(0, "香菱");
        System.out.println(list);

        // 删改
        list.remove(1);
        list.set(0, "重云");
        System.out.println(list);

        // 调取指定元素
        System.out.println(list.get(0));
    }
}
```

输出：

```txt
[香菱, 雷泽]
[重云]
重云
```

列表有自己独有的迭代器，叫做 `ListIterator` **接口**，继承自 `Iterator` **接口**。它允许向任意方向遍历列表，并在遍历期间修改列表。

它包含下列常见方法：

| 方法名                | 说明                                 |
| --------------------- | ------------------------------------ |
| Element next()        | 返回迭代中的下一元素                 |
| boolean hasNext()     | 返回迭代具有更多元素的布尔值         |
| Element previous()    | 返回迭代中的上一元素                 |
| boolean hasPrevious() | 返回反向迭代具有更多元素的布尔值     |
| void add(Element e)   | 插入指定元素到列表的当前迭代到的位置 |

演示：

```java
import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;

public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<String>();
        list.add("雷泽");
        list.add("香菱");
        list.add("重云");

        // 正向遍历
        ListIterator<String> li = list.listIterator();
        while (li.hasNext()) {
            String thisOne = li.next();
            if (thisOne.equals("雷泽"))
                li.add("可莉");
            if (thisOne.equals("重云"))
                li.set("行秋");
            System.out.println(thisOne);
        }
        System.out.println("--------");

        // 反向遍历
        while (li.hasPrevious()) {
            System.out.println(li.previous());
        }
    }
}
```

输出：

```txt
雷泽
香菱
重云
--------
行秋
香菱
可莉
雷泽
```

由上可见，在迭代时修改的元素，在本次迭代中是不会呈现的。

下面演示一段错误的代码：

```java
// 前文省略
ListIterator<String> li = list.listIterator();
while (li.hasNext()) {
    li.add("可莉");
    System.out.println(li.next());
}
```

输出：

```txt
Exception in thread "main" java.lang.IllegalStateException
        at java.base/java.util.ArrayList$ListItr.set(ArrayList.java:1053)
        at Demo.main(Demo.java:15)
```

这里产生了 `IllegalStateException` 异常。通过追踪，发现该异常在 `java.util.ArrayList$ListItr.set()` 中被抛出。

```java
if (lastRet < 0)
    throw new IllegalStateException();
```

抛出条件是 _lastRet_ < 0，追踪发现该变量在 `ArrayList$Itr` 开头定义：

```java
int lastRet = -1;
```

也就是说，只要在迭代中，_lastRet_ 就是 -1，一用 `set()` 就一定会抛出异常。但为什么在调用过 `next()` 方法后再用 `set()` 就没问题呢？下面是 `next()` 在 `ArrayList$Itr` 中的实现：

```java
@SuppressWarnings("unchecked")
public E next() {
    checkForComodification();
    int i = cursor; // 对象初始化令 cursor=0，故 i=0
    if (i >= size) // 这接下来一大段都不用看
        throw new NoSuchElementException();
    Object[] elementData = ArrayList.this.elementData;
    if (i >= elementData.length)
        throw new ConcurrentModificationException();
    cursor = i + 1;
    return (E) elementData[lastRet = i]; // lastRet被赋予 i 的值，1
}
```

所以，我们发现，想要修改列表元素，需要先调取（`next()`）才能修改（`set()`）。

## 增强 for 语句

增强 `for` 语句，用于简化数组和集合的遍历，其实质就是**迭代器**。下面是它的模板：

```java
for (ElementOfArrayOrCollection e : arraylike) {
    // e means the ?th element of array or collection
}
```

演示：

```java
public class Demo {
    public static void main(String[] args) {
        String[] arr = { "1不是1", "2不是2", "3不是3" };
        for (String whoCaresTheName : arr) {
            // whoCaresThename会不断迭代
            System.out.println(whoCaresTheName);
        }
    }
}
```

输出：

```txt
1不是1
2不是2
3不是3
```

## 数据结构初步

**栈与队列**：

栈（Stack）是一种数据**先进后出**的模型，本质是一种运算受限的线性表（只能在表尾（**栈顶**）进行操作）。数据进入栈模型的过程称为**压栈/进栈**（Push），离开的过程称为**弹栈/出栈**（Pop）。第一个进入的数据称为**栈底元素**，最后进入的数据称为**栈顶元素**。若有 ABCD 四个数据进栈，则只能以 DCBA 的方式出栈。

队列（Queue）是一种数据**先进先出**的模型，本质也是一种运算受限的线性表，但与栈有所不同（只允许在表的**前端**（Front）进行删除操作，而在表的**后端**（Rear）进行插入操作。数据从后端进入队列模型的过程称为**入队列**，从前端离开的过程称为**出队列**。若有 ABCD 四个数据入队列，则以 ABCD 的方式出队列。

**数组与链表**：

**数组**（Array）在内存中具有**连续的一片空间**，可使用**索引**（Index）查询数据。查询任意数据耗时都相同，**查询效率高**。增删数据时会影响之后的所有元素，**增删效率低**。

**链表**（Linked List）是一种物理存储单元上**非连续、非顺序**的存储结构，可以充分利用计算机内存空间，但失去了数组随机读取的优点。查询数据时，无论是依据“索引”还是数据内容，都需要从头（Head）遍历，**查询效率低**。增删数据只需要改动结点中存储的地址值，**增删效率高**。

## LinkedList 类

在前面，我们学习了 `ArrayList` ，它是 `List` 的**实现类**，这里的 `LinkedList` 也是 `List` 的实现类。不同之处在于，它的底层数据结构是**链表**，而 `ArrayList` 底层数据结构是**数组**。除此之外，两者没有太大的区别。我们在需要使用列表的时候，可以按照需要（查询优先或增删优先）选用两者其一。

接下来了解一下 `LinkedList` 的一些特有方法：

| 方法名                   | 说明                             |
| ------------------------ | -------------------------------- |
| void addFirst(Element e) | 在列表开头插入指定元素           |
| void addLast(Element e)  | 将指定元素追加到列表末尾         |
| Element getFirst()       | 返回列表中的第一个元素           |
| Element getLast()        | 返回列表中的最后一个元素         |
| Element removeFirst()    | 从此列表中删除并返回第一个元素   |
| Element removeLast()     | 从此列表中删除并返回最后一个元素 |

演示：

```java
import java.util.LinkedList;

public class Demo {
    public static void main(String[] args) {
        LinkedList<String> ll = new LinkedList<String>();

        // 花式添加
        ll.add("巴巴托斯");
        ll.addFirst("摩拉克斯");
        ll.addLast("巴尔泽布");
        System.out.println(ll);

        // 获取和删除
        System.out.println(ll.getFirst());
        ll.removeFirst();
        System.out.println(ll.getFirst());
    }
}
```

输出：

```txt
[摩拉克斯, 巴巴托斯, 巴尔泽布]
摩拉克斯
巴巴托斯
```

## Set 接口

`Set` **接口**位于 `java.util.Set` 。相较于 `List` ，它是一个不包含重复元素的集合，且没有带索引的方法。想要获取 `Set` 的对象，需要用子类实现，这里介绍 `HashSet` 。

`HashSet` 由 `HashMap` （哈希表）支持，**对集合的迭代顺序不做保证，且不保证列表在一段时间内保持不变**。下面演示 `Set` 的应用：

```java
import java.util.HashSet;
import java.util.Set;

public class Demo {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();

        // 依次添加三个不同元素
        set.add("114514");
        set.add("1919810");
        set.add("Yarimasunei!");

        // 再次添加已经存在过的元素
        set.add("114514");

        // 检测
        System.out.println(set);
    }
}
```

输出：

```txt
[1919810, Yarimasunei!, 114514]
```

那为什么 `HashSet` 会有这样的特性呢？先讲元素唯一性：需要先了解**哈希值**的概念：JDK 根据对象的地址或者字符串或者数字算出来的 int 类型的数值。在 `Object` 类中，有方法 `hashCode()` 可以返回对象的哈希值。

一个对象的哈希值在内容未被更改的情况下是**恒定不变**的。在不特意重写 `hashCode()` 的情况下，两个内容完全相同的对象不会拥有相同的哈希值，除非发生**碰撞**。字符串由于特有**常量池**，所以两个相同内容的 String 类对象应该有着同样的哈希值。当然，两个不相同的对象也有可能有着同样的哈希值，这就好比 3 \* 2 = 1 \* 6。

如果向一个 `HashSet` 中加入两个哈希值相同但内容不同的对象该怎么办呢？系统会再用 `equals()` 方法进一步比较。因而这点不用担心。

然后是无序性：与**哈希表**有关。JDK 8 之前，底层采用**数组 + 链表**的方式实现哈希表，即以链表为元素的数组。 `HashSet` 中的元素依照各自的哈希值按照一定规律排序，所以会扰乱用户指定的顺序。

如果想要保留特定的顺序，应当使用 `LinkedHashMap` ，它额外使用了一层**链表**来确保顺序（形同**队列**）：

```java
import java.util.LinkedHashSet;

public class Demo {
    public static void main(String[] args) {
        LinkedHashSet<String> lhs = new LinkedHashSet<>();
        lhs.add("114514");
        lhs.add("1919810");
        lhs.add("Yarimasunei!");
        lhs.add("114514");
        System.out.println(lhs);
    }
}
```

输出：

```txt
[114514, 1919810, Yarimasunei!]
```

此外，你还可以使用 `TreeSet` ，它能实时的自动排序集合内的元素。

```java
import java.util.TreeSet;

public class Demo {
    public static void main(String[] args) {
        // 无参构造，默认自然排序
        TreeSet<Integer> lhs = new TreeSet<>();
        lhs.add(114514);
        lhs.add(10086);
        lhs.add(1919);
        for (Integer i : lhs)
            System.out.println(i);
    }
}
```

输出：

```txt
1919
10086
114514
```

### 案例：悲情回忆录

咱的罗曼史非常的不幸......但好在有时可以回想起她们的一些话语碎片，作为精神慰籍，尽管也不一定是什么好话（抖 M 是吧）......用 `TreeSet` 集合存储这种信息，并单一按照姓名升序排序信息，最后合理的输出。

```java
import java.util.TreeSet;

public class Demo {
    public static void main(String[] args) {
        TreeSet<BigMiss> lhs = new TreeSet<>();
        /*
         * 也可以使用带参构造，并重写 Comparator 接口中的 compare() 方法
         * TreeSet<BigMiss> lhs = new TreeSet<>(new Comparator<BigMiss>() {
         *     public int compare(BigMiss miss1, BigMiss miss2) {
         *         return miss1.name.compareTo(miss2.name);
         *     }
         * });
         */
        lhs.add(new BigMiss("Duan Mingxuan", 19) {
            @Override
            public void tsundere() {
                System.out.println("我，我没有委屈，就是想哭放松一下......");
            }
        });
        lhs.add(new BigMiss("Liu Xingrui", 19) {
            @Override
            public void tsundere() {
                System.out.println("这道题我不会呢？你会的吧？");
            }
        });
        lhs.add(new BigMiss("Dai Qingtong", 19) {
            @Override
            public void tsundere() {
                System.out.println("你别再找我了，咱俩不合适。");
            }
        });
        for (BigMiss thisMiss : lhs) {
            System.out.print(thisMiss.name + "（" + thisMiss.age + "岁）：");
            thisMiss.tsundere();
        }
    }
}

// 由于目标类包含多个属性，需要重写 compareTo() 定义新的规则，所以必须实现 Comparable 接口
abstract class BigMiss implements Comparable<BigMiss> {
    String name;
    int age;

    public BigMiss(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public abstract void tsundere();

    @Override
    public int compareTo(BigMiss o) {
        // 完全依照姓名来升序排序
        return this.name.compareTo(o.name);
    }
}
```

输出：

```txt
Dai Qingtong（19岁）：你别再找我了，咱俩不合适。
Duan Mingxuan（19岁）：我，我没有委屈，就是想哭放松一下......
Liu Xingrui（19岁）：这道题我不会呢？你会的吧？
```

~~男同学们，一定要好好学技术，不要沦落为女人的玩物！投资自己，做 sigma 男人！~~

## 泛型

泛型的本质上将类型**参数化**，在使用时再传入具体的类型。这种参数类型可被用于类、接口和方法。

```java
// 指定一种类型的格式
<Type1>

// 指定多种类型的格式
<Type1, Type2>
```

比如 `ArrayList` ，如果未给定泛型，则：

```java
import java.util.ArrayList;

public class Demo {
    public static void main(String[] args) {
        /*
         * ArrayList lhs = new ArrayList();
         * 相当于：
         * ArrayList<Object> lhs = new ArrayList<>();
         * 或
         * ArrayList<?> lhs = new ArrayList<>();
         * 但后者不能添加元素。
        */
        ArrayList lhs = new ArrayList();
        lhs.add(114514);
        lhs.add(1919.810);
        lhs.add("Yarimasunei!");
        lhs.add(true);
        for (Object i : lhs)
            System.out.println(i);
    }
}
```

输出：

```txt
114514
1919.81
Yarimasunei!
true
```

为了接受**特定类型**的参数，且不在编写程序时指定，我们引入泛型的概念，让用户来指定。举例一个常见的使用场景：你编写了一个冒泡排序方法，但是由于参数（数组的类型）可能会五花八门，你不得不重写很多遍，非常的麻烦。而此时如果使用泛型......

```java
import java.util.Arrays;

public class Demo {
    public static void main(String[] args) {
        Integer[] a = { 1, 1, 4, 5, 1, 4 };
        Double[] b = { 114.514, 1919.810, -3.14 };
        String[] c = { "充Q币！", "为什么不充！", "你奶奶滴！" };
        Boolean[] d = { false, true, false, true };
        bubbleSort(a);
        bubbleSort(b);
        bubbleSort(c);
        bubbleSort(d);
        System.out.println(Arrays.toString(a));
        System.out.println(Arrays.toString(b));
        System.out.println(Arrays.toString(c));
        System.out.println(Arrays.toString(d));
    }

    /*
     * 未被“定义”的 Type 现在被视为接口。
     * 为了实现 compareTo() 方法，需要继承 Comparable 接口。
     * 但这种继承不是普通的继承，此时认为 Comparable 不仅是 Type 的终极父类，
     * 还能够享受 Comparable 的所有实现类（子类）提供的成员。
     * 相反的，如果要使 Comparable 作为下限，即 Type 能继承其与其所有父类，
     * 则可写 <Type super Comparable>。这也与我们熟知的继承有着相同的含义。
    */
    public static <Type extends Comparable> void bubbleSort(Type[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j + 1].compareTo(arr[j]) < 0) {
                    Type temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}

```

输出：

```txt
[1, 1, 1, 4, 4, 5]
[-3.14, 114.514, 1919.81]
[为什么不充！, 你奶奶滴！, 充Q币！]
[false, false, true, true]
```

可以看到，本来要重写很多次的方法，用一个泛型介入，就省去了很多工作量。上面是泛型方法的应用。如果我们要对多个方法批量使用泛型介入，则应当使用**泛型类/泛型接口**。

```java
public class RevolutionaryList<AnyType> {
    public void show(AnyType info) {
        System.out.println(info);
    }
}
```

```java
public interface PathbreakingList<AnyAnyType> {
    void show(AnyAnyType info);
}
```

## 可变参数

在一些时刻，我们想要根据需求向方法传入**不定数量**的参数，由此引入**可变参数**的概念。

下面是基本格式：

```java
public void function(int... a) {
    // a 变成了含传入的若干个 int 变量的数组
    // 可用 forEach 语句进行操作
}
```

比如说要编写方法，将传入的若干个数值相加，并返回和。

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println(sumUp((Integer) 1, (Integer) 2, (Integer) 3));
        System.out.println(sumUp((Double) 1.1, (Double) 1.2, (Double) 1.3));
    }

    public static <Type extends Number> String sumUp(Type... a) {
        double sum = 0;
        for (Type i : a)
            sum += i.doubleValue();
        return String.format("%.1f", sum);
    }
}
```

输出：

```txt
6.0
3.6
```

## Map 接口

`Map` 接口的形式：

```java
interface Map<Key, Value>
```

`Map` 将 Key 映射到 Value 的对象； `Map` 不包含重复的 Key；每个 Key 可以映射最多一个 Value。

`Map` 有实现类 `HashMap` ，也就是之前提到的**哈希表**。我们来看看它的使用特点：

```java
import java.util.HashMap;

public class Demo {
    public static void main(String[] args) {
        // 以长整型类为 Key，对应它们各自的字符串为 Value
        HashMap<Long, String> hm = new HashMap<>();

        // 对 Map 添加元素，需要使用 put(Key k, Value v)
        hm.put(114514L, "田所浩二");
        hm.put(100000L, "田所浩二");
        System.out.println(hm);
        hm.put(114514L, "田所浩八");
        hm.put(100001L, "田所浩八");
        System.out.println(hm);
    }
}
```

输出：

```txt
{100000=田所浩二, 114514=田所浩二}
{100001=田所浩八, 100000=田所浩二, 114514=田所浩八}
```

可见 `Map` 的元素也对集合的迭代顺序不做保证，并且元素唯一性只取决于 Key。当有同 Key 不同 Value 的多个元素被放进集合里时，新 Value 总会取代旧 Value。

接下来我们来了解一下 Map 的常用方法：

| 方法名                                 | 说明                                      |
| -------------------------------------- | ----------------------------------------- |
| Value put(Key k, Value v)              | 添加元素，返回被替换的 value              |
| Value remove(Object key)               | 删除 key 对于的 value，返回被删除的 value |
| void clear()                           | 清空集合                                  |
| boolean containsKey(Object key)        | 返回集合包含 key 的布尔值                 |
| boolean containsValue(Object value)    | 返回集合包含 value 的布尔值               |
| boolean isEmpty()                      | 返回集合为空的布尔值                      |
| int size()                             | 返回集合的长度                            |
| Value get(Object key)                  | 返回 key 对应的 value                     |
| Set\<Key> keySet()                     | 获取所有 key 的集合                       |
| Collection\<Value> values()            | 获取所有 value 的集合                     |
| Set\<Map.Entry<Key, Value>> entrySet() | 获取所有 key-value 对的集合               |

重点应用最后四个方法：

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Demo {
    public static void main(String[] args) {
        HashMap<String, String> couple = new HashMap<>();
        // 三对前受后攻（意味深
        couple.put("远野", "田所");
        couple.put("德川", "我修院");
        couple.put("铃木悠太", "高槻律");

        // 一种遍历 HashMap 的方案
        Set<String> zero = couple.keySet();
        for (String name : zero)
            System.out.println(couple.get(name) + " x " + name);

        // 另一种遍历 HashMap 的方案
        Set<Map.Entry<String, String>> cps = couple.entrySet();
        // 在 forEach 语句中，泛型可不加
        for (Map.Entry cp : cps)
            // Map.Entry 提供了两个方法 getKey() 和 getValue()
            System.out.println(cp.getValue() + " x " + cp.getKey());
    }
}
```

输出：

```txt
高槻律 x 铃木悠太
田所 x 远野
我修院 x 德川
高槻律 x 铃木悠太
田所 x 远野
我修院 x 德川
```

### 案例：后宫拓扑

用 `ArrayList` 包裹 `HashMap` ，存储几部热门后宫动漫的女主（Key）和男主（Value）的名字，并合理地输出。

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

public class Demo {
    public static void main(String[] args) {
        ArrayList<HashMap<String, String>> animes = new ArrayList<>();
        HashMap<String, String> dateALive = new HashMap<>(),
                swordArtOnline = new HashMap<>(),
                monsterMusumenoIruNichijou = new HashMap<>();

        // 约会大作战
        dateALive.put("夜刀神十香", "五河士道");
        dateALive.put("鸢一折纸", "五河士道");
        dateALive.put("五河琴里", "五河士道");
        animes.add(dateALive);

        // 刀剑神域
        swordArtOnline.put("结城明日奈", "桐谷和人");
        swordArtOnline.put("绫野珪子", "桐谷和人");
        swordArtOnline.put("筱崎里香", "桐谷和人");
        animes.add(swordArtOnline);

        // 魔物娘的同居日常
        monsterMusumenoIruNichijou.put("米娅", "来留主公人");
        monsterMusumenoIruNichijou.put("帕比", "来留主公人");
        monsterMusumenoIruNichijou.put("赛尔特蕾娅", "来留主公人");
        animes.add(monsterMusumenoIruNichijou);

        // 遍历输出
        for (HashMap anime : animes) {
            Set<String> girls = anime.keySet();
            for (String girl : girls)
                System.out.println(girl + " -> " + anime.get(girl));
            System.out.println("--------------------");
        }
    }
}
```

输出：

```txt
五河琴里 -> 五河士道
夜刀神十香 -> 五河士道
鸢一折纸 -> 五河士道
--------------------
结城明日奈 -> 桐谷和人
筱崎里香 -> 桐谷和人
绫野珪子 -> 桐谷和人
--------------------
帕比 -> 来留主公人
赛尔特蕾娅 -> 来留主公人
米娅 -> 来留主公人
--------------------
```

### 案例：统计字符串内各字符出现的次数

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        // 获取字符串
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        sc.close();

        // Character 表示每个字符，Integer 表示出现的次数
        HashMap<Character, Integer> countTable = new HashMap<>();
        for (int i = 0; i < str.length(); i++) {
            // 如果没有特定 key，就新建“次数”为 1 的元素
            if (countTable.get(str.charAt(i)) == null)
                countTable.put(str.charAt(i), 1);
            else {
                countTable.put(
                        str.charAt(i), countTable.get(str.charAt(i)) + 1);
            }
        }

        // 将 key 的集合转入有序集合中，便于排序
        ArrayList<Character> chars = new ArrayList<>(countTable.keySet());
        Collections.sort(chars);

        // 美观地输出
        for (Character thisChar : chars)
            System.out.println("[" + thisChar + "]出现了" + countTable.get(thisChar) + "次");
    }
}
```

输入：

```txt
nnnd, wsmbc?
```

输出：

```txt
[ ]出现了1次
[,]出现了1次
[?]出现了1次
[b]出现了1次
[c]出现了1次
[d]出现了1次
[m]出现了1次
[n]出现了3次
[s]出现了1次
[w]出现了1次
```

## Collections 类

`Collections` 类中包含许多对集合操作的静态方法。

我们给出几个常用方法：

| 方法名                                                           | 说明                               |
| ---------------------------------------------------------------- | ---------------------------------- |
| static \<T extends Comparable\<? super T>> void sort(List\<T> l) | 将指定的列表升序排序               |
| static void reverse(List\<?> l)                                  | 反转指定列表中元素的顺序           |
| static void shuffle(List\<?> l)                                  | 使用默认的随机源随机排列指定的列表 |

### 精选案例：斗地主发牌器

```java
package com.penyo.chinesepoker;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.TreeSet;

public class Poker {
    /*
     * 这里用三种集合存储扑克信息。
     * LinkedHashMap 保存“新牌”，ArrayList 保存“拆封牌”，TreeSet 保存“到手牌”。
     * String 表示牌名，Integer 表示伪权重（真权重需要除以4）。
     * TreeSet 的比较器被重写，单一依照伪权重降序排序。
     */
    private LinkedHashMap<String, Integer> poker = new LinkedHashMap<>();
    private ArrayList<String> pokerName;
    private TreeSet<String> yourPoker = new TreeSet<>(new Comparator<String>() {
        public int compare(String card1, String card2) {
            return poker.get(card2) - poker.get(card1);
        }
    });

    // 与洗牌相关的一些变量
    private boolean isShufflePattern = true, isShuffled = false;

    // 无参构造器，只进行初始化
    public Poker() {
        initialize();
    }

    // 带参构造器控制是否要在一开始就洗牌
    public Poker(boolean needShuffle) {
        initialize();
        if (needShuffle)
            shuffle();
    }

    // 产生一副“新牌”并“拆开”
    public void initialize() {
        String[] values = { "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2" },
                suits = { "黑桃", "红桃", "方块", "梅花" };
        int weight = 0;
        for (String value : values)
            for (String suit : suits)
                poker.put(suit + value, weight++);

        // B-Joker 即“小鬼”，R-Joker 即“大鬼”
        poker.put("B-Joker", weight);
        weight += 4;
        poker.put("R-Joker", weight);
        pokerName = new ArrayList<>(poker.keySet());
    }

    // 洗洗更健康
    public void shuffle() {
        if (isShufflePattern)
            Collections.shuffle(pokerName);
        isShuffled = true;
    }

    // 设置洗牌/不洗牌玩法
    public void setShufflePattern(boolean isShufflePattern) {
        this.isShufflePattern = isShufflePattern;
    }

    // 发牌，seatCode = 0 或 1 或 2 表示地主或两个农民
    public TreeSet getPoker(boolean needShuffle, int seatCode) {
        if (needShuffle)
            yourPoker.clear();
        if (isShuffled == false)
            shuffle();
        for (int i = seatCode, piece = 0; piece < 17; i += 3, piece++)
            yourPoker.add(pokerName.get(i));
        if (seatCode == 0) {
            yourPoker.add(pokerName.get(51));
            yourPoker.add(pokerName.get(52));
            yourPoker.add(pokerName.get(53));
        }
        return yourPoker;
    }

    // 检视未打乱的原始的牌
    @Override
    public String toString() {
        StringBuilder originalPokerInfo = new StringBuilder("[");
        ArrayList<String> originalPoker = new ArrayList<>(poker.keySet());
        for (String thisPoker : originalPoker)
            originalPokerInfo.append(thisPoker + ", ");
        originalPokerInfo.deleteCharAt(originalPokerInfo.length() - 1).deleteCharAt(originalPokerInfo.length() - 1)
                .append("]");
        return originalPokerInfo.toString();
    }
}
```

```java
package com.penyo.chinesepoker;

import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        System.out.println("您想当地主吗？\nA. 是\tB. 否");
        Scanner sc = new Scanner(System.in);
        String choice = sc.nextLine().toUpperCase();
        Poker play = new Poker(true);
        if (choice.equals("A"))
            System.out.println(play.getPoker(false, 0));
        else
            System.out.println(play.getPoker(false, 1));
    }
}
```

输入：

```txt
B
```

输出：

```txt
[B-Joker, 方块2, 红桃A, 黑桃A, 方块K, 红桃K, 黑桃K, 方块J, 红桃10, 黑桃10, 梅花8, 红桃8, 红桃7, 黑桃7, 方块5, 梅花3, 红桃3]
```
