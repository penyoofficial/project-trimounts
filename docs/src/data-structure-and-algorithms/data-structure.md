# 数据结构综合

本章案例中涉及大量 Penyo 自行编写的库，你可以在这里总览它们（按出现顺序排序）。

| 文件名                  | 描述     | 优化方向 |
| ----------------------- | -------- | -------- |
| LinkedList.h            | 单向链表 | 字符串   |
| DoublyLinkedList.h      | 双向链表 | 字符串   |
| SequenceStack.h         | 顺序栈   | 字符     |
| CircularlyLinkedQueue.h | 循环队列 | 整型值   |
| ArrayString.h           | 顺序串   | 字符串   |

此外，所有库的逻辑父库*PenyoDS.h*如下：

```C
#include <stdlib.h>
#include <malloc.h>
#define bool int
#define true 1
#define false 0
#define MAXSIZE 64
```

## 抽象数据类型

> 抽象：是指抽取出事物具有的普遍性的本质。它要求抽出问题的特征而忽略非本质的细节，是对具体事物的一个概括。抽象是一种思考问题的方式，它隐藏了繁杂的细节。
> 数据类型：是指一组性质相同的值的集合及定义在此集合上的一些操作的总称。如整型、浮点型、字符型等。

在 C 中，按照取值的不同，数据类型可以分为两种类型：

- **原子类型**：不可再分解的基本类型，例如整型、浮点型、字符型等。
- **结构类型**：由若干个类型组合而成，是**可以再分解**的，例如数组、结构体等。

我们对已有的数据类型进行抽象，就有了**抽象数据类型**（Abstract Data Type）：是指一个数学模型及定义在该模型上的一组操作。其定义仅取决于它的一组逻辑特性，而与其在计算机内部如何表示和实现无关。也就是说，**我们只抽象数据类型的数学特性**。

## 线性表

**线性表**（List）是由零个或多个数据元素组成的有限序列。

_你需要注意：_

- 线性表是一个序列，元素之间存在“先来后到”的关系。
- 若元素个数为 0，则称之为**空表**。
- 若元素存在多个，则第一个元素无**前驱**（直接前驱元素），最后一个元素无**后继**（直接后继元素），其他元素**有且只有**一个前驱和后继。
- 线性表强调是有限的，是因为计算机只能处理有限的元素。

线性表有两种物理存储结构：**顺序**和**链式**。

顺序存储（顺序表）的结构可以表示为：

```C
#define MAXSIZE 64 // 线性表最大存储容量

typedef int ElemType;
typedef struct {
    ElemType data[MAXSIZE]; // 存储空间起始位置
    int length; // 线性表当前长度
} ArrayList;
```

- 优点：
  - 无需为表示表中元素之间的逻辑关系而增加额外的存储空间。
  - 可以快速地获取表中任意位置的元素。
- 缺点：
  - 插入和删除需要移动大量元素（最恶情况是 $O(n)$）。
  - 当线性表长度变化较大时，难以确定存储空间的容量。
  - 难以充分利用内存空间，碎片化太严重。

> 在链表中，我们把存储数据元素信息的域称为**数据域**，把存储直接后继位置的域称为**指针域**。指针域中存储的信息称为**指针或链**。这两部分信息组成的数据元素称为**结点**（Node）或**存储映像**。链表有一个**头指针**变量，它存放一个地址，该地址指向**头结点**，最后一个结点的指针指向 NULL。

链式存储（链表）的结构可以表示为：

```C
typedef struct {
    ElemType data; // 数据域
    struct Node *next; // 指针域
} Node, *LinkedList;
```

我们设计链表一般要考虑**创建、插入、删除、修改和查找**这些基本功能，即**增删改查**。以后在设计数据结构时，也需要包含这些基本功能。

在此只介绍**单向链表**，你可以自主学习**双向链表**（既可向前索引，也可向后索引）和**循环链表**（首尾相连）。

## 案例：插入与删除

设计算法：

- 删除**单向链表**中值为*key*的所有结点；
- 删除单向链表中所有值**重复**的结点，使得所有结点的值都不相同。

_./LinkedList.h_：

