# CSS 技术

## HTML 的局限性与 CSS

**HTML 只关心内容的语义**，也就是只关心网页中的显式信息、内容，而对样式、美观度不太在行。要想做出华丽的效果，不但工作量大，而且缺乏灵活性。因此我们必须定义一种统一、通用的样式标准，能够覆盖 HTML 中的所有同类标签——引入 CSS。

CSS（Cascading Stule Sheets），即**层叠样式表/级联样式表**，它**也是一种标记语言**。主要用于美化网页、布局页面，具体来说包含设置文本内容、图片外形、版面布局、外观显示样式等方面。

当 HTML 专注于呈现结构，CSS 专注于样式时，即两者相分离时，CSS 具有最大价值。

## CSS 语法规范和引入

一条 **CSS 规则**由两个主要的部分构成：**选择器**以及至少一条**声明**。CSS 中的注释用 `/*` 和 `*/` 包围。

```css
/* 定义所有一级标题字色为红，大小为 25 像素 */
h1 {
  color: red;
  font-size: 25px;
}
```

CSS 样式代码可以存放在 HTML 文档中，也可以独立成文件。按照其存在的位置，可以分为三大类：

- 行内样式表（行内式）
  - 行内样式表是在元素标签内部的 _style_ 属性中设定 CSS 样式。
  - 该方法适合修改简单样式；相较于后两种方法**优先级最高**。
- 内部样式表（嵌入式）
  - 内部样式表是将所有 CSS 代码抽取出来，集中放到HTML文档的 `<style></style>` 标签中，它理论上可以放在文档的任何位置，但在实际开发中一般放在**头部**。
  - 该方法便于控制**当前**整个页面的元素样式。
  - 该方法没有使结构与样式完全分离。
- 外部样式表（链接式）

  - 内部样式表是将所有 CSS 代码抽取出来，单独放到 CSS 文件中，再用 HTML 标签 `<link>` 引入：

    ```css
    <link rel="stylesheet" href="Sample.css">
    ```

    它理论上可以放在文档的任何位置，但在实际开发中一般放在**头部**。

  - 该方法是开发中最常用的。

为了方便练习和展示，后续小规模的演示代码都采用嵌入式。

## 选择器·上

选择器会根据不同的需求把不同的标签选出来，它能够将随后的声明应用到指定的标签上。

选择器分为**基础选择器**和**复合选择器**。其中，基础选择器是由单个选择器组成的，它又分为**标签选择器**、**类选择器**、**id选择器**和**通配符选择器**。

- 标签选择器（元素选择器）是指**用 HTML 标签名称**作为选择器，按标签名称分类，**为页面中某一类标签指定统一的 CSS 样式**。**缺点是不能设计差异化样式。**

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>CSS 标签选择器 测试</title>
    <style>
      p {
        color: red;
      }
    </style>
  </head>

  <body>
    <p>你是懂选择器的。</p>
    <p>由于大伙都是&lt;p&gt;，所以全变色了。</p>
    <p>如何只让第一行变色呢？</p>
  </body>
</html>
```

- 类选择器是指**用 HTML 标签属性 _class_ 的值**作为选择器，按类分类，**为所有具有匹配属性的标签指定统一的 CSS 样式**，但类名最好不要与已有的标签名重名。**类选择器是开发中最常用的一种选择器。**

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>CSS 类选择器 测试</title>
    <style>
      /* 注意，类选择器前有个点！ */
      /* 如果类名中需要有空格，须用短横线代替（CSS 中没有“减”的概念） */
      .first-line {
        color: red;
      }
      .bigfont {
        font-size: 66px;
      }
    </style>
  </head>

  <body>
    <!-- 类选择器生效的原则是谁调用谁变样式，不调用不变 -->
    <p class="first-line">你是懂属性class的。</p>
    <p>这次只有第一行变色了。</p>
    <p>非常的好用。</p>

    <!-- 那如何同时应用两种样式呢？有点像多重继承 -->
    <p class="first-line bigfont">这行则是又红又大（难视）</p>
    <!-- 多个类名间用空格隔开 -->
  </body>
</html>
```

- id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。**由于每个 HTML 标签的 id 是独一无二的，所以 id 选择器只会匹配到一个目标。**id 选择器一般用于**页面唯一性**的元素上，与 JS 搭配使用。

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>CSS id 选择器 测试</title>
    <style>
      /* 注意，id 选择器前有个截止符！ */
      #male {
        color: gold;
      }
    </style>
  </head>

  <body>
    <strong id="male">真正的男人</strong>不会选择<strong>退缩</strong>！
  </body>
</html>
```

- 通配符选择器能够匹配所有 HTML 元素来应用样式。只在特殊情况下才会使用，比如清除所有元素的内外边距。

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>CSS 通配符选择器 测试</title>
    <style>
      /* 注意，通配符选择器只有星号！ */
      /* 它不是只改变 body 中所有的元素，而是本文档内所有的元素（尽管部分是无意义的） */
      * {
        color: grey;
      }
    </style>
  </head>

  <body>
    <h1>Intel正式发布十三代酷睿：性能暴涨40%，直接碾压锐龙7000系</h1>
    <p>
      锐龙7000系刚刚解禁上市，各种评测也已经出炉，而Intel也放出了大招，正式发布了十三代酷睿桌面处理器。尽管只是纸面发布，实际产品要等10月20日才解禁上市，但从Intel发布的信息来看，十三代酷睿无疑会成为今年性能最强的处理器产品。只不过相对于AMD采用了台积电5nm工艺，Intel的十三代酷睿还是采用了Intel
      7制程，也就是10nm制程，但是在频率和架构上都有改善，因此获得了不小的性能提升。
    </p>
  </body>
</html>
```

## 字体样式

关于字体（Font），我们可以指定字体系列、大小、粗细和风格。

指定字体系列：

```css
.class {
  /* 属性值既可以用单/双引号包围，也可以“裸奔”。但如果值中间有空格，则绝不可“裸奔”。 */
  /* 若有多个选择，浏览器总是从左到右依次尝试（默认最后加上系统字体），直到全部字符被正确渲染。 */
  font-family: Ariel, "宋体", "Microsoft Yahei";
}
```

指定大小：

```css
.class {
  /* Chrome 默认字体大小为 16px，其它浏览器标准可能不同。因此我们最好给定确切数值。 */
  /* 标题元素需要使用标签选择器单独指定该属性。 */
  font-size: 24px;
}
```

指定粗细：

```css
.class {
  /* 值可选 normal（正常，默认选择，代表400）、bold（粗体，代表 700）、bolder（特粗体）、lighter（细体）或具体的数字（限 100-900，含上下界）。 */
  /* 实际开发中更提倡使用具体的数字。 */
  font-weight: 400;
}
```

指定风格：

```css
.class {
  /* 值可选 normal（正常）或 italic（斜体）。 */
  font-style: italic;
}
```

指定复合属性（简单指定风格、粗细、大小和字体系列）：

```css
.class {
  /* 当按以下方式简写时，属性的顺序不可被改变。 */
  /* 前两者可以省略。 */
  font: italic 700 16px 思源黑体;
}
```

:::tip
在实际开发中，我们总是把 `<strong>`、`<em>`、`<h1>` 等标签的默认特性“抹杀”掉。比如 `<strong>`，它的本意是“强调”，并不是简单的加粗，真正的**仅**加粗（Bold）是 `<b>`。我们使其粗细为 400、字色为 #CC0000（目前百度就是这种做法），形成以字符变红为主要特性的强调。
:::

