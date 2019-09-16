# Promiz
**这是一个Promises/A+规范的简单实现**
> 关于[Promises/A+](http://blog.vear.vip/2019/09/14/2019-09-14%20Promises%20A+%E8%A7%84%E8%8C%83/)，请点击[这里](http://blog.vear.vip/2019/09/14/2019-09-14%20Promises%20A+%E8%A7%84%E8%8C%83/)查看具体的规范。

首先定义一个class，这是我们实现Promise的基础
```javascript
class Promiz {
  constructor(executor) { // Promiz的构造器接收一个函数
    executor() 
  }
}

new Promiz(() => {
  console.log('executor 函数被执行了')
})
```