```C
#include "PenyoDS.h"

// 定义复合数据类型：节点
typedef struct
{
    char *data;        // 数据域
    struct Node *next; // 指针域
} Node;

// 定义复合数据类型：单向链表
typedef struct
{
    Node *head, *tail; // 头、尾节点指针
    int length;        // 有效长度
} LinkedList;

// 获取单向链表的空白实例
LinkedList *getInstance()
{
    Node *head = (Node *)malloc(sizeof(Node));
    head->next = NULL;
    LinkedList *ll = (LinkedList *)malloc(sizeof(LinkedList));
    ll->tail = ll->head = head, ll->length = 0;
    return ll;
}

// 向当前单向链表添加元素
bool add(LinkedList *ll, char *data)
{
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = data, n->next = NULL;
    (ll->tail)->next = n;
    ll->tail = n, ll->length++;
    return true;
}

// 向当前单向链表插入元素
bool insert(LinkedList *ll, char *data, int index)
{
    if (index < 1 || index > ll->length)
        return false;
    Node *n = (Node *)malloc(sizeof(Node));
    Node *p = ll->head, *q = p->next;
    for (int i = 1; q != NULL; i++, p = p->next, q = q->next)
        if (i == index)
        {
            n->data = data, n->next = q;
            p->next = n;
            ll->length++;
            break;
        }
    return true;
}

// 根据数据从当前单向链表中删除元素
bool del(LinkedList *ll, char *data)
{
    for (Node *p = ll->head, *q = p->next; q != NULL; p = p->next, q = q->next)
        if (q->data == data)
        {
            if (q->next == NULL)
                p->next = NULL, ll->tail = p;
            else
                p->next = q->next;
            free(q);
            ll->length--;
            del(ll, data);
            return true;
        }
    return false;
}

// 根据索引从当前单向链表中删除元素
bool delByIndex(LinkedList *ll, int index)
{
    if (index < 1 || index > ll->length)
        return false;
    Node *p = ll->head, *q = p->next;
    for (int i = 1; q != NULL; i++, p = p->next, q = q->next)
        if (i == index)
        {
            if (q->next == NULL)
                p->next = NULL, ll->tail = p;
            else
                p->next = q->next;
            free(q);
            ll->length--;
            return true;
        }
    return false;
}

// 根据数据修改当前单向链表中的元素
bool alter(LinkedList *ll, char *old, char *data)
{
    bool isChanged = false;
    for (Node *p = ll->head, *q = p->next; q != NULL; p = p->next, q = q->next)
        if (q->data == old)
        {
            q->data = data;
            isChanged = true;
        }
    return isChanged;
}

// 根据索引修改当前单向链表中的元素
bool alterByIndex(LinkedList *ll, int index, char *data)
{
    if (index < 1 || index > ll->length)
        return false;
    Node *p = ll->head, *q = p->next;
    for (int i = 1; q != NULL; i++, p = p->next, q = q->next)
        if (i == index)
        {
            q->data = data;
            return true;
        }
    return false;
}

// 从当前单向链表中查找数据
bool isExisted(LinkedList *ll, char *data)
{
    for (Node *p = ll->head, *q = p->next; q != NULL; p = p->next, q = q->next)
        if (q->data == data)
            return true;
    return false;
}

// 获取当前单向链表的有效长度
int getLength(LinkedList *ll)
{
    return ll->length;
}

// 移除当前单向链表中所有重复的元素
void deDeduplication(LinkedList *ll)
{
    if (ll->length < 2)
        return;
    Node *p = (ll->head)->next;
    for (int i = 1; p->next != NULL; i++, p = p->next)
        for (Node *q = p->next; q != NULL; q = q->next)
            if (p->data == q->data)
            {
                delByIndex(ll, i);
                deDeduplication(ll);
                return;
            }
}
```

_./Demo.c_：

```C
#include "LinkedList.h"
#include <stdio.h>

void test(LinkedList *ll, int mode)
{
    switch (mode)
    {
    case 1:
        deleteByData(ll, "key");
        break;
    case 2:
        deDeduplication(ll);
    }
}

int main()
{
    LinkedList *ll = getInstance();

    add(ll, "boy");
    add(ll, "key");
    add(ll, "next");
    add(ll, "key");
    add(ll, "door");
    add(ll, "key");
    test(ll, 0);

    printf("|bit |contain |\n");
    Node *p = (ll->head)->next;
    for (int counter = 1; p != NULL; p = p->next)
        printf("|%4d|%8s|\n", counter++, p->data);
    printf("该链表共长%d节点。", ll->length);
}
```

