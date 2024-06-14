# TypeScript 高级类型

## 类

在 TS 中，`class` 不仅可以用于定义类，还定义了一个类型。

```ts
class Person {
  name: string;
  age: 18; // 设置默认值，类型标注则可以省略
  discription; // 不指定类型，也不令其推导，则为 any 型

  constructor(name: string, age: number) {
    // 构造器无返回值，即不用指定类型
    this.name = name;
    this.age = age;
  }
}
```

类可以使用 `extends` 继承其他类，或者使用 `impleaments` 实现接口（必须实现接口中定义的所有成员）。

类成员可用修饰符控制可见性，默认为 `public`，还可写 `protected`（仅对类成员和子类成员可见，对实例或无关类不可见）和 `private`。

:::details 你知道吗：私有类成员该用 `protected` 还是 `#` 修饰？
都可以，前者是 TS 独有的修饰符，后者是 ES 标准规定的修饰符。但后者影响成员名。
:::

类**属性**可使用 `readonly` 表示只读并固定类型（若设置了属性的初始值，则该属性类型为字面量类型，可能会与构造器产生冲突），**构造器以外**均不可修改该成员值。接口或者对象的成员也可以用该关键字修饰（初始化赋值不受影响）。

## 类型兼容

在下面的演示中，操作是合法的：

```ts
class A {
  member: number;
}
class B {
  member: number;
}
const a: A = new B();
```

A 与 B 之间并没有任何逻辑联系（继承、实现、组合等），但 B 的实例却可以是 A 类型的。这是因为 TS 采用**结构化类型系统**（Structure Type System），或称作**鸭子类型**（Duck Typing），类型检查关注的是值所具有的形状（名称、类型）。即，若两个对象具有相同的形状，则认为它们是同一种类型。

与之相对的是**标明类型系统**（Nominal Type System）。Java 采用的就是 NTS，两个类因为名称不同，故类型不兼容。

利用这种特性，我们可以实现**多态性**：

```ts
class Animal {
  eat(): void {}
}
class Dog {
  eat(): void {}
  play(): void {}
}
const husky: Animal = new Dog();
```

即 _husky_ 按照 Dog 的类型来实例化，按照 Animal 的类型来检查。由于 Dog 的定义是 Animal 的超集，因此检查是不会出错的。也可以把 Animal 转化为接口，结果是不变的。

类型兼容对接口、函数等也适用。

## 交叉类型

当两个类/接口不存在逻辑关系，但仍有第三类与两者有继承关系时，可以使用**组合**来构成**交叉类型**：

```ts
class Human {
  height: number;
  weight: number;
}
class Career {
  discription: string;
  salary: number;
}
type Student = Human & Career;
```

若两个类/接口中有重名的成员，属性会**不可达**，方法会根据参数情况确定具体调用谁（方法重载）。若方法参数也完全一样，则选用先出现的一个。

:::tip
交叉类型不能替代继承，因为交叉类型需要用类型接收，继承类用类接收。
:::

## 泛型

**泛型**可以在**保证类型安全**的前提下，让函数/接口/类与多种类型一起工作，从而实现**复用**。

若不使用泛型，想要实现接收多种参数需要屏蔽类型检查：

```ts
function fn(argu: any): any {
  return argu;
}
```

创建泛型函数：

```ts
function fn<Type>(argu: Type): Type {
  return argu;
}
```

这样用户在调用的时候，_Type_ 就能化为参数的类型：

```ts
const returnMe = <T>(argu: T): T => {
  return argu;
};
console.log(returnMe(new Date())); // 此时 T = Date
console.log(returnMe<number>(1)); // 为了防止 T = 1，需要显式指定 T = number
```

为了指定泛型与接口的逻辑关系，可以使用 `extends`：

```ts
interface I {
  member: number;
}
const returnMe = <T extends I>(argu: T): T => {
  return argu;
};
```

## keyof

## 索引签名类型

## 索引查询类型

## 映射类型
