# 多线程

我们需要先了解几个概念。

进程：是正在运行的程序。

- 是系统进行资源分配的调用的独立单位。
- 每一个进程都有它自己的内存空间和系统资源。

线程：是进程中的单个顺序控制流，是一条执行路径。

- 单线程：一个进程如果只有一条执行路径，则称之为单线程程序。
- 多线程：一个进程如果有多条执行路径，则称之为多线程程序。

## Thread 类

实现多线程有三种实现方式，这里先说第一种：
定义一个*类*继承 `Thread` 类

1. 在*类*中重写 run() 方法
   - 为什么要重写：run() 用来封装被线程执行的代码
2. 实例化*类*
3. **调用*类*的 start() 方法启动线程**
   - 为什么不调用 run() 方法：JVM 会自动调用 run()

Thread 类中设置和获取线程名称的方法：

| 方法名                    | 说明                    |
| ------------------------- | ----------------------- |
| void setName(String name) | 将此线程的名称改为 name |
| String getName()          | 返回线程的名称          |

如果需要获取当前线程，则使用 `Thread.currentThread()` 方法。

_WorkerThread.java_：

```java
public class WorkerThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 1000; i++)
            // this 也可以换成 Thread.currentThread()
            System.out.println(this.getName() + ": " + i);
    }
}
```

_Demo.java_：

```java
public class Demo {
    public static void main(String[] args) {
        new WorkerThread().start();
        new WorkerThread().start();
    }
}
```

输出切片：

```txt
Thread-1: 777
Thread-1: 778
Thread-0: 755
Thread-0: 756
Thread-1: 779
Thread-1: 780
Thread-1: 781
Thread-1: 782
Thread-0: 757
Thread-0: 758
Thread-0: 759
Thread-0: 760
```

## 线程调度模型

众所周知，CPU 核心的数量才能真正地决定线程的数量。我们所谓的多线程只是模拟出来的而已，即单个/少数核心要分配给多个线程使用。那这个模拟过程到底是怎么实现的呢？

线程有两种调度模型：

- 分时调度：所有线程（高速）轮流使用 CPU，平均分配每个线程占有 CPU 的时间片。
- 抢占调度：优先让优先级高的线程使用 CPU（占有更多的时间片，或者说**提高了获得时间片的概率**），如果线程的优先级相同，**则随机选择一个**。

Java 使用的是后者。也就是说，我们可以通过设置线程优先级来实现特定需求。

| 方法名                                  | 说明               |
| --------------------------------------- | ------------------ |
| final int getPriority()                 | 返回该线程的优先级 |
| final void setPriority(int newPriority) | 设置该线程的优先级 |

如果没有特别设置，**线程优先级默认为 5**；**且最低为 1，最高为 10。**

## 线程控制

| 方法名                         | 说明                                                               |
| ------------------------------ | ------------------------------------------------------------------ |
| static void sleep(long millis) | 使当前正在执行的线程暂停执行指定毫秒数                             |
| void join()                    | 等待当前线程死亡                                                   |
| void setDaemon(boolean on)     | 将此线程标记为**守护线程**，当运行的线程都是守护线程时，JVM 将退出 |

我们重点演示后两种方法。先演示 `join()`：

_WorkerThread.java_：

```java
public class WorkerThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 10000; i++)
            System.out.println(this.getName() + ": " + i);
    }
}
```

_Demo.java_：

```java
public class Demo {
    public static void main(String[] args) {
        WorkerThread t1 = new WorkerThread();
        WorkerThread t2 = new WorkerThread();

        t1.setName("Notch");
        t2.setName("Jeb");

        // 迫使 t2 在 t1 完全结束后才能开始
        t1.start();
        try {
            t1.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        t2.start();
    }
}
```

输出切片：

```txt
Notch: 997
Notch: 998
Notch: 999
Jeb: 0
Jeb: 1
Jeb: 2
```

演示 `setDaemon()`：

_WorkerThread.java_：

```java
public class WorkerThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 10000; i++)
            System.out.println(this.getName() + ": " + i);
    }
}
```

_Demo.java_：

```java
public class Demo {
    public static void main(String[] args) {
        WorkerThread t1 = new WorkerThread();
        WorkerThread t2 = new WorkerThread();

        // 新世纪轴心国
        Thread.currentThread().setName("美国");
        t1.setName("日本");
        t2.setName("乌克兰");

        // 如果美爹寄了，俩小弟应该陪葬，所以设置守护线程
        t1.setDaemon(true);
        t2.setDaemon(true);
        t1.start();
        t2.start();

        // 美爹（主线程）到这基本上就玩完了，小弟直接无
        for (int i = 0; i < 10; i++)
            System.out.println(this.getName() + ": " + i);
    }
}
```