输出（通过调节主函数中传入 `test()` 的第二参数的值为 0、1、2，多次运行的结果用空行隔开）：

```txt
|bit |contain |
|   1|     boy|
|   2|     key|
|   3|    next|
|   4|     key|
|   5|    door|
|   6|     key|
该链表共长6节点。

|bit |contain |
|   1|     boy|
|   2|    next|
|   3|    door|
该链表共长3节点。

|bit |contain |
|   1|     boy|
|   2|    next|
|   3|    door|
|   4|     key|
该链表共长4节点。
```

> **思考**：为什么负责创建和添加的函数不能直接传出普通的变量？为什么不使用简单的变量静态化来取代复杂的手动开辟内存空间？
> **关键词提醒**：作用域；静态传染。

## 案例：合并与逆序

将多个有序（值递增）**双向链表**合并为一个新的有序单链表，并逆序。

_./DoublyLinkedList.h_：

```C
#include "PenyoDS.h"

// 定义复合数据类型：节点
typedef struct
{
    char *data;         // 数据域
    struct Node *prior; // 前驱
    struct Node *next;  // 后继
} Node;

// 定义复合数据类型：双向链表
typedef struct
{
    Node *head, *tail; // 头、尾节点指针
    int length;        // 有效长度
} DoublyLinkedList;

// 获取双向链表的空白实例
DoublyLinkedList *getInstance()
{
    Node *head = (Node *)malloc(sizeof(Node));
    head->next = head->prior = NULL;
    DoublyLinkedList *dll = (DoublyLinkedList *)malloc(sizeof(DoublyLinkedList));
    dll->tail = dll->head = head, dll->length = 0;
    return dll;
}

// 向当前双向链表添加元素
bool add(DoublyLinkedList *dll, char *data)
{
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = data, n->prior = dll->tail, n->next = NULL;
    (dll->tail)->next = n;
    dll->tail = n, dll->length++;
    return true;
}

// 向当前双向链表插入元素
bool insert(DoublyLinkedList *dll, char *data, int index)
{
    if (index < 1 || index > dll->length)
        return false;
    Node *n = (Node *)malloc(sizeof(Node));
    Node *p = dll->head;
    for (int i = 1; p != NULL; i++, p = p->next)
        if (i == index)
        {
            n->data = data, n->prior = p->prior, n->next = p;
            p->prior = n;
            dll->length++;
            break;
        }
    return true;
}

// 根据数据从当前双向链表中删除元素
bool del(DoublyLinkedList *dll, char *data)
{
    for (Node *p = dll->head; p != NULL; p = p->next)
        if (p->data == data)
        {
            if (p->next == NULL)
                ((Node *)(p->prior))->next = NULL, dll->tail = p->prior;
            else
                ((Node *)(p->prior))->next = p->next, ((Node *)(p->next))->prior = p->prior;
            free(p);
            dll->length--;
            del(dll, data);
            return true;
        }
    return false;
}

// 根据索引从当前双向链表中删除元素
bool delByIndex(DoublyLinkedList *dll, int index)
{
    if (index < 1 || index > dll->length)
        return false;
    Node *p = dll->head;
    for (int i = 1; p != NULL; i++, p = p->next)
        if (i == index)
        {
            if (p->next == NULL)
                ((Node *)(p->prior))->next = NULL, dll->tail = p->prior;
            else
                ((Node *)(p->prior))->next = p->next, ((Node *)(p->next))->prior = p->prior;
            free(p);
            dll->length--;
            return true;
        }
    return false;
}

// 根据数据修改当前双向链表中的元素
bool alter(DoublyLinkedList *dll, char *old, char *data)
{
    bool isChanged = false;
    for (Node *p = dll->head; p != NULL; p = p->next)
        if (p->data == old)
        {
            p->data = data;
            isChanged = true;
        }
    return isChanged;
}

// 根据索引修改当前双向链表中的元素
bool alterByIndex(DoublyLinkedList *dll, int index, char *data)
{
    if (index < 1 || index > dll->length)
        return false;
    Node *p = dll->head;
    for (int i = 1; p != NULL; i++, p = p->next)
        if (i == index)
        {
            p->data = data;
            return true;
        }
    return false;
}

// 从当前双向链表中查找数据
bool isExisted(DoublyLinkedList *dll, char *data)
{
    for (Node *p = dll->head; p != NULL; p = p->next)
        if (p->data == data)
            return true;
    return false;
}

// 获取当前双向链表的有效长度
int getLength(DoublyLinkedList *dll)
{
    return dll->length;
}

// 直接合并两个双向链表
void merge(DoublyLinkedList *dll1, DoublyLinkedList *dll2)
{
    (dll1->tail)->next = (dll2->head)->next,
    ((Node *)((dll2->head)->next))->prior = dll1->tail;
    dll1->tail = dll2->tail;
    dll1->length += dll2->length;
    free(dll2->head);
    *dll2 = *dll1;
}

// 逆序当前双向链表
void reverse(DoublyLinkedList *dll)
{
    if (dll->length == 0)
        return;
    for (Node *p = (dll->head)->next, *q; p != NULL; p = p->prior)
        q = p->prior, p->prior = p->next, p->next = q;
    (dll->tail)->prior = dll->head,
    ((Node *)((dll->head)->next))->next = NULL,
    (dll->head)->next = dll->tail;
}
```

