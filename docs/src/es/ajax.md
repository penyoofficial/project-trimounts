# AJAX 技术

:::tip
异步编程和多线程编程并非相同！
:::

**异步编程**是指在执行代码时，不会等待某个操作（例如异步请求或读取文件）完成后再进行下一个操作，而是将它们设置成异步操作并继续执行其他代码。当操作完成时，将会执行回调函数。所有的异步编程技术实际上都是对 **AJAX**（Asynchronous JavaScript and XML）技术的封装。

JS 中的异步编程可以使用回调函数、Promise、async/await 等方式来实现。

## 回调函数

回调函数是从异步代码中获取结果的一种机制。它允许**将一个函数作为参数传递给另一个函数**，并**在之后的某个时间点调用**（条件触发）。

```js
function asyncFunc(callback) {
  setTimeout(function () {
    callback("Hello World");
  }, 2000);
}

asyncFunc(function (result) {
  console.log(result);
});
```

在以上示例中，asyncFunc 是一个异步函数，它的回调函数被设置为在 2 秒后调用，返回 'Hello World'。当我们调用 asyncFunc 并将回调函数作为参数传递时，会在回调函数返回之前先执行其他代码。

## XMLHttpRequest 对象

XMLHttpRequest 技术是对 AJAX 的实现，它用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject，以下默认这部分不再被需要）。

使用 XMLHttpReques 一般有以下步骤：

1. 创建 XMLHttpRequest 对象：

   ```js
   let xhr = new XMLHttpRequest();
   ```

2. 设置请求的处理函数：可以通过 onload、onerror 等属性来设置请求成功或者失败时的处理函数，例如：

   ```js
   xhr.onload = function () {
     // 处理请求成功的响应
   };

   xhr.onerror = function () {
     // 处理请求失败的情况
   };
   ```

3. 打开与服务器的连接：

   ```js
   xhr.open("GET", "/example");
   ```

   其中第一个参数为请求方法，例如 'GET'、'POST' 等，第二个参数为服务器路径。

4. 发送请求：

   ```js
   xhr.send();
   ```

5. 获取服务器响应：

   ```js
   xhr.responseText;
   ```

   这个属性将返回从服务器接收到的响应文本，可以根据需要进行解析和处理。

## Promise

Promise 是 ES6 中的一个新特性，它是一个对象，表示某个未来才会知道结果的操作（通常是异步操作）。它可以通过链式调用来追踪执行成功或失败的结果，并在每个阶段执行相应的操作。

```js
function asyncFunc() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Hello World");
    }, 2000);
  });
}

asyncFunc()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error(error);
  });
```

在以上示例中，我们定义了一个异步函数 asyncFunc，并返回一个 Promise 对象。当异步操作成功时，我们调用 resolve 方法并传入结果，如果操作失败，则调用 reject 方法并传入错误。当我们调用 asyncFunc() 时，将返回一个 Promise 对象，我们可以使用 then 方法来处理异步操作成功后的结果，通过 catch 方法来处理错误。

## async/await

async/await 是 ES8 中的一个新特性，它提供了一种更简单的方法来编写异步代码。它使用 async 和 await 关键字来向函数中添加异步行为。

```js
function asyncFunc() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Hello World");
    }, 2000);
  });
}

async function printResult() {
  const result = await asyncFunc();
  console.log(result);
}

printResult();
```

在以上示例中，我们定义了一个异步函数 asyncFunc，并返回一个 Promise 对象。在 printResult 函数中，我们将 async 关键字添加到函数前缀中，并使用 await 关键字等待 asyncFunc 的异步操作完成。当函数执行到 await 关键字时，它会等待异步操作完成，然后将结果存储在变量 result 中，之后打印结果。我们直接调用 printResult 函数，JS 引擎在遇到 await 关键字时会暂停并等待异步操作的结果返回。

## axios

axios 是一个前端常用的基于 Promise 的 HTTP 请求库。使用 axios 可以轻松地发起 GET、POST 等类型的 HTTP 请求，并且支持拦截器、并发请求、取消请求等功能。它也可以配合其他库或框架使用，例如 React、Vue 等。

使用 axios 发送 GET 请求非常简单，只需通过 axios.get() 方法传入 URL 即可。以下是一个示例：

```js
axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

这将向目标地址发送一个 GET 请求，并返回响应数据或错误信息。需要注意的是，axios 对响应状态码进行了处理，所以不必自己检查状态码。

使用 POST 方法发送数据：

```js
axios
  .post("/api/user", {
    firstName: "John",
    lastName: "Doe",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