## 文本样式

关于文本（Text），我们可以指定字色、对齐方式、装饰、缩进和行间距等。

指定字色：

```css
.class {
  /* 值可选预定义颜色（如red、greed、blue等）、Hex 码（如 #CC0000）或 RGB 码（如 rgb(255,0,0)或 rgb(100%,0%,0%)） */
  /* 实际开发中常用 Hex 码。 */
  color: #ff0000;
}
```

指定对齐方式：

```css
.class {
  /* 值可选 left（默认）、center 或 right。 */
  text-align: center;
}
```

指定装饰：

```css
.class {
  /* 值可选 none（无，默认）、underline（下划线）、overline（上划线）或 line-through（删除线）。 */
  text-decoration: none;
}
```

指定缩进：

```css
.class {
  /* 指定首行缩进的值，单位为 px 或 em（文字）。为正向右缩进，为负向左缩进。 */
  /* 使用 em 时，若当前元素未强制指定字体大小，则遵守父元素的字体大小设定。 */
  text-indent: 2em;
}
```

指定行间距（行高）：

```css
.class {
  /* 指定行间距的值，单位为 px 或 em。一般行间距需要大于字体大小。 */
  line-height: 24px;
  /* 它也可以在复合属性中被设置，跟在字号后面 */
  /* font: 12px/24px; 或 font: 12px/1.5; */
  /* 带单位则表明绝对指定，不带则是字号的值乘以该倍率 */
}
```

## Emmet 语法

