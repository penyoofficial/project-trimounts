# WebAPI

**BOM**（Browser Object Model）是指**浏览器对象模型**，它是指浏览器窗口的一些对象，例如 _window_、_location_、_history_ 等，通过这些对象可以操作浏览器的窗口、地址栏、历史记录等。而 **DOM**（Document Object Model）是指**文档对象模型**，它是指 HTML 或 XML 文档的对象表示方式，通过这些对象可以操作 HTML 或 XML 文档的内容和结构。在 JavaScript 中，我们通常使用 DOM 操作来处理网页上的事件，例如动态添加 HTML 元素、改变 CSS 样式、响应用户的点击事件等等。

BOM 和 DOM 操作都属于 WebAPI 的一部分，仅 JS 在浏览器中运行时才可用。

## BOM

常见的 BOM 操作及其方法名和用途如下：

1. window 对象：表示当前浏览器窗口或标签页，它具有很多属性和方法，包括：
   - alert()：弹出一个警告框，显示一段文本信息。
   - confirm()：弹出一个确认框，显示一段文本信息，并提供“确定”和“取消”两个按钮。
   - prompt()：弹出一个对话框，提示用户输入一些文本信息，并返回用户输入的内容。
1. location 对象：表示当前文档的URL地址，它具有很多属性和方法，包括：
   - href：获取或设置当前文档的URL地址。
   - assign()：加载一个新的文档，替换当前文档。
   - replace()：加载一个新的文档，但不保留历史记录，不能通过“后退”按钮返回原来的文档。
   - reload()：重新加载当前文档。
1. navigator 对象：表示当前浏览器的信息，包括：
   - userAgent：获取浏览器的用户代理信息。
   - platform：获取浏览器运行的平台。
1. screen 对象：表示当前设备屏幕的信息，包括：
   - width：获取屏幕的宽度。
   - height：获取屏幕的高度。
   - availWidth：获取屏幕可用的宽度。
   - availHeight：获取屏幕可用的高度。
1. history 对象：表示当前浏览器访问历史记录，包括：
   - back()：返回上一页。
   - forward()：前进到下一页。
   - go()：跳转到指定的历史页面。

## DOM

DOM 将 HTML 文档解析为一个**树形结构**，以便 JS 可以对页面元素进行访问和操作。

DOM 操作最常见的方式是通过 JS 获取页面元素并修改其属性、内容或样式。以下是 DOM 操作的一些示例：

1. 获取元素：

   ```js
   const element = document.getElementById("elementId");
   ```

2. 修改元素内容：

   ```js
   element.innerHTML = "New content";
   ```

3. 修改元素属性：

   ```js
   element.setAttribute("class", "newClass");
   ```

4. 添加新元素：

   ```js
   const newElement = document.createElement("div");
   newElement.innerHTML = "New element";
   element.appendChild(newElement);
   ```

5. 移除元素：

   ```js
   element.parentNode.removeChild(element);
   ```

6. 监听事件：

   ```js
   element.addEventListener("click", function () {
     // Handle click event
   });
   ```

DOM 操作非常强大，可以实现各种复杂的页面效果。但是，过度的 DOM 操作可能会影响页面性能和用户体验，因此需要在编写代码时谨慎使用。