输出切片：

```txt
美国: 98
乌克兰: 213
日本: 104
乌克兰: 214
乌克兰: 215
美国: 99
乌克兰: 216
乌克兰: 217
日本: 105
```

我们发现，美国“跑”到 99 之后，尽管日本和乌克兰还有很多任务没有执行，但是不得不终止。这是因为所有的非守护线程（在这里就是只有主线程）都结束了。

## Runnable 接口

实现多线程的第二种办法，定义一个*类*实现 `Runnable` 接口

1. 在*类*中重写 run() 方法
2. 实例化*类*
3. 实例化 Thread 类，以*类*作为其构造器参数
   - 注：Thread 也有含两个参数的构造器，第二个参数是线程名
4. 调用*类*的 start() 方法启动线程

_WorkerThread.java_：

```java
public class WorkerThread implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 10000; i++)
            // 注意，getName() 是 Thread 类中的方法，Runnable 中并没有
            // 所以不可用 this.getName()
            System.out.println(Thread.currentThread.getName() + ": " + i);
    }
}
```

_Demo.java_：

```java
public class Demo {
    public static void main(String[] args) {
        WorkerThread t1 = new WorkerThread();
        WorkerThread t2 = new WorkerThread();

        Thread tt1 = new Thread(t1);
        Thread tt2 = new Thread(t2);

        tt1.start();
        tt2.start();
    }
}
```

## 线程同步与安全

多线程程序在运行的时候会发生**数据安全问题**。比如大妈们蜂拥而进超市，抢免费鸡蛋，如果有 n 个鸡蛋，限量赠出 100（n >> 100）个，那么大概率最后送出一百零几个。即使工作人员真的很认真细致。

而当发生以下至少一个情况时，数据安全问题就不可避免：

- 多线程环境
- 共享数据
- 多条语句操作共享数据

由此，我们引入**同步**（`synchronized`），使得线程在被同步的区域**被迫异步**：

```java
synchronized (Object o) {
    // 操作共享数据
}
```

这可以同时破坏之前提到的三种情况，解决了多线程的数据安全问题。但弊端是每个线程都会耗费时间去准备异步进行，耗费硬件资源、降低程序运行效率。

_GetFreeEggs.java_：

```java
public class GetFreeEggs implements Runnable {
    final int EGG_AMOUNT = 100;
    int eggAmount = 100;

    Object o = new Object();

    @Override
    public void run() {
        while (true)
            synchronized (o) {
                if (eggAmount > 0)
                    System.out.println(
                            Thread.currentThread().getName() +
                                    "抢到了第" + (EGG_AMOUNT - eggAmount-- + 1) + "个鸡蛋！");

            }
    }
    // 你也可以这样写：同步代码块变成了同步方法，同时免去了新建成员变量的麻烦
    // @Override
    // public synchronized void run() {
    //     while (true)
    //             if (eggAmount > 0)
    //                 System.out.println(
    //                         Thread.currentThread().getName() +
    //                                 "抢到了第" + (EGG_AMOUNT - eggAmount-- + 1) + "个鸡蛋！");
    // }
}
```

_Demo.java_：

```java
public class Demo {
    public static void main(String[] args) {
        GetFreeEggs gfe = new GetFreeEggs();

        // 非常不幸，大妈一个也抢不到捏
        new Thread(gfe, "黄牛1").start();
        new Thread(gfe, "黄牛2").start();
        new Thread(gfe, "黄牛3").start();
        new Thread(gfe, "黄牛4").start();
    }
}
```

同步方法的锁指向 `this` ，即本对象。同步静态方法的锁指向 _GetFreeEggs_.`class` ，即本类。

接下来了解几个线程安全的类，它们的方法都是**同步**的：

- StringBuffer
  - 从 JDK 5 开始，被 StringBuilder 替代。通常应该用 StringBuilder 类，因为它支持所有相同的操作，但它更快，因为不支持同步
- Vector
  - 从 JDK 1.2 开始，该类改进了 List 接口，使其成为了集合类的成员。与新的集合实现不同，Vector 被同步。如果不需要线程安全的实现，应当使用 ArrayList
  - **实践中一般不使用 Vector，而是借助 Collections 类中的方法：**
    **static \<T> List\<T> synchronizedList(List\<T> list)**
