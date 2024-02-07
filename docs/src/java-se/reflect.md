# 反射

> _为了实现更强大的功能，你不得不选择破坏规则。除非......你就是规则的缔造者。_

**反射**（Reflection）指程序可以访问、检测和修改它本身状态或行为的一种能力。

程序集包含模块，而模块包含类型，类型又包含成员。反射则提供了封装程序集、模块和类型的对象。我们可以使用反射动态地创建类型的实例，将类型绑定到现有对象，或从现有对象中获取类型。然后，可以调用类型的方法或访问其字段和属性。

优点：

- 反射提高了程序的**灵活性**和扩展性。
- **降低耦合性**，提高自适应能力。
- 它允许程序创建和**控制任何类的对象**，无需提前硬编码目标类。

缺点：

- 性能问题：使用反射基本上是一种解释操作，用于字段和方法接入时要远慢于直接代码。因此反射机制主要应用在对灵活性和拓展性要求很高的系统框架上，普通程序不建议使用。
- 使用反射会模糊程序内部逻辑；程序员希望在源代码中看到程序的逻辑，**反射却绕过了源代码的技术**，因而会带来维护的问题，反射代码比相应的直接代码更复杂。

反射有下列用途：

- 它允许在运行时查看特性（attribute）信息。
- 它允许审查集合中的各种类型，以及实例化这些类型。
- 它允许延迟绑定的方法和属性（property）。
- 它允许在运行时创建新类型，然后使用这些类型执行一些任务。

## 类加载与类加载器

当程序要使用某个类时，如果该类还被加载未到内存中，则系统会通过**类的加载、类的连接、类的初始化**这三个步骤来对类进行初始化。如果不出现意外情况，JVM 将会连续完成这三个步骤，所以有时也把这三个步骤统称为**类加载**或者**类初始化**。

- 类的加载
  - 指将 .class 文件读入内存，并为之建立一个 java.lang.Class 对象。
  - 任何类被使用时，系统都会为之建立一个 java.lang.Class 对象。
- 类的连接
  - 验证阶段：用于检验被加载的类是否有正确的内部结构,并和其他类协调一致
  - 准备阶段：负责为类的类变量分配内存，并设置默认初始化值。
  - 解析阶段：将类的二进制数据中的符号引用替换为直接引用。
- 类的初始化
  - 在该阶段，主要就是对类变量进行初始化：
    - 假如类还未被加载和连接， 则程序先加载并连接该类
    - 假如该类的直接父类还未被初始化， 则先初始化其直接父类
    - 假如类中有初始化语句， 则系统依次执行这些初始化语句
      _注意：在执行第2个步骤的时候，系统对直接父类的初始化步骤也遵循初始化步骤1-3。_

类的初始化时机：

- 创建类的实例。
- 调用类的类方法。
- 访问类或者接口的类变量，或者为该类变量赋值。
- 使用反射方式来强制创建某个类或接口对应的 java.lang.Class 对象。
- 初始化某个类的子类。
- 直接使用 java.exe 命令来运行某个主类。

类加载器的作用：

- 负责将 .class 文件加载到内存中，并为之生成对应的 java.lang.Class 对象。
- 虽然我们不用过分关心类加载机制，但是了解这个机制我们就能更好的理解程序的运行。

JVM 的类加载机制：

- 全盘负责：就是当一个类加载器负责加载某个 Class 时，该 Class 所依赖的和引用的其他 Class 也将由该类加载器负责载入，除非显示使用另外一个类加载器来载入。
- 父类委托：就是当一个类加载器负责加载某个 Class 时，先让父类加载器试图加载该 Class，只有在父类加载器无法加载该类时才尝试从自己的类路径中加载该类。
- 缓存机制：保证所有加载过的 Class 都会被缓存，当程序需要使用某个 Class 对象时，类加载器先从缓存区中搜索该 Class，只有当缓存区中不存在该 Class 对象时，系统才会读取该类对应的二进制数据，并将其转换成 Class 对象，存储到缓存区。

`ClassLoader` 是负责加载类的对象。

Java 运行时具有以下内置类加载器：

- Bootstrap class loader：它是虚拟机的内置类加载器，通常表示为 null，并且没有父 null。
- Platform class loader：平台类加载器可以看到所有平台类，平台类包括由平台类加载器或其祖先定义的 Java SE 平台 API，其实现类和 JDK 特定的运行时类。
- System class loader：它也被称为应用程序类加载器，与平台类加载器不同。系统类加载器通常用于定义应用程序类路径，模块路径和 JDK 特定工具上的类。

类加载器的继承关系：`System` 的父加载器为 `Platform` ，而 `Platform` 的父加载器为 `Bootstrap` 。

`ClassLoader` 中的两个方法：