_./Demo.c_：

```C
#include "DoublyLinkedList.h"
#include <stdio.h>

void test(DoublyLinkedList *dll)
{
    printf("|bit |contain |\n");
    Node *p = (dll->head)->next;
    for (int counter = 1; p != NULL; p = p->next)
        printf("|%4d|%8s|\n", counter++, p->data);
    printf("该链表共长%d节点。\n\n", dll->length);
}

int main()
{
    DoublyLinkedList *dllA = getInstance(), *dllB = getInstance();

    add(dllA, "boy");
    add(dllA, "key");
    add(dllA, "next");
    add(dllA, "key");
    add(dllA, "door");
    add(dllA, "key");
    add(dllB, "yeah");
    test(dllA);
    test(dllB);

    merge(dllB, dllA);
    test(dllA);

    reverse(dllA);
    test(dllA);
}
```

输出：

```txt
|bit |contain |
|   1|     boy|
|   2|     key|
|   3|    next|
|   4|     key|
|   5|    door|
|   6|     key|
该链表共长6节点。

|bit |contain |
|   1|    yeah|
该链表共长1节点。

|bit |contain |
|   1|    yeah|
|   2|     boy|
|   3|     key|
|   4|    next|
|   5|     key|
|   6|    door|
|   7|     key|
该链表共长7节点。

|bit |contain |
|   1|     key|
|   2|    door|
|   3|     key|
|   4|    next|
|   5|     key|
|   6|     boy|
|   7|    yeah|
该链表共长7节点。
```

## 栈

这种**后进先出**（LIFO）的线性序列，称为**栈**（Stack）。栈也是一种**线性表**，只不过它是**操作受限**的线性表，只能在**一端进出**操作。进出的一端称为**栈顶**（Top），另一端称为**栈底**（Base）。栈可以用顺序存储，也可以用链式存储，分别称为**顺序栈**和**链栈**。

先看**顺序栈**的存储方式。顺序栈需要两个指针，*base*指向栈底，*top*指向栈顶。栈定义好了之后，还要定义一个最大分配空间，顺序结构都是如此，需要预先分配空间，因此可以采用宏定义。

```C
typedef struct {
    ElemType *base; // 栈底指针
    ElemType *top; // 栈顶指针
} SequenceStack;
```

**链栈**每个节点的地址是不连续的，只需要一个栈顶指针即可。可以把链栈看作一个不带头节点的单链表，但只能在头部进行插入、删除、取值等操作，不可以在中间和尾部操作。因此，可以按单链表的方法定义链栈的结构体。

```C
typedef struct {
    ElemType data; // 数据域
    ElemType *next; // 指向下一个节点的指针
} Node, *LinkedStack;
```

## 案例：左右括号匹配

设计算法，判断一个算术表达式的圆括号是否正确配对。

_./SequenceStack.h_：