- HashTable
  - 从 JDK 1.2 开始，该类改进了 Map 接口，使其成为了集合类的成员。与新的集合实现不同，Hashtable 被同步。如果不需要线程安全的实现，应当使用 HashMap
  - **实践中一般不使用HashTable，而是借助Collections类中的方法：**
    **static \<K, V> Map\<K, V> synchronizedMap(Map\<K, V> m)**

## Lock 接口

为了明确线程锁作用的范围，JDK 1.5 提供了一个新的锁， `Lock` 。

实例化 `Lock` 需要接口多态：

```java
Lock l = new ReentrantLock();
```

对上文抢鸡蛋代码进行改进：

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class GetFreeEggs implements Runnable {
    final int EGG_AMOUNT = 100;
    int eggAmount = 100;

    Lock l = new ReentrantLock();

    @Override
    public void run() {
        while (true)
            try {
                // 锁定
                l.lock();
                if (eggAmount > 0)
                    System.out.println(
                            Thread.currentThread().getName() +
                                    "抢到了第" + (EGG_AMOUNT - eggAmount-- + 1) + "个鸡蛋！");
            } finally {
                // 即使抢鸡蛋中出现了故障，最终也依旧正常开锁
                l.unlock();
            }
    }
}
```

### 案例：有求必应

用多线程模拟甲方和乙方之间的关系：甲方只要提出需求，乙方就得立即改代码，非常的折寿。

_Need.java_：

```java
public class Need {
    boolean isSpare = true;
    int count = 1;

    public synchronized void submit() {
        if (!isSpare) {
            try {
                wait();
            } catch (Exception e) {
            }
        }
        isSpare = false;
        System.out.println("已提出第" + count++ + "个需求！");
        notifyAll();
    }

    public synchronized void fix() {
        if (isSpare) {
            try {
                wait();
            } catch (Exception e) {
            }
        }
        isSpare = true;
        System.out.println("已响应需求。");
        notifyAll();
    }
}
```

_Submit.java_：

```java
public class Submit implements Runnable {
    Need n;

    public Submit(Need n) {
        this.n = n;
    }

    @Override
    public void run() {
        for (int i = 0; i < 114514; i++)
            n.submit();
    }
}
```

_Fix.java_：

```java
public class Fix implements Runnable {
    Need n;

    public Fix(Need n) {
        this.n = n;
    }

    @Override
    public void run() {
        while (true)
            n.fix();
    }
}
```

_Demo.java_：

```java
public class Demo {
    public static void main(String[] args) {
        Need n = new Need();

        Submit s = new Submit(n);
        Fix f = new Fix(n);

        Thread ts = new Thread(s);
        Thread tf = new Thread(f);

        ts.start();
        tf.start();
    }
}
```

输出切片：

```txt
已提出第1个需求！
已响应需求。
已提出第2个需求！
已响应需求。
已提出第3个需求！
已响应需求。
```

## Callable 接口

相较于 `Runnable` 接口， `Callable` 接口的实现能在线程结束后**返回特定对象**。

通过 `Callable` 和 `Future` 创建线程：

1. 创建 Callable 接口的实现类，并实现 call() 方法，该 call() 方法将作为线程执行体，并且有返回值。
2. 创建 Callable 实现类的实例，使用 FutureTask 类来包装 Callable 对象，该 FutureTask 对象封装了该 Callable 对象的 call() 方法的返回值。
   - 为什么要进行包装：Thread 构造器不接受 Callable 对象，但接受 FutureTask 对象（间接继承 Runnable）。
3. 使用 FutureTask 对象作为 Thread 对象的 target 创建并启动新线程。
4. 调用 FutureTask 对象的 get() 方法来获得子线程执行结束后的返回值。

简单演示一下：

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class Demo {
    public static void main(String[] args) {
        // 若要返回长整型对象，则泛型处填写 Long
        FutureTask<Long> ft = new FutureTask<>(new Callable<Long>() {
            // call() 是 run() 的增强版
            @Override
            public Long call() throws Exception {
                long sum = -1919810;
                for (int i = 0; i < 114514; i++)
                    sum += i;
                return sum;
            }
        });
        new Thread(ft, "恶臭线程").start();

        // 按照逻辑，get() 必须要在 start() 后出现，否则程序将无限阻塞
        try {
            System.out.println(ft.get());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

输出：

```txt
6554751031
```

创建线程的三种方式的对比：

- 采用实现 Runnable、Callable 接口的方式创建多线程时，线程类只是实现了 Runnable 接口或 Callable 接口，还可以继承其他类。
- 使用继承 Thread 类的方式创建多线程时，编写简单，如果需要访问当前线程，则无需使用 Thread.currentThread() 方法，直接使用 this 即可获得当前线程。
