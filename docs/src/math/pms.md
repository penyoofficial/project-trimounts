# 概率论与数理统计

## 第一章 概率论的基本概念

### 集合论视角

事件的表示：

- 若 $B$ 是 $A$ 的子事件，记作 $B\subset A$，特殊时有 $A=B$
- $A$ 与 $B$ 至少一个发生，记作 $A\cup B$；$A$$、$$B$ 同时发生记作 $AB$ 或 $A\cap B$
- $A-B$ 表示从 $A$ 中挖去 $B$ 的部分，亦记作 $A-AB$ 或 $A\bar B$​
- 若 $A\cap B=\empty$，则两事件互斥/互不相容
- $A$ 与 $\bar A$ 互逆/对立

基本运算律：

- 交换律
- 结合律
- 分配律
- 对偶律：$\overline{A\cup B}=\bar A\cap\bar B=\bar A\bar B$；$\overline{AB}=\overline{A\cap B}=\bar A\cup\bar B$​

### 概率公理化

基本原则：

- 非负性：$P(A)\ge 0$​（任何事件发生的概率都大于等于 0）
- 规范性：$P(\Omega)=1$​（全部事件发生的概率和为 1）；$P(\empty)=0$
- 可列可加性：设 $A_i$、$A_j$ 间互不相容，$P(A_1\cup A_2\cap...)=P(A_1)+P(A_2)+...$

几大重要结论：

- 逆事件概率：$P(\bar A)=1-P(A)$
- 加法公式：$P(A\cup B)=P(A)+P(B)-P(AB)$
- 减法公式：$P(A\bar B)=P(A-B)=P(A-AB)=P(A)-P(AB)$
- 当 $AB=\empty$ 时，$P(AB)=0$；当 $A$、$B$ 相互独立时，$P(AB)=P(A)P(B)$
- 若 $A$、$B$ 相互独立，则 $\bar A$ 与 $B$ 相互独立、$A$ 与 $\bar B$ 相互独立、 $\bar A$ 与 $\bar B$​ 相互独立

### 条件概率

在 $A$ 发生后 $B$ 发生的概率，记作 $P(B|A)$​，它仍然满足概率定义的三个条件。

两大重要公式：

- 乘法公式：$P(AB)=P(B|A)P(A)$
- 全概率公式：$P(A)=\sum P(A|B_i)P(B_i)$
- _贝叶斯公式（揉合了上列两者）_：$P(B_i|A)=\dfrac{P(A|B_i)P(B_i)}{\sum P(A|B_j)P(B_j)}$​

## 第二章 随机变量及其分布

### 基本概念

- 随机变量分为离散型和连续型。离散型常用分布律表表示；连续型常用概率密度函数和分布函数表示。
- 分布函数 $F(x)=P\{X\le x\}\in[0,1]$，其中 $F(-\infty)=0,F(+\infty)=1$ .​
- $P\{a<X\le b\}=F(b)-F(a)$ .
- 概率密度函数积分的结果是分布函数。
- 连续型的 $F(x<x_0)=\int_{-\infty}^{x_0}f(x)\mathrm dx$，其中任意一点 $P(x=x_a)=0$ .

### 常见分布律