```C
#include "PenyoDS.h"

// 定义复合数据类型：顺序栈
typedef struct
{
    char *base, *top; // 栈底、栈顶指针
    int length;       // 有效长度
} SequenceStack;

// 获取顺序栈的空白实例
SequenceStack *getInstance()
{
    SequenceStack *ss = (SequenceStack *)malloc(sizeof(SequenceStack));
    ss->top = ss->base = (char *)malloc(sizeof(char) * MAXSIZE);
    ss->length = 0;
    return ss;
}

// 向当前顺序栈栈顶添加元素
bool add(SequenceStack *ss, char data)
{
    if (ss->length == MAXSIZE - 1)
        return false;
    if (ss->length > 0)
        ss->top++;
    *ss->top = data, ss->top++, *ss->top = '\0', ss->top--;
    ss->length++;
    return true;
}

// 从当前顺序栈栈顶删除元素
bool del(SequenceStack *ss)
{
    if (ss->length == 0)
        return false;
    *ss->top = '\0';
    if (ss->length != 1)
        ss->top--;
    ss->length--;
    return true;
}

// 从当前顺序栈中查找数据
bool isExisted(SequenceStack *ss, char data)
{
    for (char *p = ss->base; p <= ss->top; p++)
        if (*p == data)
            return true;
    return false;
}

// 获取当前顺序栈的有效长度
int getLength(SequenceStack *ss)
{
    return ss->length;
}
```

_./Demo.c_：

```C
#include "SequenceStack.h"
#include <stdio.h>

int main()
{
    printf("警告！请输入纯粹的半角字符串！\n");

    // 用户可以输入待检测的字符串
    char toBeChecked[MAXSIZE];
    scanf("%s", toBeChecked);

    // 定义栈变量，逐位分析原始字符串并根据情况入栈弹栈
    SequenceStack *ss = getInstance();
    bool isCrashed = false;
    for (int i = 0; toBeChecked[i] != '\0'; i++)
        if (toBeChecked[i] == '(')
            add(ss, toBeChecked[i]);
        else if (toBeChecked[i] == ')')
            if (getLength(ss) < 0)
            {
                isCrashed = true;
                break;
            }
            else
                del(ss);

    // 分析结果，向用户报告
    switch (getLength(ss) || isCrashed)
    {
    case false:
        printf("匹配的字符串！");
        break;
    default:
        printf("不匹配的字符串！");
    }
}
```

输入（多次运行，每次输入一行的内容）：

```txt
(((12345abc))
(jqksd)jkqbs(qiw((bb27n@)))
())wwd)))))))))))))bswjwj
)(
```

输出（多次运行，每次输出一行的内容）：

```txt
不匹配的字符串！
匹配的字符串！
不匹配的字符串！
不匹配的字符串！
```

## 案例：进制转换

输入十进制数（整数）和一个不小于 2、不大于 10 的目标进制（整数），输出目标进制下的十进制数。

_./Demo.c_：

```C
#include "SequenceStack.h"
#include <stdio.h>

void scaleTransformer(int dec, int goal)
{
    SequenceStack *ss = getInstance();
    while (dec)
    {
        add(ss, '0' + dec % goal);
        dec /= goal;
    }
    while (getLength(ss))
    {
        printf("%s", ss->top);
        del(ss);
    }
}

int main()
{
    int dec, goal;
    scanf("%d %d", &dec, &goal);
    scaleTransformer(dec, goal);
}
```

输入（多次运行，每次输入一行的内容）：

```txt
64 8
24 2
114514 9
```

输出（多次运行，每次输出一行的内容）：

```txt
100
11000
184067
```

## 队列

这种**先进先出**（FIFO）的线性序列，称为**队列**（Queue）。队列也是一种线性表，只不过它是**操作受限**的线性表，只能在两端操作：**一端进，一端出**。进的一端称为**队尾**（Rear） ，出的一端称为**队头**（Front） 。队列可以用顺序存 储，也可以用链式存储。

队列的顺序存储采用一段连续的空间存储数据元素，并用两个变量*front*和*rear*记录队头和队尾元素的下标。而链队列类似一个单链表，需要两个指针*front*和*rear*分别指向队头和队尾。为了出队时删除元素方便，可以增加一个头节点。

## 案例：入队与出队

假设以数组*data[m]*存放**循环队列**的元素，同时设变量*rear*和*length*分别作为队尾指针和队中元素个数记录。试讨论判别此循环队列的队满条件，写出相应入队和出队算法，并通过运行验证之。

_./CircularArrayQueue.h_：