| 方法名                                    | 说明                       |
| ----------------------------------------- | -------------------------- |
| static ClassLoader getSystemClassLoader() | 返回用于委派的系统类加载器 |
| ClassLoader getParent()                   | 返回父类加载器进行委派     |

## 获取构造器

我们要想通过反射去使用一个类，首先我们要获取到该类的字节码文件对象，也就是类型为 `Class` 类型的对象，这里我们提供三种方式获取 Class 类型的对象：

- 使用类的 class 属性来获取该类对应的 Class 对象。举例：Student.class 将会返回 Student 类对应的 Class 对象。
- 调用对象的 getClass() 方法，返回该对象所属类对应的 Class 对象。该方法是 Object 类中的方法，所有的 Java 对象都可以调用该方法。
- 使用 Class 类中的静态方法 forName(String className)，该方法需要传入字符串参数，该字符串参数的值是某个类的全路径，也就是完整包名的路径。

`Class` 类中用于获取构造方法的方法：

| 方法名                                                             | 说明                           |
| ------------------------------------------------------------------ | ------------------------------ |
| Constructor<?> [] getConstructors()                                | 返回所有公共构造方法对象的数组 |
| Constructor<?> [] getDeclaredConstructors()                        | 返回所有构造方法对象的数组     |
| Constructor\<T> getConstructor(Class<?>... parameterTypes)         | 返回单个公共构造方法对象       |
| Constructor\<T> getDeclaredConstructor(Class<?>... parameterTypes) | 返回单个构造方法对象           |

`Constructor` 类中用于创建对象的方法：

| 方法名                            | 说明                       |
| --------------------------------- | -------------------------- |
| T newInstance(Object... initargs) | 根据指定的构造方法创建对象 |

## 获取成员

`Class` 类中用于获取成员变量的方法：

| 方法名                              | 说明                           |
| ----------------------------------- | ------------------------------ |
| Field[] getFields()                 | 返回所有公共成员变量对象的数组 |
| Field[] getDeclaredFields()         | 返回所有成员变量对象的数组     |
| Field getField(String name)         | 返回单个公共成员变量对象       |
| Field getDeclaredField(String name) | 返回单个成员变量对象           |

`Field` 类中用于给成员变量赋值的方法：

| 方法名                             | 说明                              |
| ---------------------------------- | --------------------------------- |
| void set(Object obj, Object value) | 给 obj 对象的成员变量赋值为 value |

`Class` 类中用于获取成员方法的方法：

| 方法名                                                             | 说明                                       |
| ------------------------------------------------------------------ | ------------------------------------------ |
| Method[] getMethods()                                              | 返回所有公共成员方法对象的数组，包括继承的 |
| Method[] getDeclaredMethods()                                      | 返回所有成员方法对象的数组，不包括继承的   |
| Method getMethod(String name, Class<?>... parameterTypes)          | 返回单个公共成员方法对象                   |
| Method getDeclaredMethod(String name, Class <?>... parameterTypes) | 返回单个成员方法对象                       |

`Method` 类中用于调用成员方法的方法：

| 方法名                                    | 说明                                                       |
| ----------------------------------------- | ---------------------------------------------------------- |
| Object invoke(Object obj, Object... args) | 调用 obj 对象的成员方法，参数是 args，返回值是 Object 类型 |

### 精选案例：可 JSON 化接口

利用反射技术实现 interface JSONable，要求实现其的 **JavaBean** 可以 JSON 的格式输出（调用 `stringify()`）。

```java
import java.lang.reflect.Field;
import java.util.List;
import java.util.Objects;

public interface JSONable {
    default public String stringify() {
        StringBuilder jsonT1 = new StringBuilder();
        try {
            Field[] fs = this.getClass().getDeclaredFields();

            for (Field f : fs) {
                // 设置私有成员可访问
                f.setAccessible(true);

                StringBuilder valueJSON = new StringBuilder();
                Object value = f.get(this);
                if (value instanceof Integer v)
                    valueJSON = new StringBuilder(v.toString());
                else if (value instanceof Double v)
                    valueJSON = new StringBuilder(v.toString());
                else if (value instanceof Boolean v)
                    valueJSON = new StringBuilder(v.toString());
                else if (value instanceof String v)
                    valueJSON = new StringBuilder("\"" + v + "\"");
                else if (value instanceof List<?> v) {
                    StringBuilder jsonT2 = new StringBuilder();
                    for (var o : v)
                        jsonT2.append(o.toString()).append(", ");

                    String s = jsonT2.toString();
                    if (s.length() > 2)
                        valueJSON.append("[").append(s, 0, s.length() - 2).append("]");
                    else
                        valueJSON.append("[]");
                }

                jsonT1.append("\"").append(f.getName()).append("\": ").append(valueJSON).append(", ");
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            return null;
        }

        String s = jsonT1.toString();
        if (s.length() > 2)
            return "{ " + s.substring(0, s.length() - 2) + " }";
        return "{ }";
    }
}
```