| 名称              | 记法                                                | 表达式/密度函数                                                                           | 期望（$E(X)$） | 方差（$D(X)$）        |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------- | --------------------- |
| 两点分布/0-1 分布 | $X\sim B(1,p)$                                      | <br>$P\{X=k\}=p^k(1-p)^{1-k}$<br>                                                         | $p$            | $p(1-p)$              |
| 二项分布          | $X\sim B(n,p)$                                      | <br>$P\{X=k\}=C_n^kp^k(1-p)^{n-k}$<br>                                                    | $np$           | $np(1-p)$             |
| 泊松分布          | $X\sim\pi(\lambda)$ 或 $X\sim P(\lambda)$           | <br>$P\{X=k\}=\dfrac{\lambda^k}{k!}e^{-\lambda}$<br>                                      | $\lambda$      | $\lambda$             |
| 均匀分布          | $X\sim U(a,b)$                                      | <br>$f(x)=\begin{cases} \dfrac1{b-a}&a<x<b \\ 0&others \end{cases}$<br>                   | $\dfrac{a+b}2$ | $\dfrac{(b-a)^2}{12}$ |
| 指数分布          | $X\sim E(\theta)$                                   | <br>$f(x)=\begin{cases} \dfrac1\theta e^{-\frac1\theta x}&x>0 \\ 0&x\le0 \end{cases}$<br> | $\theta$       | $\theta^2$            |
| 正态分布/高斯分布 | $X\sim\mu(\mu,\sigma^2)$ 或 $X\sim N(\mu,\sigma^2)$ | <br>$f(x)=\dfrac1{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$<br>                 | $\mu$          | $\sigma^2$            |
| _标准正态分布_    | $X\sim\mu(0,1)$                                     | <br>$f(x)=\dfrac1{\sqrt{2\pi}}e^{-\frac{x^2}2}$<br>                                       | $0$            | $1$                   |

### 随机变量函数分布

若已知 $x\sim f_X(x)$，则可得到 $y\sim f_Y(y)=f_X(h(y))|h'(y)|$。其中 $h(y)$ 是 $X$ 到 $Y$​ 关系的反函数。

## 第三章 多维随机变量及其分布

抽象地来说，$\begin{cases} f_X(x)=\int_{-\infty}^{+\infty}f(x,y)\mathrm dy \\ f_Y(y)=\int_{-\infty}^{+\infty}f(x,y)\mathrm dx \end{cases}$ 是 $(X,Y)$ 的边缘概率密度。

多元密度函数的积分也为 $1$：$\int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}f(x,y)\mathrm dx\mathrm dy=1$ .

从二维区域任取一片子区域的概率为：$P((X,Y)\in G)=\iint\limits_Gf(x,y)\mathrm dx\mathrm dy$ .

$X$、$Y$ 相互独立 $\iff f(x,y)=f_X(x)f_Y(y)$ .