```C
#include "PenyoDS.h"

// 定义复合数据类型：循环顺序队列
typedef struct
{
    int data[MAXSIZE]; // 数据域
    int front, rear;   // 队头、队尾索引
    int length;        // 有效长度
} CircularArrayQueue;

// 获取循环顺序队列的空白实例
CircularArrayQueue *getInstance()
{
    CircularArrayQueue *caq = (CircularArrayQueue *)malloc(sizeof(CircularArrayQueue));
    caq->front = caq->rear = caq->length = 0;
    return caq;
}

// 向当前循环顺序队列队尾添加元素
bool add(CircularArrayQueue *caq, int data)
{
    if (caq->length == MAXSIZE) // 测满
        return false;
    if (caq->front ** caq->rear && caq->length ** 0) // 初始化检测
    {
        caq->front = caq->rear = 0;
        caq->data[caq->rear] = data;
    }
    else if (caq->rear == MAXSIZE - 1) // 循环检测
    {
        caq->rear = 0;
        caq->data[caq->rear] = data;
    }
    else
        caq->data[++caq->rear] = data;
    caq->length++;
    return true;
}

// 从当前循环顺序队列队头删除元素
bool del(CircularArrayQueue *caq)
{
    if (caq->length == 0) // 测空
        return false;
    if (caq->front == MAXSIZE - 1) // 循环检测
        caq->front = 0;
    else
        caq->front++;
    caq->length--;
    return true;
}

// 从当前循环顺序队列中查找数据
bool isExisted(CircularArrayQueue *caq, int data)
{
    for (int p = caq->front; p <= caq->rear; p++)
    {
        if (p == MAXSIZE)
            p = 0;
        if (caq->data[p] == data)
            return true;
    }
    return false;
}

// 获取当前循环顺序队列的有效长度
int getLength(CircularArrayQueue *caq)
{
    return caq->length;
}
```

_./Demo.c_：

```C
#include "CircularArrayQueue.h"
#include <stdio.h>

int main()
{
    CircularArrayQueue *caq = getInstance();
    printf("%s\n", isExisted(caq, 114514) ? "存在" : "不存在");
    for (int i = 0; i < MAXSIZE; i++)
        add(caq, 114514);
    printf("在填满了%d个元素后，再添加会%s。\n", MAXSIZE, add(caq, 114514) ? "成功" : "失败");
    printf("%s\n", isExisted(caq, 114514) ? "存在" : "不存在");
    del(caq);
    printf("在又删除了一个元素后，再添加会%s。", add(caq, 114514) ? "成功" : "失败");
}
```

输出：

```txt
在填满了64个元素后，再添加会失败。
在又删除了一个元素后，再添加会成功。
```

## 串

串，又称**字符串**，是由零个或多个字符组成的有限序列，也是一种特殊的线性表。字符串通常用双引号括起来，双引号里面的内容为字符串的值。串中任意个连续的字符组成的子序列，称为该串的**子串**，原串称为子串的**主串**。

串的顺序存储是用一段连续的空间存储字符串。可以预先分配一个固定长度的空间，在这个空间中存储字符串。顺序存储的 3 种方式：

- 以*‘\0’*表示字符串结束，‘\0’不算在字符串长度内。这样做有一个问题，如果想知道串的长度，需要从头到尾遍历一遍，如果经常需要用到串的长度，每次遍历一遍复杂性较高，因此可以考虑将字符串的长度存储起来以便使用。
- 在下标为 0 的空间存储字符串的长度。
- 结构体变量存储字符串的长度。

```C
typedef struct {
    char data[MAXSIZE]; //字符型数组
    int length; //字符串长度
} ArrayString;
```

顺序存储的串在插入和删除操作时，需要移动大量元素，因此也可以采用链表的形式存储。单链表存储字符串时，虽然插入和删除非常容易，但是这样做也有一个问题：一个节点只存储一个字符，如果需要存储的字符特别多，会浪费很多空间。因此也可以考虑一个节点存储多个字符的形式，例如一个节点存储 3 个字符，最后一个节点不够 3 个时用其他符号代替。

## 数组与矩阵

## 广义表

## 树

## 二叉树

## 哈夫曼树

## 森林

## 图

## 散列表

根据给定关键字来计算出存储地址的数据结构称为**散列表**（哈希表）。也就是说，散列表建立了关键字和存储地址之间的的一种直接映射关系。

把表中关键字（key）映射为对应的地址（Addr）的函数称为**散列函数**（哈希函数），记为：

$$
Hash(key)=Addr
$$

