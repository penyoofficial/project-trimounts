# 网络通信

在这一章中，我们主要研究客户端和服务端之间的通讯办法。

## 基本概念

- 计算机网络：是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统、网络管理软件及网络通信协议的管理和协调下，实现资源共享和信息传递的计算机系统。
- 网络编程：在网络通信协议下，实现网络互联的不同计算机上运行的程序间可以进行数据交换。
- 通信三要素：
  - IP——设备的标识
    - IP 地址分为两类：
      - IPv4：是给每个连接在网络上的主机分配一个 32 bit 地址。按照 TCP/IP 规定，IP 地址用二进制来表示，每个 IP 地址长 32 bit，也就是 4 个字节。例如一个采用二进制形式的 IP 地址是11000000 10101000 00000001 01000010。为了方便使用，IP 地址经常被写成十进制的形式，中间使用符号 `.` 分隔不同的字节。于是，上面的 IP 地址可以表示为 192.168.1.66。IP 地址的这种表示法叫做**点分十进制表示法**，这显然比 1 和 0 容易记忆得多。
      - IPv6：由于互联网的蓬勃发展，IP 地址的需求量愈来愈大，但是网络地址资源有限，使得 IP 的分配越发紧张。为了扩大地址空间，通过 IPv6 重新定义地址空间，采用 128 位地址长度，每 16 个字节一组，分成 8 组十六进制数，这样就解决了网络地址资源数量不够的问题。
    - 在终端中可使用这两条与 IP 相关的命令：
      - ipconfig：查看本机 IP 地址。
      - ping _IP_：检查网络是否连通。
    - 127.0.0.1 通常代表本机（_localhost_）。
  - 端口——应用程序的标识
    - 端口号：用两个字节表示的整数，它的取值范围是 0\~65535。其中，0\~1023 之间的端口号用于一些知名的网络服务和应用，普通的应用程序建议使用 1024 以上的端口号。如果端口号被另外一个服务或应用所占用，会导致当前程序启动失败。
  - 协议——数据传输的规则
    - [用户数据报协议（User Datagram Protocol）](#udp-通信协议)：UDP 是无连接通信协议, 即在数据传输时，数据的发送端和接收端不建立逻辑连接。简单来说，当一台计算机向另外一台计算机发送数据时，发送端不会确认接收端是否存在，就会发出数据，同样接收端在收到数据时，也不会向发送端反馈是否收到数据。由于使用 UDP 协议消耗资源小，通信效率高，所以通常都会用于音频、视频和普通数据的传输。例如视频会议通常采用 UDP 协议，因为这种情况即使偶尔丢失一两个数据包，也不会对接收结果产生大影响。但是在使用 UDP 协议传送数据时，由于 UDP 的面向无连接性，不能保证数据的完整性，因此在传输重要数据时不建议使用 UDP 协议。
    - [传输控制协议（Transmission Control Protocol）](#tcp-通信协议)：TCP 协议是面向连接的通信协议，即传输数据之前，在发送端和接收端建立逻辑连接，然后再传输数据，它提供了两台计算机之间可靠无差错的数据传输。在 TCP 连接中必须要明确客户端与服务器端，由客户端向服务端发出连接请求，每次连接的创建都需要经过”三次握手”。
      - 三次握手：TCP 协议中，在发送数据的准备阶段，客户端与服务器之间的三次交互，以保证连接的可靠。第 1 次握手，客户端向服务器端发出连接请求，等待服务器确认。第 2 次握手，服务器端向客户端回送一个响应，通知客户端收到了连接请求。第 3 次握手，客户端再次向服务器端发送确认信息，确认连接。完成三次握手，连接建立后，客户端和服务器就可以开始进行数据传输了。由于这种面向连接的特性，TCP 协议可以保证传输数据的安全，所以应用十分广泛。例如上传文件、下载文件、浏览网页等。

## InetAddress 类

为了方便我们对 IP 地址的获取和操作，Java 提供了 `InetAddress` 类，此类表示 Internet 协议（IP）地址。

下列一些需要掌握的构造器和普通方法：

| 方法名                                    | 说明                                                             |
| ----------------------------------------- | ---------------------------------------------------------------- |
| static InetAddress getByName(String host) | 确定主机名称的 IP 地址。主机名称可以是机器名称，也可以是 IP 地址 |
| String getHostName()                      | 获取此 IP 地址的主机名                                           |
| String getHostAddress()                   | 返回文本显示中的 IP 地址字符串                                   |

## UDP 通信协议

UDP 协议是一种**不可靠**的网络协议，它在通信的两端各建立一个 **Socket** 对象，但是这两个 Socket 只是发送、接收数据的对象，因此对于基于 UDP 协议的通信双方而言，没有所谓的客户端和服务器的概念。

Java 提供了 `DatagramSocket` 类作为基于 UDP 协议的 Socket。

下面演示向其他主机发送数据的过程：

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class Sender {
    public static void main(String[] args) throws Exception {
        // 建立套接字对象
        DatagramSocket ds = new DatagramSocket();

        // 打包数据，使用套接字包的构造器：
        // DatagramPacket(byte[] buf, int length, InetAddress address, int port)
        byte[] b = "你是一个一个一个......啊啊啊！".getBytes();
        DatagramPacket dp = new DatagramPacket(b, b.length, InetAddress.getByName("127.0.0.1"), 23333);

        // 发送数据包
        ds.send(dp);

        // 关闭传输（流）
        ds.close();
    }
}
```

下面演示从其他主机接收数据的过程：

```java
import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class Receiver {
    public static void main(String[] args) throws Exception {
        // 建立套接字对象但指定端口
        DatagramSocket ds = new DatagramSocket(23333);

        // 创建数据包用于接收数据
        // DatagramPacket(byte[] buf, int length)
        byte[] b = new byte[1024];
        DatagramPacket dp = new DatagramPacket(b, b.length);

        // 接收数据包
        ds.receive(dp);

        // 获取数据及其长度，并输出结果到控制台
        System.out.println(new String(dp.getData(), 0, dp.getLength()));

        // 关闭传输（流）
        ds.close();
    }
}
```

通过同时运行这两段程序（接收端需要比发送端先启动），我们在接收端的终端上能看见结果：

```txt
你是一个一个一个......啊啊啊！
```

## TCP 通信协议

TCP 通信协议是一种**可靠**的网络协议，它在通信的两端各建立一个 `Socket` 对象，从而在通信的两端形成网络虚拟链路。一旦建立了虚拟的网络链路，两端的程序就可以通过虚拟链路进行通信。

Java 对基于 TCP 协议的的网络提供了良好的封装，使用 `Socket` 对象来代表两端的通信端口，并通过 `Socket` 产生 IO 流来进行网络通信。Java 为客户端提供了 `Socket` 类，为服务器端提供了 `ServerSocket` 类。

客户端：

```java
import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

public class Client {
    public static void main(String[] args) throws IOException {
        // 创建客户端的 Socket 对象
        // Socket (InetAddress address, int port) 创建流套接字并將其连接到指定IP地址的指定端口号
        // Socket s = new Socket(InetAddress.getByName("192.168.1.66"), 10800);
        // Socket (String host, int port) 创建流套接字并将其连接到指定主机上的指定端口号
        Socket s = new Socket("192.168.1.66", 10000);

        // 获取输出流，写数据
        // OutputStream getoutputStream() 返回此套接字的输出流
        OutputStream os = s.getOutputStream();
        os.write("hello,tcp,我来了".getBytes());

        // 释放资源
        s.close();
    }
}
```

服务端：

```java
import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class ServerDemo {
    public static void main(String[] args) throws IOException {
        // 创建服务器端的 Socket 对象
        // ServerSocket(int port) 创建绑定到指定端口的服务器套接字
        ServerSocket ss = new ServerSocket(10000);

        // Socket accept() 侦听要连接到此套接字并接受它
        Socket s = ss.accept();

        // 获取输入流，读数据，并把数据显示在控制台
        InputStream is = s.getInputStream();
        byte[] bys = new byte[1024];
        int len = is.read(bys);
        String data = new String(bys, 0, len);
        System.out.println("数据是: " + data);

        // 释放资源
        s.close();
        ss.close();
    }
}
```