若 $X$、$Y$ 相互独立，且 $X\sim\mu(\mu_1,\sigma_1^2)$、$Y\sim\mu(\mu_2,\sigma_2^2)$，则 $(X\pm Y)\sim\mu(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$ .

## 第四章 随机变量的数字特征

### 期望

$E(X)=\begin{cases} 离散型&\sum x_ip_i \\ 连续型&\int_{-\infty}^{+\infty}xf(x)\mathrm dx \end{cases}$​ .

若存在常数 $C$：$\begin{cases} E(C)=C \\ E(E(X))=E(X) \\ E(CX)=C·E(X) \end{cases}$​ .

$E(X\pm Y)=E(X)\pm E(Y)$​ .

$E(XY)=E(X)E(Y)+E((X-E(X))(Y-E(X)))$ .

若 $X$、$Y$ 相互独立，$E((X-E(X))(Y-E(X)))=0$ .

### 方差

$D(X)=E^2(X-E(X))=E(X^2-2X·E(X)+E^2(X))=E(X^2)-E^2(X)$​ .

若存在常数 $C$：$\begin{cases} D(C)=0 \\ D(E(X))=0 \\ D(CX)=C^2·D(X) \end{cases}$ .

$D(X\pm Y)=D(X)+D(Y)\pm 2E((X-E(X))(Y-E(Y)))$ .

### 协方差

$Cov(X,Y)=E((X-E(X))(Y-E(Y)))=E(XY)-E(X)E(Y)$​ .

$Cov(X,X)=D(X)$ .

$Cov(X,Y)=Cov(Y,X)$ .

若存在常数 $C$：$Cov(X,C)=0$ .

若存在常数 $a$、$b$：$Cov(aX,bY)=ab·Cov(X,Y)$​ .

$Cov(X_1+X_2,Y)=Cov(X_1,Y)+Cov(X_2,Y)$​ .

相关系数：$\rho_{XY}$ 用于表达 $X$ 与 $Y$ 之间的相关性。

$\rho_{XY}=\dfrac{Cov(X,Y)}{\sqrt{D(X)D(Y)}}$ .

若 $X$、$Y$ 相互独立，$\rho_{XY}=0$；若 $\rho_{XY}=1$，则 $X$ 与 $Y$​ 呈线性相关。

特别地，若 $(X,Y)\sim\mu(\mu_1,\mu_2,\sigma_1^2,\sigma_2^2,\rho_{XY})$，则：$X$、$Y$ 相互独立 $\iff\rho_{XY}=0$ .

## 第五章 大数定律及中心极限定理

_证明了“频率代替概率”。_

$X\sim B(n,p)\xrightarrow{n\to+\infty}X\sim\mu(np,np(1-p))$ .

## 第六章 样本及抽样分布

### 统计量

若 $X_1,X_2,...$ 为样本，则 $g(X_1,X_2,...)$ 为统计量。

常见的统计量：

| 名称              | 记法                                       |
| ----------------- | ------------------------------------------ |
| 均值              | <br>$\bar X=\dfrac1n\sum X_i$<br>          |
| 方差              | <br>$S^2=\dfrac1{n-1}\sum(X_i-\bar X)$<br> |
| 标准差            | <br>$S=\sqrt{S^2}$<br>                     |
| 样本 $k$ 阶原点矩 | <br>$A_k=\dfrac1n\sum X_i^k$<br>           |
| 中心矩            | <br>$B_k=\dfrac1n\sum(X_i-\bar X)^k$<br>   |

### 四大重要分布

- Z 分布：

  $$
  Z=\dfrac{\bar X-\mu}{\frac\sigma{\sqrt n}}\sim\mu(0,1)
  $$

- $\chi^2$ 分布：

  $$
  X\sim\mu(0,1)\rarr X^2\sim\chi^2(1)
  $$

- T 分布：

  $$
  t=\dfrac{X\sim\mu(0,1)}{\sqrt\frac Yn\sim\chi^2(n)}\rarr t\sim t(n)
  $$

- F 分布：

  $$
  F=\dfrac{\frac U{n_1}}{\frac Y{n_2}}\sim F(n_1,n_2)
  $$

## 第七章 参数估计

### 点估计

点估计分为**矩估计**和**最大似然估计**。通式为 $x\sim F(x,\theta)$，其中 $\theta$ 未知。

**若利用矩求解** $\theta$，则该方法被称为矩估计：

$$
E(x^k)=A_k=\dfrac1n\sum x_i^k
$$

特别地，当 $k=1$ 时：

$$
E(x)=\bar X
$$

这里面的 $E(x)$ 就是想要的 $\hat\theta$（也就是 $\theta$，只是在结果中要换种写法）。

**若利用函数求解** $\theta$，则该方法被称为最大似然估计：

1. 建立似然函数：$L(x_i,\theta)=f(x_1,\theta)·f(x_2,\theta)·...·f(x_n,\theta)$
2. 双边取对：$\ln{L(x_i,\theta)}=\sum f(x_i,\theta)$
3. 令 $(\ln{L(x_i,\theta)})'=0$，求 $\theta$
4. $\theta$ 即是所需的 $\hat\theta$

### 区间估计

区间估计通式为 $x\sim\mu(\mu,\sigma^2)$（正态分布），若：

- $\sigma$ 已知，置信区间在 $\bar X\pm\dfrac\sigma{\sqrt n}z_\frac a2$ 之间（z 分布）
- $\sigma$ 未知，置信区间在 $\bar X\pm\dfrac S{\sqrt n}t_\frac a2(n-1)$ 之间（t 分布）

如果是 $\chi^2$ 分布，则置信区间为 $(\dfrac{(n-1)S^2}{\chi_{\frac\alpha2}^2(n-1)},\dfrac{(n-1)S^2}{\chi_{1-\frac\alpha2}^2(n-1)})$

## 第八章 假设检验

### 小概率事件

$\alpha\le0.05$ 的事件为小概率事件，在单次实验中几乎不发生。

### 两大重要检验

> 警告，分布与检验是两个不同的概念！

若总体标准差：

- 已知：使用 **z 检验**：$z=\dfrac{\bar X-\mu}{\frac\sigma{\sqrt n}}\sim N(\mu,\sigma^2)$
- 未知：使用 **t 检验**：$t=z=\dfrac{\bar X-\mu}{\frac S{\sqrt n}}\sim t(n-1)$

### 一般流程

1. 提出假设
2. 判断使用 z 或 t 检验
3. 画（正态分布）图，检查拒绝域
4. 将数据全部代入分布表达式，检查值与拒绝域的关系：拒绝或接受假设