如果两个或更多**不同**关键字映射到同一地址，则称**冲突**发生了。发生碰撞的不同关键字互称为**同义词**。

构建散列函数的要点：

- 散列函数的定义域必须包含**全部需要存储的关键字**，值域的范围则依赖于散列表的大小或地址范围。
- 散列函数计算出来的地址应该能**等概率、均匀的**分布在整个地址空间，从而减小空间浪费/冲突发生。
- 散列函数应该尽量简单，能够在较短时间内就计算出任一关键字对应的地址。

常用哈希函数的构造方法：

- 直接定址法：直接取关键字的某个线性函数值为散列地址，散列函数为 $H(key)=a*key+b$，式中 $a$ 和 $b$ 都是常数。**这种方法最简单，不会产生冲突。**
- 除留余数法：假定散列表长 $m$，**取一个不大于 $m$ 但最接近或等于 $m$ 的质数 $p$**，利用 $H(key)=key\space\%\space p$ 把关键字转换为散列地址。该方法的关键是选好 $p$。
- 数字分析法：设关键字为 $r$ 进制数，而 $r$ 个数码在各位上出现的频率不一定相同，可能在某些位上分布均匀些，每种数码出现的机会均等；而在某些位上分布不均匀，只有某几种数码经常出现，则应选取数码分布比较均匀的若干位作为散列地址。这种方法适合于已知的关键字集合。_如建立电话号码的散列表，常常使用尾号作为关键字。_
- 平方取中法：取关键字的平方值的中间几位作为散列地址，具体取多少位视实际情况而定。这种方法得到的散列地址与关键字的每一位都有关系，使得散列地址分布比较均匀。
- 折叠法：将关键字分割成位数相同的几位数（最后一节可以不等长），然后取这几部分的叠加和作为散列地址，这种方法称为折叠法。关键字位数很多，且关键字每一位上数字分布大致均匀时，可以采用折叠法得到散列地址。

常用解决冲突的办法：

- 开放定址法：将产生冲突的地址作为自变量，通过某种冲突解决函数得到一个新的空闲的地址。
  - 线性探测法：冲突发生时，顺序查看表中下一个单元（如正处于表尾，则回到表首），直到找到一个空闲单元。该方法会造成大量元素在相邻的散列地址上堆积，大大降低查找效率；而且如果表已经满了，该方法亦不可用。
  - 平方探测法：设发生冲突的地址为 $d$，该方法能够得到新的地址序列 $[d+1^2,d-1^2,d+2^2,d-2^2,...]$，再按照按照线性探测法的思路存放元素。平方探测法是一种较好的处理冲突的方法，可以避免出现“堆积”。其缺点是不能探测到表中的所有单元，但至少能探测到一半单元。
  - 再散列法：又称双散列法。使用两个散列函数，当通过第一个散列函数 $H(key)$ 得到的地址发生冲突时，则利用第二个散列函数 $H_2(key)$ 计算该关键字的**地址增量**。
  - 伪随机序列法：当发生冲突时，地址增量为伪随机数序列。
- 拉链法：将所有的同义词存储在一个线性链表中，这个链表由其散列地址唯一标识。该方法适用于经常插入和删除的情况。

散列表的查找过程类似于构造过程，给定一个关键字，再：

- 计算出散列地址，检查地址位置有没有关键字，如果：
  - 没有，返回查找失败。
  - 有，检查记录与关键字是否匹配，如果：
    - 匹配，返回查找成功。
    - 不匹配，按照给定的冲突处理办法来计算下一个散列地址，再用该地址去执行上述过程。

散列表的**装填因子 $\alpha=\dfrac{表中记录数n}{散列表长度m}$**，定义为一个表的装满程度。散列表**平均查找长度**（ASL）依赖于 $\alpha$，而不直接依赖于 $n$ 或 $m$。$\alpha$ 越大，发生冲突的可能性越大。

下表展示了 ASL~成功~和 ASL~失败~的计算办法：

|           | 开放定址法                              | 拉链法                                   |
| --------- | --------------------------------------- | ---------------------------------------- |
| ASL~成功~ | $=\dfrac{\sum关键字查找成功次数}{表长}$ | $=\dfrac{\sum深度*权重}{有关键字单元数}$ |
| ASL~失败~ | $=\dfrac{\sum索引到空地址的次数}{表长}$ | $=\dfrac{\sum深度*权重}{表长}$           |
