# 现代加密

现代加密主要指的是**非对称加密**。

**非对称式密码学**（Asymmetric cryptography）也称**公开密钥密码学**（Public-key cryptography），是密码学的一种算法，它需要两个密钥，一个是**公开密钥**，另一个是**私有密钥**；公钥用作加密，私钥则用作解密。使用公钥把明文加密后所得的密文，只能用相对应的私钥才能解密并得到原本的明文，最初用来加密的公钥不能用作解密。由于加密和解密需要两个不同的密钥，故被称为非对称加密；不同于加密和解密都使用同一个密钥的对称加密。公钥可以公开，可任意向外发布；私钥不可以公开，必须由用户自行严格秘密保管，绝不透过任何途径向任何人提供，也不会透露给被信任的要通信的另一方。

公钥专用于加密，私钥专用于解密。接收者在本地生成密钥后，将公钥通过网络传送给发送者，私钥永远留在本地。发送者用公钥对全部信息加密，再发给接收者，让其用私钥解密。全程解密的关键都没有暴露在网络中，只有公钥和密文暴露，这便确保了安全。

基于公开密钥加密的特性，它还能提供数字签名的功能，使电子文件可以得到如同在纸本文件上亲笔签署的效果。

## 爱丽丝与鲍勃问题

爱丽丝（Alice）与鲍伯（Bob）是广泛地代入密码学和物理学领域的通用角色。除了爱丽丝和鲍伯，还有其他相关角色。这些名称是为了方便说明议题，类似“甲想发送消息给乙”。在密码学和电脑安全中，存在很多这一系列的惯用角色名称，通常是用作代表一些领域。而在典型的协议执行中，这些人物不一定是一个“人类”，而可能是一个可信赖的自动式代理人（如电脑程序）。使用这些名称有助说明的结构，有时也会用作幽默。

| 中文名称             | 英文名称                 | 涵义                                                                                                                                      |
| -------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 爱丽丝、鲍伯         | Alice and Bob            | 大部分情况下，爱丽丝希望把一则消息或密钥发送给鲍伯。                                                                                      |
| 卡罗尔／卡罗斯／查理 | Carol, Carlos or Charlie | 通信中的第三位参加者。                                                                                                                    |
| 戴夫                 | Dave                     | 通信中的第四位参加者。                                                                                                                    |
| 伊夫                 | Eve or Yves              | 偷听者（eavesdropper），但行为通常是被动的。她拥有偷听的技术，但不会中途篡改发送的消息。在量子密码学中，伊夫也可以指环境（environment）。 |
| 艾萨克               | Isaac                    | 代表互联网服务供应商（ISP）。                                                                                                             |
| 伊凡                 | Ivan                     | 商业密码学中的发行人。                                                                                                                    |
| 贾斯汀               | Justin                   | 代表司法机关。                                                                                                                            |
| 马洛里               | Mallory                  | 恶意攻击者，会篡改发送的消息。                                                                                                            |
| 马提尔达             | Matilda                  | 商人，常用于电子商务。                                                                                                                    |
| 奥斯卡               | Oscar                    | 敌人的代名词，通常与马洛里相似。                                                                                                          |
| 佩吉／帕特           | Peggy or Pat             | 证明者（prover），用于证实一项事件是否有实际进行。                                                                                        |
| 维克托               | Victor                   | 证明者（prover），用于证实一项事件是否有实际进行。                                                                                        |
| 普特                 | Plod or Officer Plod     | 执法官员的代名词，源自儿童文学《诺弟》中的角色“普特先生”。                                                                                |
| 史蒂夫               | Steve                    | 隐写术（Steganography）的代表。                                                                                                           |
| 特伦特               | Trent                    | 可信赖的仲裁人。                                                                                                                          |
| 特鲁迪               | Trudy                    | 侵入者。                                                                                                                                  |
| 沃尔特               | Walter                   | 看守人。                                                                                                                                  |
| 佐伊                 | Zoe                      | 安全协议中的最后参与者。                                                                                                                  |

## RSA

RSA 是由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）在 1977 年一起提出的。当时他们三人都在麻省理工学院工作。RSA 就是他们三人姓氏开头字母拼在一起组成的。

RSA **公钥**和**私钥**的产生过程如下：

1. 选出两个较大的质数 $p$ 和 $q$；

   :::tip
   较大通常是 $2^{2048}$ 比特（即 RSA2048 标准）。
   :::

2. 求出它们的乘积 $N=pq$；
3. 求 $N$ 为自变量时，欧拉函数的值 $\phi(N)=\phi(pq)=(p-1)(q-1)$；

   :::tip
   若 $n$ 为质数，$\phi(n)=n-1$。
   :::

4. 选出一个 $e$ 令 $1<e<\phi(N)$ 且 $e$ 与 $\phi(N)$ 互质；
5. 求得 $e$ 对 $\phi(N)$ 的模逆元 $d$；

   :::tip
   整数 $a$ 对**同余** $n$ 的模逆元 $b$ 满足下式：

   $$
   ab\mod n=1
   $$

   :::

6. 此时公钥对是 $(N,e)$，私钥对是 $(N,d)$；
7. 销毁 $p$、$q$。

明文 $n$ 与密文 $c$ 转换关系如下：

$$
c=n^e\mod N \\
n=c^d\mod N
$$

RSA 也可以用来为一个消息署名。假如 Alice 想给 Bob 传递一个**署名**的消息的话，那么她可以为她的消息计算一个散列值（Message digest），然后用她的私钥“加密”（如同前面“加密消息”的步骤）这个散列值并将这个“署名”加在消息的后面。这个消息只有用她的公钥才能被解密。Bob 获得这个消息后可以用 Alice 的公钥“解密”（如同前面“解密消息”的步骤）这个散列值，然后将这个数据与他自己为这个消息计算的散列值相比较。假如两者相符的话，那么 Bob 就可以知道发信人持有 Alice 的私钥，以及这个消息在传播路径上没有被篡改过。

由于计算私钥需要 $p$ 和 $q$，因此要想破解它，必须从公钥入手，设法拆解质因子。

1994 年，彼得·秀尔证明一台量子计算机可以在多项式时间内进行因数分解。假如量子计算机有朝一日可以成为一种可行的技术的话，那么秀尔的算法可以淘汰 RSA 和相关的派生算法。（即依赖于分解大整数困难性的加密算法）

假如有人能够找到一种有效的分解大整数的算法的话，或者假如量子计算机可行的话，那么在解密和制造更长的钥匙之间就会展开一场竞争。但从原理上来说 RSA 在这种情况下是不可靠的。

## 零知识证明

## 拜占庭困境

## 区块链基础