Emmet 语法的前身是 [Zen Coding](https://baike.baidu.com/item/Zen%20Coding/10219092)，它使用缩写来提高 HTML 和 CSS 的编写速度。VS Code 支持 Emmet 语法。

对于 HTML，它的特性有以下几点：

- 生成标签：输入标签名后，按 `tab` 即可。如输入 div 后按 `tab`，可生成 `<div></div>`。
- 批量生成标签：标签名后使用 `*num`。如 div\*3 可生成 3 对 `<div></div>`。
- 生成父子标签框架：在父子标签名间使用 `>`。比如 ul>li 可生成 `<ul><li></li></ul>`。
- 生成并列标签组合：在标签名间使用 `+`。如 div+p 可生成 `<div><p></p></div>`。
- 生成含属性的标签：在标签名与属性值间使用 `.` 可生成具有 _class_ 属性的标签，使用 `#` 可生成具有 _id_ 属性的标签。若标签名为空，则默认生成**容器**。
- 生成有序标签：使用自增符号 `$`。如 div.type$\*3 可生成 `<div class="type1"></div>`、`<div class="type2"></div>` 和 `<div class="type3"></div>`。
- 生成含内容的标签：使用大括号对 `{containing}`。如 h1{Welcome!} 可生成 `<h1>Welcome!</h1>`。

对于 CSS，它的特性为：

- 生成属性键值对：输入每个单词的首字母（值与值单位算两个单词）。如 ti2e 可生成 `text-indent: 2em;`。

## 选择器·下

**复合选择器**是建立在基础选择器之上，对基础选择器进行组合而成的。它可以更准确、高效的选择目标元素。

- **后代选择器**又称为**包含选择器**，可以选择父元素中的子元素。

```css
/* 父元素要求放在前，空格后放子元素。表示只选中指定父元素中出现的指定子元素。 */
/* 只要子元素是父元素的后代，无论是直接还是间接，都可以匹配到。 */
/* 如果必要，可以有不止一个父子关系。 */
/* 元素的表达可以有标签、类、id 或通配符，它们可以搭配使用。 */
ol li {
  color: red;
}
```

- **子元素选择器**（**子选择器**）只能选择某元素的**最近一级**子元素。它相当于在后代选择器上加了一层**直接父子**的限制。

```css
/* 父元素要求放在前，大于号后放子元素。表示只选中指定父元素中出现的指定直接子元素。 */
.topBar > a {
  text-decoration: none;
}
```

- **并集选择器**可以选择多组标签。

```css
/* 多个非交并集选择器间用半角逗号隔开。 */
div,
span,
.bar,
#searchBar {
  font-weight: 400;
}
```

- **伪类选择器**用于向选择器添加**特殊的效果**。

```css
/* 伪类选择器种类很多，有链接伪类、结构伪类等。 */
/* 链接伪类可选四个值：link（所有未被访问的）、visited（所有已被访问的）、hover（焦点上的）、active（焦点选中的）。 */
/* 如果在开发中，超链接的四个伪类选择器全部都要写，则必须按照 “lvha” 的顺序排列。但一般只需要单独写一个标签选择器和一个 hover 伪类选择器即可。 */
a {
  color: blue;
  text-decoration: none;
}

a:hover {
  color: red;
}

/* 常用的伪类选择器还有获取表单焦点元素的。 */
input:focus {
  background-color: skyblue;
}
```

:::details 你知道吗：选择器的优先级孰高孰低？
基本选择器或标识：

| 选择器或标识类型           | 权重                               |
| -------------------------- | ---------------------------------- |
| !important标识             | SS1                                |
| 行内选择器                 | S1                                 |
| id选择器                   | A1                                 |
| 类选择器                   | B1                                 |
| 标签选择器                 | C1                                 |
| 通配符/关系/否定伪类选择器 | 0                                  |
| _继承的_                   | $\lim\limits_{x\rightarrow 0^-} x$ |

复合选择器（无论是什么类型，都是直接相加每个基础选择器或标识的权重）：

| 选择器类型               | 使用例         | 权重（同级相加，异级看大） |
| ------------------------ | -------------- | -------------------------- |
| 并集选择器（两标签一id） | div, span, #id | A1C2                       |
| 后代选择器（一标签一类） | h1 .class      | B1C1                       |
| 子选择器（两标签）       | ul>li          | C2                         |
| 后代选择器（两标签）     | ul li          | C2                         |

若两复合选择器权重相同，则优先采纳样式表中出现较晚的那一个（[层叠性](#css-三大特性)）。具体考证请参考[这里](https://blog.csdn.net/weixin_45135068/article/details/107703092)。
:::

## 块与行内元素

**元素显示模式**就是元素显式的方式。HTML 元素一般分为**块元素**和**行内元素**（内联元素）两种类型。如 `<div>` 以独占一行的方式显示，是块元素；`<span>` 在一行中可以有多个，是行内元素。

块元素的特点：

- 独占一行。
- 高度、宽度、外边距、内边距可指定。
- 宽度默认是容器（父级宽度）的 100%。
- 是一个容器（盒子），里面可以容纳行内或块元素。

常见的块元素有 `<h1>`、`<div>`、`<p>`、`<ul>`、`<ol>`、`<li>` 等。**其中文字类的标签不适用第四条特性。**

行内元素的特点：

- 一行可以显示多个行内元素。
- 高度、宽度不能**直接**指定。
- 宽度默认是本身内容的宽度。
- 只能容纳文本或其他行内元素。

常见的行内元素有 `<a>`、`<strong>`、`<b>`、`<span>` 等。**其中超链接标签不适用第四行特性：它不能叠用自身；它内部可容纳块元素。**

:::details 你知道吗：如何增大 `<a>` 的判定范围？
根据以往的实践，我们知道超链接标签渲染出来就像一个有着下划线的普通有色文本一样，不是很醒目。如果我们想让很大一片区域都成为超链接的判定区，除了采用图像按钮的思路，还可以**转换显示模式**，将超链接由行内元素转换为块元素。

在 `<a>` 的样式属性中加入 `display: block;` 再指定其宽度和高度即可。

需要转换为行内元素：`display: inline;`；行内块元素：`display: inline-block;`。
:::

`<img />`、`<input />`、`<td>` 虽也属于行内元素，但是它们又具备一些块元素的特性，被称为“行内块元素”（非正式说法）。

- 一行可以显示多个行内块元素，每两个之间存在空隙。
- 高度、宽度、外边距、内边距可指定。
- 默认宽度是本身内容的宽度。

### 案例：垂直导航栏

请仿照国内某知名购物网站上的“分类”板块做一个垂直导航栏。要求在样式和交互逻辑上与图中有异曲同工之妙，不对正常跳转做要求。

![image-20221114013435840](assets\image-20221114013435840.png)

```css
.bar {
  background-color: #55585a;
  color: #ffffff;
  font-family: 思源黑体;
  font-size: 14px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  width: 234px;
}

.sharp {
  background-color: #888888;
  height: 1px;
  width: 234px;
}

a.bar {
  display: block;
  text-align: left;
  text-decoration: none;
  padding: 0px 0px 0px 30px;
  width: 204px;
}

a.bar:hover {
  background-color: #ff6700;
}
```

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>垂直导航栏</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="master.css" />
  </head>

  <body>
    <div class="bar">Penyo Inc.</div>
    <div class="sharp"></div>
    <a href="" class="bar" title="Technology Dpt.">技术部</a>
    <a href="" class="bar" title="Bussine & Trade Dpt.">商业贸易部</a>
    <a href="" class="bar" title="Development Dpt.">开发部</a>
    <a href="" class="bar" title="Education Dpt.">教育部</a>
    <a href="" class="bar" title="Art & Culture Dpt.">艺术文化部</a>
    <a href="" class="bar" title="Industry Dpt.">实业部</a>
  </body>
</html>
```

## 背景样式

关于背景（Background），我们可以指定颜色、图片、平铺、图片位置和图片固定。

_background-color_ 属性定义了元素的背景颜色：

```css
/* 值可选 transparent（默认，透明）或颜色值。 */
td.g1 {
  background-color: blue;
}
```

_background-image_ 属性定义了元素的背景图像，它的图层在背景颜色之上（当有背景颜色时）。实际开发中一些 logo 或超大的背景图片，因**容易控制位置**，所以常用该属性演绎：

```css
/* 值可选 none（默认，无）或 url(链接)（链接函数）。 */
body {
  background-image: url(Senpai.png);
}
```

_background-repeat_ 属性定义了背景图像的平铺方式：

```css
/* 值可选 repeat（默认，平铺）、no-repeat（不平铺）、repeat-x（沿 x 轴平铺）或repeat-y（沿 y 轴平铺） */
body {
  background-image: url(Senpai.png);
  background-repeat: no-repeat;
}
```

_background-position_ 属性定义了背景图像的位置：

```css
/* 该属性具有 x、y 两个值，可选 top、bottom、left、right、center、百分数或确切值。 */
body {
  background-image: url(Senpai.png);
  background-repeat: no-repeat;
  /* 使用方位名词时，x 与 y 可以颠倒，百分数或确切值不行。 */
  /* 若缺失参数，浏览器会使缺失的一个值等于 center。 */
  background-position: center top;
}
```

:::tip
你知道吗：相对值和绝对值可以混合使用——相对值的本质是因窗口尺寸变化而变化的绝对值。
:::

_background-attchment_ 属性设置背景图像是否随着页面滚动而滚动：

```css
/* 值可选 scroll（默认，滚动）或 fixed（固定）。 */
body {
  background-attchment: fixed;
}
```

指定复合属性（简单指定背景颜色、背景图片、背景平铺、背景图像滚动和背景图片位置）：

```css
/* 一般按照题头的顺序来排列属性，不强制要求此顺序。 */
body {
  background: black url(Senpai.png) no-repeat fixed center top;
}
```

:::details 你知道吗：如何设置半透明背景？
实际上RGB码还有个衍生版本：RGBA 码。A 代表 Alpha 通道，值为 1 时表示不透明、为 0 时表示透明。比如要设计黑色半透的效果，可以指定背景为 _rgba(0, 0, 0, 0.3)_（**注意，它是背景的属性，不是背景颜色的属性**）。其中，_0.3_ 的 _0_ 是可以省略的。
:::

### 案例：复杂表格（侧重 CSS）

请切实按照 HTML 笔记中的给出的[样图](./html.md#案例复杂表格侧重-html)复刻表格。对边框样式暂时不做要求。

```css
* {
  text-align: center;
}

.f-l {
  float: left;
}

.f-r {
  float: right;
}

.datasheet {
  margin: 0 auto;
}

.time-title-3 {
  background-image: linear-gradient(to right, #ffc000, #7030a0);
  color: white;
}

.time-subtitle {
  background-image: linear-gradient(to bottom, #f1f1f1, #d0cece, #f1f1f1);
  width: 88px;
}

.dtc-long {
  background-color: #0070c0;
}

.dtc-mid {
  background-color: #00b050;
}

.dtc-mile {
  background-color: #ffc000;
}

.dtc-short {
  background-color: #ff0000;
}

.g1 {
  background-color: #0070c0;
  color: white;
}

.g2 {
  background-color: #ff6699;
  color: white;
}

.g3 {
  background-color: #92d050;
  color: black;
}

.sandy {
  color: yellow;
  font-weight: 700;
}

.out-sync {
  text-decoration: underline;
}
```

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>赛马娘 重赏赛事日程表</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="master.css" />
  </head>

  <body>
    <div>
      <a
        class="f-l"
        href="https://wiki.biligame.com/umamusume/%E6%AF%94%E8%B5%9B"
        target="_blank"
      >
        <img
          src="https://patchwiki.biligame.com/resources/assets/images/logo/logo_umamusume.png"
          title="赛马娘中文Wiki"
        />
      </a>
      <audio
        class="f-r"
        src="http://music.163.com/song/media/outer/url?id=1307379555.mp3"
        controls
        loop
      ></audio>
      <div style="clear: both;"></div>
    </div>
    <table class="datasheet" cellspacing="0">
      <thead>
        <tr>
          <td width="66" rowspan="2"></td>
          <th colspan="12" class="time-title-3">经典级 · 下半年</th>
        </tr>
        <tr>
          <th class="time-subtitle">7月前</th>
          <th class="time-subtitle">7月后</th>
          <th class="time-subtitle">8月前</th>
          <th class="time-subtitle">8月后</th>
          <th class="time-subtitle">9月前</th>
          <th class="time-subtitle">9月后</th>
          <th class="time-subtitle">10月前</th>
          <th class="time-subtitle">10月后</th>
          <th class="time-subtitle">11月前</th>
          <th class="time-subtitle">11月后</th>
          <th class="time-subtitle">12月前</th>
          <th class="time-subtitle">12月后</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th rowspan="1" class="dtc-long">长距离</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="g1">菊花赏</td>
          <td class="g2">阿共和国杯</td>
          <td></td>
          <td class="g2">长途跑者S</td>
          <td class="g1">有马纪念</td>
        </tr>
        <tr>
          <th rowspan="4" class="dtc-mid">中距离</th>
          <td class="g1 sandy">JP沙地打比</td>
          <td class="g3 sandy out-sync" title="繁中服尚未跟进">水星杯</td>
          <td class="g3">小仓纪念</td>
          <td class="g2">札幌纪念</td>
          <td class="g3">新潟纪念</td>
          <td class="g2">神户新闻杯</td>
          <td class="g2">京都大赏典</td>
          <td class="g1">秋华赏</td>
          <td class="g1">伊女王杯</td>
          <td class="g1">日本C</td>
          <td class="g3">挑战C</td>
          <td class="g1">东京大赏典</td>
        </tr>
        <tr>
          <td class="g3">函馆纪念</td>
          <td></td>
          <td></td>
          <td></td>
          <td class="g3">紫苑S</td>
          <td class="g2">产经赏</td>
          <td></td>
          <td class="g1">天皇赏(秋)</td>
          <td class="g1 sandy">JBC经典赛</td>
          <td></td>
          <td class="g3">中日新闻杯</td>
          <td></td>
        </tr>
        <tr>
          <td class="g3">七夕赏</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="g2">圣列特纪念</td>
          <td></td>
          <td></td>
          <td class="g3">福岛纪念</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="g3 sandy">天狼星S</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowspan="4" class="dtc-mile">一哩</th>
          <td class="g3">日经电台赏</td>
          <td class="g3">中京纪念</td>
          <td class="g3">关屋纪念</td>
          <td></td>
          <td class="g2">玫瑰S</td>
          <td class="g2 sandy out-sync" title="繁中服尚未跟进">山茶花TVC</td>
          <td class="g1 sandy out-sync" title="繁中服尚未跟进">英里CSC</td>
          <td class="g2">富士S</td>
          <td class="g2 sandy">JBC女士赛</td>
          <td class="g1">一哩CS</td>
          <td class="g1 sandy">日本冠军C</td>
          <td></td>
        </tr>
        <tr>
          <td class="g3 sandy out-sync" title="繁中服尚未跟进">闪光雌马C</td>
          <td class="g3">女王S</td>
          <td class="g3 sandy">榆树S</td>
          <td></td>
          <td class="g3">京成杯AH</td>
          <td></td>
          <td class="g2">每日王冠</td>
          <td></td>
          <td class="g3 sandy">都城S</td>
          <td></td>
          <td class="g3">绿松石S</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td class="g3 sandy">猎豹S</td>
          <td></td>
          <td></td>
          <td></td>
          <td class="g2">府中UMS</td>
          <td></td>
          <td class="g3 sandy">武藏野S</td>
          <td></td>
          <td class="g3 sandy out-sync" title="繁中服尚未跟进">女王赏</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="g3 sandy out-sync" title="繁中服尚未跟进">雌马预赛</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowspan="3" class="dtc-short">短距离</th>
          <td class="g3">CBC赏</td>
          <td class="g3">朱鹮SD</td>
          <td></td>
          <td class="g3">北九州纪念</td>
          <td class="g2">人马S</td>
          <td class="g1">短途跑者S</td>
          <td class="g2 sandy out-sync" title="繁中服尚未跟进">东京杯</td>
          <td class="g2">天鹅S</td>
          <td class="g3 sandy">JBC短途赛</td>
          <td class="g3">京阪杯</td>
          <td class="g3 sandy">五车二S</td>
          <td class="g2">阪神C</td>
        </tr>
        <tr>
          <td class="g3 sandy">南河三S</td>
          <td></td>
          <td></td>
          <td class="g3">坚兰C</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td class="g3 sandy out-sync" title="繁中服尚未跟进">星团杯</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

亮点：

- 选择器模块化设计。
- 背景渐变。

## CSS 三大特性

CSS 三大特性是**层叠性、继承性、优先级**。

| 性质       | 触发情况                                                                                                                                   | 原则                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **层叠性** | 相同选择器对同一属性有不同取值                                                                                                             | 样式冲突，遵循就近原则，以距离结构近的样式为准<br />样式不冲突则不重叠 |
| **继承性** | 父标签选择器的<strong title="一般是一些与文字相关的属性" style="color:gray;">部分属性</strong>会辐射所有子标签（**当子标签中缺失该属性**） | 子标签会继承父标签的样式                                               |
| **优先级** | 同一个元素指定多个选择器                                                                                                                   | 选择器相同则执行层叠性<br />选择器不同，则根据权重执行                 |

## 盒子模型

页面布局有三大关键词：**盒子模型、[浮动](#浮动)和[定位](#定位)**。

网页布局过程：

- 准备好相关的网页元素，用盒子打包
- 设置盒子样式
- 摆放到合适位置

`<p>`、`<div>`、`<span>` 等都是盒子，它们由边框（_border_）、外边距（_margin_）、内边距（_padding_）和有效内容四个要素组成。

边框可以调整宽度（_border-width_）、线样式（_border-style_）和颜色（_border-color_）等基础属性。

```css
div.bt {
  border-width: 4px;
  /* 值可选 none（无边框）、hidden（隐藏边框）、dotted（点状线边框）、dashed（虚线边框）、solid（实线边框）、double（双实线边框）、groove（3D 凹槽边框）、ridge（菱形边框）、inset（3D 凹边边框）、outset（3D 凸边边框）、transparent（透明） */
  border-style: solid;
  border-color: pink;
  /* 也可以单独调整一条边的属性（上下两句合起来利用了层叠性） */
  border-top-color: red;
  /* 以上三个属性也可以合并为复合属性，顺序无要求 */
  /* border: 4px solid pink; */
  /* 复合属性可以也应用到单独的一条边上 */
  /* border-top: 2px dotted red; */
}
```

:::tip
对于表格，其整体的边框、表头单元格的边框和单元格的边框的样式需要分别设置。即使用并集选择器 `table, th, td`。原因是边框样式无法被继承。
:::

_border-collapse_ 可用于调整表格中两单元格边框的交集情况。值取 _collapse_ 时认为两单元格共享一个边。

内/外边距使用 _padding_/_margin_ 调整：

| 属性个数 | 含义                                   |
| -------- | -------------------------------------- |
| 1        | 表示所有边距。                         |
| 2        | 分别表示上下和左右边距。               |
| 3        | 分别表示上、左右和下边距。             |
| 4        | 分别表示上、右、下、左（顺时针）边距。 |

当然也可以单独指定某一边的内/外边距，如 _padding-top_/_margin-top_。行内元素一般只要指定左右边距，块元素才要指定所有边距。

:::tip
当指定了盒子的宽/高时，边框和边距都会影响盒子最终的尺寸，你需要根据需求调整内容尺寸。
:::

:::tip
要使块级元素水平居中，可以设置它的左右外边距为 _auto_。要使行内元素居中，可以给其父元素设置 _text-align: center;_。
:::

当上下两个同级元素都拥有同一边的外边距，会只渲染两者值中较大的那一个边距，且逻辑上认为两个元素共用这一个边距。这种现象称为**合并**（若上下两个元素是父子关系，则称为**塌陷**）。要想解决合并，只为一边设置足够的外边距即可；要想解决塌陷，可以为父元素设置边框或者内边距，来“隔开”父子边缘的直接接触，或者为父元素添加 [_overflow:hidden;_](#浮动) 等定位办法。**浮动元素不会出现塌陷。**

在实际开发中，我们常常要指定各种盒子模型的边距。一般情况下，**不特别指定就是没有边距**，因此我们需要在所有项目的开头这样写：

```css
* {
  padding: 0;
  margin: 0;
}
```

### 案例：核酸检测报告

请尽量复刻皖事通中的核酸检测报告页面。

```css
* {
  padding: 0;
  margin: 0;
  font-family: 思源黑体;
}

body {
  background-color: #f0f4f7;
}

h1 {
  font-size: 52px;
  font-weight: normal;
  text-align: center;
  line-height: 0px;
}

h2 {
  color: #ffffff;
  font-size: 20px;
  font-weight: normal;
  text-align: center;
  line-height: 0px;
}

h4 {
  font-weight: normal;
  text-align: center;
  line-height: 64px;
}

#first-frame {
  margin-top: 58px;
}

.info {
  background-color: #ffffff;
  width: 380px;
  padding: 8px;
  border-radius: 10px;
  margin: auto;
  margin-top: 10px;
  text-align: center;
}

.entity {
  color: #333333;
  border-bottom: 1px solid #eeeeee;
  padding: 8px;
}

.top-bar {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  background-color: #0157d0;
  padding: 4px 0px 10px;
}

.green {
  color: #5cb83c;
}

.red {
  color: #e74b13;
}

.item-name {
  color: #989898;
  line-height: 38px;
}

.item-value {
  text-align: right;
}

.notice {
  color: #1b8bb9;
  background-color: #d1e9f5;
  line-height: 24px;
  padding: 16px 8px;
  border-radius: 5px;
  margin: 28px 0px 20px;
}

.cr {
  color: #989898;
}
```

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>核酸检测报告</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="master.css" />
  </head>

  <body>
    <div class="top-bar">
      <h2>核酸检测报告</h2>
    </div>
    <div class="info" id="first-frame">
      <br />
      <img
        src="https://i.328888.xyz/2022/12/05/VmqVL.th.png"
        width="60px"
        id="m-icon"
      />
      <h1 class="green" id="morph">阴性</h1>
      <h4 class="green" id="morph2">距离本次检测已过0天</h4>
      <table>
        <tr>
          <td class="item-name"></td>
          <td class="item-value">
            我的基本信息&nbsp;<img
              src="https://i.328888.xyz/2022/12/05/VmQok.png"
              height="14px"
            />&nbsp;
          </td>
        </tr>
        <tr>
          <td class="item-name entity">姓名</td>
          <td class="item-value entity">**娅</td>
        </tr>
        <tr>
          <td class="item-name entity">身份证号</td>
          <td class="item-value entity">1000**********0001</td>
        </tr>
        <tr>
          <td class="item-name entity">采集机构</td>
          <td class="item-value entity">泰拉罗德岛</td>
        </tr>
        <tr>
          <td class="item-name entity">采集时间</td>
          <td class="item-value entity">
            <label id="a-time">2022-12-05</label>&nbsp;13:16:52
          </td>
        </tr>
        <tr>
          <td class="item-name entity">检测机构</td>
          <td class="item-value entity">泰拉罗德岛</td>
        </tr>
        <tr>
          <td class="item-name entity">检测时间</td>
          <td class="item-value entity">
            <label id="b-time">2022-12-05</label>&nbsp;20:22:05
          </td>
        </tr>
        <tr>
          <td class="item-name" colspan="3">
            <div class="notice">
              注：仅显示近14天内核酸检测记录。更多数据在不<br />断汇集和完善中，查询结果供参考。
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="info cr">
      <p onclick="alert('Powered by Penyo. All rights reserved.')">
        <small
          >本页面仅供研究计算机原理，<b>禁止</b>用于干扰防疫政策。<br />
          作者不对使用者的行为负任何责任！</small
        >
      </p>
    </div>
  </body>
</html>
```

亮点：

- [圆角边框](https://www.bilibili.com/video/BV14J4114768?p=166)的使用。

## 阴影

_box-shadow_ 用于调整盒子模型的阴影。

```css
div {
  /* 其值列表为水平阴影位置（必需）、垂直阴影位置（必需）、模糊距离、阴影尺寸、阴影颜色、设置内部阴影 */
  box-shadow: h-shadow v-shadow blur spread color inset;
}
```

| 值       | 调整的影响                                                                               |
| -------- | ---------------------------------------------------------------------------------------- |
| h-shadow | 控制阴影在 x 轴上的位置，为 0 时阴影左上角与盒子左上角对齐，为正向右偏移，为负向左偏移。 |
| v-shadow | 控制阴影在 y 轴上的位置，为 0 时阴影左上角与盒子左上角对齐，为正向下偏移，为负向上偏移。 |
| blur     | 控制阴影高斯模糊的程度，为 0 时完全不模糊，不可取负值。                                  |
| spread   | 控制阴影的大小，为 0 时与盒子模型等大。                                                  |
| color    | 控制阴影的颜色，可以容纳 rgb 对象或者 rgba 对象。                                        |
| inset    | 控制阴影的类型为内阴影，默认是外阴影（outset），**不可以写 outset**。                    |

阴影只是一种视觉效果，不占据实际的空间。

_text-shadow_ 用于控制文本的阴影。

```css
p {
  /* 其值列表为水平阴影位置（必需）、垂直阴影位置（必需）、模糊距离、阴影颜色 */
  text-shadow: h-shadow v-shadow blur color;
}
```

此<b style="text-shadow: 3px 3px 3px rgba(0, 0, 0, .3);">属性</b>在实际开发中很少使用。

### 案例：美国外卖

![image-20221225220436113](assets\image-20221225220436113.png)

请仿照某知名外卖软件的界面设计商品单元。支持一定程度的自由发挥。

```css
* {
  margin: 0;
  padding: 0;
  font-family: 思源黑体;
}

body {
  background-color: #dddddd;
}

.one-line {
  margin: 64px auto;
  text-align: center;
}

.topic {
  width: 1350px;
  height: 64px;
  line-height: 64px;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 32px;
  box-shadow: 0px 0px 30px 5px rgb(0 0 0 / 20%);
  display: inline-block;
}

.info {
  width: 320px;
  height: 400px;
  background-color: white;
  border-radius: 20px;
  margin: 0px 10px;
  box-shadow: 0px 0px 30px 5px rgb(0 0 0 / 20%);
  display: inline-block;
  text-align: left;
}

.info:hover {
  background-color: #eeeeee;
}

.info:active {
  background-color: #cccccc;
}

.thumb {
  width: 320px;
  height: 240px;
  border-radius: 20px 20px 0px 0px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.discribe {
  width: 272px;
  height: 112px;
  padding: 24px;
  white-space: nowrap;
}

.title {
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attribute {
  color: grey;
  font-size: 18px;
  line-height: 46px;
}

.division-line {
  color: #dddddd;
  font-size: 18px;
}

.price {
  font-size: 16px;
}

.present-price {
  color: red;
}

.yuan {
  font-size: 32px;
  font-weight: normal;
}

.original-price {
  color: grey;
  text-decoration: line-through;
  margin-left: 5px;
}

.tag {
  color: white;
  background-image: linear-gradient(to top right, orange, red);
  line-height: 16px;
  padding: 5px;
  margin-left: 5px;
  border-radius: 5px;
  display: inline-block;
  transform: translateY(-5px);
}
```

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>美国外卖，送啥都快！</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="master.css" />
  </head>

  <body>
    <div class="one-line">
      <h1 class="topic">今日外卖推荐</h1>
      <div class="info">
        <div
          class="thumb"
          style="background-image: url(https://img.zcool.cn/community/0105225680b41b32f8759f04f399fe.jpg);"
        ></div>
        <div class="discribe">
          <h4 class="title">日式豚骨拉面 真正还原日本正宗风味</h4>
          <p class="attribute">
            <span class="rate">98%好评</span>
            &nbsp;<ins class="division-line">|</ins>&nbsp;
            <span class="sales-volume">半年售685</span>
            &nbsp;<ins class="division-line">|</ins>&nbsp;
            <span class="distance">3.4km</span>
          </p>
          <div class="price">
            <span class="present-price"
              >¥<strong class="yuan">21.</strong>8</span
            >
            <span class="original-price">¥31</span>
            <span class="tag">已减9.2元</span>
            <span class="tag">你曾买过</span>
          </div>
        </div>
      </div>
      <div class="info">
        <div
          class="thumb"
          style="background-image: url(https://img.zcool.cn/community/015fc45d0891d7a801205e4b975bd2.png);"
        ></div>
        <div class="discribe">
          <h4 class="title">墨西哥风味披萨 六英寸</h4>
          <p class="attribute">
            <span class="rate">87%好评</span>
            &nbsp;<ins class="division-line">|</ins>&nbsp;
            <span class="sales-volume">半年售476</span>
            &nbsp;<ins class="division-line">|</ins>&nbsp;
            <span class="distance">241m</span>
          </p>
          <div class="price">
            <span class="present-price"
              >¥<strong class="yuan">19.</strong>9</span
            >
            <span class="original-price">¥39</span>
            <span class="tag">已减19.1元</span>
          </div>
        </div>
      </div>
      <div class="info">
        <div
          class="thumb"
          style="background-image: url(https://img.zcool.cn/community/0110df5d4a3ed6a80120695c9276eb.jpg);"
        ></div>
        <div class="discribe">
          <h4 class="title">老北京地道炸鸡 送百事可乐</h4>
          <p class="attribute">
            <span class="rate">96%好评</span>
            &nbsp;<ins class="division-line">|</ins>&nbsp;
            <span class="sales-volume">半年售511</span>
            &nbsp;<ins class="division-line">|</ins>&nbsp;
            <span class="distance">3.1km</span>
          </p>
          <div class="price">
            <span class="present-price"
              >¥<strong class="yuan">25.</strong>5</span
            >
            <span class="tag">回头客多</span>
          </div>
        </div>
      </div>
      <div class="info">
        <div
          class="thumb"
          style="background-image: url(https://img.zcool.cn/community/011b8a5c91f762a801208f8b9996ca.jpg);"
        ></div>
        <div class="discribe">
          <h4 class="title">冬季的第一碗炒酸奶 爽到飞天</h4>
          <p class="attribute">
            <span class="rate">83%好评</span>
            &nbsp;<ins class="division-line">|</ins>&nbsp;
            <span class="sales-volume">半年售792</span>
            &nbsp;<ins class="division-line">|</ins>&nbsp;
            <span class="distance">1.6km</span>
          </p>
          <div class="price">
            <span class="present-price"
              >¥<strong class="yuan">11.</strong>8</span
            >
            <span class="tag">买二赠一</span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

亮点：

- 内外边距的灵活使用。
- 显示属性的灵活使用。
- 伪类选择器的灵活使用。
- 模仿现代交互的布局设计。
- 适当应用模糊造就层次感。

## 浮动

CSS 提供了三种传统页面布局方式，**标准流、浮动和[定位](#定位)**。实际开发中三者要搭配使用，并无高下。

标准流（又称普通流、文档流）就是页面按照标签在文档中出现的顺序来排列的方式。块级元素从上到下排序，行内元素从左到右排序。**标准流是最基本的布局方式。**

浮动（_float_）可以使元素按照特定的方式排列。如使多个块级元素处于同一行。_float_ 属性用于创建浮动框，将其移动到一边，直到左边缘或右边缘触及包含块或另一个浮动框的边缘。

```css
div {
  /* 值可选 none（不浮动，默认）、left（向左浮动）、right（向右浮动） */
  float: left;
}
```

浮动的元素会脱离标准流（**脱标**），默认在一行内显示并顶部对齐，看起来像**另一层**标准流里的行内块元素一样。留在标准流里的“空”不会被保留，而是被之后同级的元素按序占用。**但是“占用”仅仅限于逻辑布局，内容会绕开浮动元素来显示，而不是直接被覆盖。** 无论元素原先是什么类型（块、行内、行内块等），浮动后一律变成行内块元素，_display_ 属性失效。

当浮动元素的父元素是 `<body>` 时，“边缘”即指窗口边缘（近似的）；若父元素是某一 `<div>` 时，“边缘”即指盒子边缘。

**当标准流父元素中所有子元素都为浮动元素，该元素高度默认为 0。**要想做到父元素高度“正确”自适应，需要**清除浮动**（带来的影响）。

这里介绍清除浮动的四种方法：

- **额外标签法**，亦称为**隔墙法**，是 W3C 推荐的方法。它是最简单的方法，但是添加了无意义的**块级**标签、结构化差。

```css
div.ae {
  float: left;
  width: 30%;
  height: 50px;
}

div.wall {
  /* 值可选 left（清除左浮动元素的影响）、right（清除右浮动元素的影响）、both（清除两侧浮动元素的影响） */
  clear: both;
}
```

```html
<div class="fe">
  <div class="ae">常规元素1</div>
  <div class="ae">常规元素2</div>
  <div class="ae">常规元素3</div>
  <!-- 使用换行标签也是可行的 -->
  <div class="wall"></div>
</div>
```

- 父级添加 overflow 属性。**有副作用：无法显示溢出的部分。**

```css
div.fe {
  /* 值可选 hidden、auto、scroll。三者清除浮动的效果一致。 */
  overflow: hidden;
}
```

- 父级添加 after 伪元素。该方法是最优解，使用的时候可以单独把它放在一个 css 文件里，定义类选择器 _.clear-float_，使用的时候做“拿来主义”即可。

```css
.clear-float::after {
  /* 伪元素必须有内容。 */
  content: "";
  /* 伪元素默认是行内元素，需要转换为块元素。 */
  display: block;
  height: 0;
  /* 核心。 */
  clear: both;
  visibility: hidden;
}

.clear-float {
  /* 为兼容早期IE。 */
  *zoom: 1;
}
```

:::details 你知道吗：什么是伪元素？
伪元素是一个附加在选择器末尾的关键词，通过伪元素您不需要借助元素的ID或class属性就可以对被选择元素的特定部分定义样式。如指定所有段落标签的第一个字：

```css
p::first-letter {
  font-weight: 900;
}
```

**一个选择器中只能使用一个伪元素，而且伪元素必须紧跟在选择器之后。**按照最新的 W3C 规范，在定义伪元素时您应该使用双冒号 `::` 而不是单个冒号 `:`，以便区分伪类和伪元素。但由于旧版本的 W3C 规范并未对此进行特别区分，因此**目前绝大多数的浏览器都同时支持使用单冒号和双冒号两种方式来定义伪元素**。

CSS 中提供了一系列的伪元素，如下表所示：

| 伪元素         | 例子               | 例子描述                                                |
| -------------- | ------------------ | ------------------------------------------------------- |
| ::after        | p::after           | 在每个 `<p>` 元素之后插入内容                           |
| ::before       | p::before          | 在每个 `<p>` 元素之前插入内容                           |
| ::first-letter | p::first-letter    | 匹配每个 `<p>` 元素中内容的首字母                       |
| ::first-line   | p::first-line      | 匹配每个 `<p>` 元素中内容的首行                         |
| ::selection    | p::selection       | 匹配用户选择的元素部分                                  |
| ::placeholder  | input::placeholder | 匹配每个表单输入框（例如 `<input>`）的 placeholder 属性 |

:::

- 父级添加双伪元素。该方法与上一种思路类似。

```css
.clear-float::before,
.clear-float::after {
  content: "";
  /* 以表格形式显示。 */
  display: table;
}

.clear-float::after {
  clear: both;
}

.clear-float {
  *zoom: 1;
}
```

## 对开发的思考

设计网页结构的时候，我们需要先考虑好**可视区域**的尺寸。将内容先按标准流垂直分布，再设计每个块内的浮动元素（如果有需要的话）。用户使用横屏设备和竖屏设备访问的布局应该分开设计，要么有舍有得，要么暴力缩放。

设计导航栏的时候，各个元素（如 logo、分类超链接、搜索框、用户信息等）一般不直接采用 `<a>`，而是用无序 `<li>` 包裹 `<a>`，因为直接放超链接会被搜索引擎认为是**堆砌关键字**，导致被**降权**。

**专业**的代码自成一股风格，我们在开发中如果有一个统一的代码风格，对维护会有很大的便利。

单个选择器里的 CSS 属性书写顺序虽然并不会影响最终效果（在无冲突的情况下），但是如果按照以下顺序编写，会比较好：

- 布局定位属性：display/position/float/clear/visibility/overflow 等
- 自身属性：width/height/margin/padding/border/background 等
- 文本属性：color/font/text-decoration/text-align/vertical-align/white-space/break-word 等
- 其他属性（含新特性）：content/cursor/border-radius/box-shadow/text-shadow/background: linear-gradient() 等

## 定位

经过之前的学习，我们已经知道标准流可以让元素按从上到下、从左到右排列；浮动可以让块级元素从左到右/从右到左排列。

而**定位**可以让元素按照需求存在于任何地方：如固定在窗口顶端/底端/侧端，随着页面滚动，这些元素却不移动；如固定在某些元素的角/边上，甚至是“骑缝”等。

$$
定位 = 定位模式 + 边偏移
$$

**定位模式**（_position_）用于指定一个元素在文档中的定位方式，**边偏移**（_top_、_right_、_bottom_、_left_）则决定了该元素的最终位置。**两者搭配使用（同时出现）才有意义。**

_position_ 可选五个值：

| 值       | 语义         | 定位含义                                                                                                                                                               |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| static   | **静态**定位 | 默认的定位方式，即无定位（标准流），非特殊需要不采用。                                                                                                                 |
| relative | **相对**定位 | 相对其原来的位置来定位。**一般配合绝对定位的子元素使用。**一个相对定位元素是**不脱标**的，不会因为位置变化而影响其它元素。                                             |
| absolute | **绝对**定位 | 相对其**最近一级**的**有定位**父元素来定位。**若其所有父元素都没有定位，则以文档根标签为准。**一个绝对定位元素是**脱标**的，标准流元素会挤占其原有空间。               |
| fixed    | **固定**定位 | 相对窗口来定位。一个固定定位元素是**脱标**的，标准流元素会挤占其原有空间。                                                                                             |
| sticky   | **粘性**定位 | 相对窗口来定位。当元素实际偏移量大于设定偏移量的时候，它有相对定位的特性；反之，它有固定定位的特性。一个粘性定位元素总是**不脱标**的，不会因为位置变化而影响其它元素。 |

定位的脱标与浮动的脱标略有不同：定位元素脱标后，其他元素的“占用”不仅仅限于逻辑布局，内容也不会绕开定位元素来显示，即直接被覆盖。_因为浮动一开始是用来实现文字环绕效果的。_

_top_、_right_、_bottom_、_left_ 的值为偏移量，如 _top: 10px;_ 就是相对其**上准线**下移 10px，_right: -5px;_ 就是相对其**右准线**左移 -5px（也就是右移5px）。同轴的两个属性每次只能用一个，否则按照后出现的一项为准。**定位的偏移无视 _padding_ 的影响。**

为了控制多个定位元素按照需求的叠放顺序，可以设置其 z 轴权重属性 _z-index_，值越大则越处于上层，值可取全体整数。两个元素拥有同一个 _z-index_ 值时，后出现的居上。未指定元素的 _z-index_ 属性时，默认取 auto（无穷小）。**非定位元素无法使用该属性。**

**一个定位元素在显示模式上会变成行内块模式。**

### 案例：芯片外观设计

请仿照某知名美国芯片设计公司的产品宣传图，用 CSS 仿制其外观。

_master.css：_

```css
* {
  margin: 0;
  padding: 0;
}

body {
  padding: 0 15%;
}

body > .title {
  padding: 30px 0;
  line-height: 60px;
  font-size: 50px;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}

.product-intro {
  display: block;
  text-decoration: none;
  width: 240.8px;
  height: 345.6px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.product-intro:hover {
  background-color: #f8f8f8;
}

.product-intro:active {
  background-color: #f4f4f4;
}

.icon {
  width: 50%;
  padding: 12px 0 32px;
}

.soc {
  zoom: 25%;
}

.soc-id > div {
  margin: 30px auto;
}

.product-intro .title {
  color: #3253dc;
  font-size: 20px;
  margin-bottom: 12px;
}

.product-intro .subtitle {
  color: #677283;
  font-size: 16px;
  line-height: 24px;
  height: 159.6px;
  overflow-y: scroll;
}
```

_soc-sd.css：_

```css
.sd-encapsulation {
  position: relative;
  width: 300px;
  height: 300px;
  padding: 30px;
  background-image: linear-gradient(to bottom right, #555555, #252525);
  border-radius: 10px;
  border: 2px solid black;
  box-shadow:
    4px 4px 5px rgba(255, 255, 255, 0.2) inset,
    -4px -4px 5px rgba(0, 0, 0, 0.8) inset,
    16px 16px 15px rgba(0, 0, 0, 0.2);
  color: white;
}

.sd-logo {
  float: left;
  width: 120px;
  height: 120px;
  background-image: url(https://img1.imgtp.com/2023/01/09/DspAbIdF.png);
  background-size: contain;
}

.sd-model {
  float: right;
  height: 120px;
  font-size: 70px;
  line-height: 120px;
}

.sd-manufacturer {
  position: absolute;
  bottom: 80px;
  font-size: 57px;
}

.sd-brand {
  position: absolute;
  bottom: 40px;
  font-size: 40px;
}
```

_soc-sd-gold.css：_

```css
.sd-gold-encapsulation {
  position: relative;
  width: 300px;
  height: 300px;
  padding: 30px;
  background-image: linear-gradient(
    to bottom right,
    #feeba7,
    #fff5ba,
    #feeba7,
    #fde198,
    #f2cc82
  );
  border-radius: 10px;
  border: 2px solid #cea36b;
  box-shadow: 16px 16px 15px rgba(0, 0, 0, 0.2);
  color: #ea1323;
}

.sd-gold-logo {
  float: left;
  width: 120px;
  height: 120px;
  background-image: url(https://img1.imgtp.com/2023/01/09/DspAbIdF.png);
  background-size: contain;
}

.sd-gold-info {
  float: right;
  text-align: right;
}

.sd-gold-model {
  font-size: 64px;
  line-height: 72px;
}

.sd-gold-5g {
  font-size: 44px;
  line-height: 48px;
}

.sd-gold-manufacturer {
  position: absolute;
  bottom: 80px;
  font-size: 57px;
}

.sd-gold-brand {
  position: absolute;
  bottom: 40px;
  font-size: 40px;
}
```

_soc-sd-new-gold.css：_

```css
.sd-new-gold-encapsulation {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: hidden;
  padding: 30px;
  background-image: linear-gradient(
    to bottom right,
    #feeba7,
    #fff5ba,
    #feeba7,
    #fde198,
    #f2cc82
  );
  border-radius: 10px;
  border: 2px solid #cea36b;
  box-shadow: 16px 16px 15px rgba(0, 0, 0, 0.2);
  color: #ea1323;
}

.sd-new-gold-logo {
  position: absolute;
  right: -90px;
  bottom: -30px;
  width: 270px;
  height: 270px;
  background-image: url(https://img1.imgtp.com/2023/01/09/DspAbIdF.png);
  background-size: contain;
}

.sd-new-gold-brand {
  position: absolute;
  top: 30px;
  font-size: 52px;
  line-height: 52px;
}

.sd-new-gold-brand-zh {
  position: absolute;
  top: 82px;
  font-size: 40px;
  line-height: 54px;
}

.sd-new-gold-model {
  position: absolute;
  bottom: 58px;
  font-size: 82px;
  line-height: 82px;
  font-weight: 233;
}

.sd-new-gold-gen {
  position: absolute;
  bottom: 30px;
  font-size: 27px;
  line-height: 27px;
}
```

```html
<!doctype html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>骁龙特色产品</title>
    <link rel="stylesheet" href="master.css" />
    <link rel="stylesheet" href="soc-sd.css" />
    <link rel="stylesheet" href="soc-sd-gold.css" />
    <link rel="stylesheet" href="soc-sd-new-gold.css" />
  </head>

  <body>
    <h2 class="title">骁龙特色产品</h2>
    <div class="products">
      <a class="product-intro" href="soc-id.html" target="_blank">
        <div class="icon">
          <div class="soc">
            <div class="sd-encapsulation">
              <!-- 该布局为旧世代消费级骁龙SoC所设计 -->
              <div class="sd-logo"></div>
              <div class="sd-model">810</div>
              <div class="sd-manufacturer">Qualcomm</div>
              <div class="sd-brand">snapdragon</div>
            </div>
          </div>
        </div>
        <h3 class="title">这颗芯，热辣滚烫。</h3>
        <p class="subtitle">
          2014年，骁龙810成为了高通最高规格的移动芯片之一，四核Cortex-A57+四核Cortex-A53的架构让它的性能得到了非常大的提高。但是因为骁龙810是高通首次制作的一款20纳米处理器，所以经验并不丰富，其架构虽然性能很高但设计并不合理，所以导致了严重的发热。
        </p>
      </a>
      <a class="product-intro" href="soc-id.html" target="_blank">
        <div class="icon">
          <div class="soc">
            <div class="sd-gold-encapsulation">
              <!-- 该布局为旧世代末期高端消费级骁龙SoC所设计 -->
              <div class="sd-gold-logo"></div>
              <div class="sd-gold-info">
                <div class="sd-gold-model">888</div>
                <div class="sd-gold-5g">5G</div>
              </div>
              <div class="sd-gold-manufacturer">Qualcomm</div>
              <div class="sd-gold-brand">snapdragon</div>
            </div>
          </div>
        </div>
        <h3 class="title">燃烧吧，主板！</h3>
        <p class="subtitle">
          2021年，论风评最差的SoC，骁龙888说第一没人敢说第二，被喷了一整年。其最被人诟病的地方就是它的高功耗和高发热。小米11作为小米近几年来为数不多的对SoC进行封胶的小米数字系列手机，但是依旧难当骁龙888的强大“火热”。在发布没多久就出现了掉Wifi的问题，根据拆机发现，小米11的掉WIFI问题源自SoC在反复高热-冷却的循环中出现了部分区域脱焊或者是虚焊。
        </p>
      </a>
      <a class="product-intro" href="soc-id.html" target="_blank">
        <div class="icon">
          <div class="soc">
            <div class="sd-new-gold-encapsulation">
              <!-- 该布局为新世代消费级骁龙SoC所设计 -->
              <div class="sd-new-gold-logo"></div>
              <div class="sd-new-gold-brand">Snapdragon</div>
              <div class="sd-new-gold-brand-zh">骁龙</div>
              <div class="sd-new-gold-model">8</div>
              <div class="sd-new-gold-gen">第一代</div>
            </div>
          </div>
        </div>
        <h3 class="title">你口袋里的核电站。</h3>
        <p class="subtitle">
          骁龙8Gen1在性能上的表现依旧称得上「旗舰」，不过相较于上一代的骁龙888在处理器性能上的提升幅度不是很大，图形性能和AI性能才是此次提升的重点。不过如此强悍的图形性能也带来了不小的功耗，在3Dmark
          WildLife
          Unlimited测试中，骁龙8Gen1“一骑绝尘”，功耗达到11W以上，显著高于同规格的A15、麒麟9000和骁龙888+的9W左右，相比之下骁龙870的功耗仅有5W多。超强的性能和提升的功耗也带来了更严重的发热问题，搭载骁龙8Gen1的moto
          edge
          X30在光明山脉的最高画质下，机身的最高温度甚至超过了61摄氏度，超过其他骁龙888
          Plus旗舰。如果是在更为炎热的夏天，发热的表现应该会更加让人担忧。简单来说，骁龙8Gen1在CPU性能上小幅提升，GPU图形性能提升明显，极限性能依旧是安卓端最强悍的芯片；与此同时，功耗也提高了20%，效能比不如骁龙888；极限场景下发热严重，表现超过同类其他芯片，也超过前代的骁龙888。
        </p>
      </a>
    </div>
  </body>
</html>
```

亮点：

- 模块化设计芯片 ID。
- 巧妙搭配使用三大布局方式。

## 显示与隐藏

一个内容丰富的网页在显示上是有层级和取舍的。为了控制元素在合适的时候以合适的方式显示，引入 _display_、_visibility_ 和 _overflow_ 这三个属性。

_display_ 控制元素的显示模式。值为 _none_ 的时候，元素**不再**占有空间。

```css
div {
  /* 值可选 none（隐藏）、block、inline、inline-block......等 */
  display: none;
}
```

_visibility_ 控制元素的可见性。值为 _hidden_ 的时候，元素**仍然**占有空间。

```css
div {
  /* 值可选 inherit（默认，继承样式）、visible、collapse（隐藏表格行或列）、hidden */
  visibility: hidden;
}
```

_overflow_ 控制元素溢出容器的部分的处理办法。

```css
div {
  /* 值可选 visible（默认，完全显示内容）、auto（按需设置滚动）、hidden（隐藏）、scroll（设置滚动） */
  overflow: hidden;
}
```
