# Promiz
**这是一个Promises/A+规范的简单实现**
> 关于[Promises/A+](http://blog.vear.vip/2019/09/14/2019-09-14%20Promises%20A+%E8%A7%84%E8%8C%83/)，请点击[这里](http://blog.vear.vip/2019/09/14/2019-09-14%20Promises%20A+%E8%A7%84%E8%8C%83/)查看具体的规范。

## 首先定义一个Promiz类，用以实现Promise
这是我们实现Promise的基础。
```javascript
class Promiz {
  constructor(executor) { // Promiz的构造器接收一个函数
    executor() 
  }
}

new Promiz(() => {
  console.log('executor 函数被执行了')
})
// executor 函数被执行了
```
## 关于Promise的状态
一个 promise 有且只有一个状态（pending，fulfilled(resolved)，rejected 其中之一）
```javascript
class Promiz {
  static PENDING = 'pending'
  static RESOLVED = 'resolved' // 方便理解，使用resolved代替fulfilled
  static REJECTED = 'rejected'
  constructor(executor) { // Promiz的构造器接收一个函数
    this.status = Promiz.PENDING
    executor()
  }
}
const promiz = new Promiz(() => {
  console.log('executor 函数被执行了')
})
console.log(promiz) // Promiz {status: "pending"}
```

## Promise是一个容器
用于存放异步/同步的处理，并不是说new Promise()是一个异步对象。

***参照规范***

Promise的构造器将接收一个executor函数，而这个函数又接收2个参数：resolve和reject。
- resolve 这是一个function，当executor中的异步/同步操作完成时，调用之
  - 接收一个参数value
  - 调用它，会导致当前Promise对象的状态从`pending`变成`resolved`且不可逆
- reject 这是一个function，当executor中的异步/同步操作失败时，调用之
  - 接收一个参数reason
  - 调用它，会导致当前Promise对象的状态从`pending`变成`rejected`且不可逆
```javascript
class Promiz {
  static PENDING = 'pending'
  static RESOLVED = 'resolved' // 方便理解，使用resolve代替fulfilled
  static REJECTED = 'rejected'
  constructor(executor) { // Promiz的构造器接收一个函数
    this.status = Promiz.PENDING
    executor(this.resolve.bind(this), this.reject.bind(this)) // 这个函数接收2个函数，resolve函数在异步/同步操作成功时执行，reject函数在异步/同步操作失败时执行，具体由Promiz对象创建者来选择执行哪一个
  }
  resolve(value) {
    if (this.status === Promiz.PENDING) {
      this.status = Promiz.RESOLVED
    }
  }
  reject(reason) {
    if (this.status === Promiz.PENDING) {
      this.status = Promiz.REJECTED
    }
  }
}

const promiz =  new Promiz((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 500)
})
console.log(promiz) // Promiz {status: "resolved"}
```