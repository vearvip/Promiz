# Promiz
**这是一个Promise的简版实现**
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
上面resolve、reject接收的value，和reason并没有被用到，在这又涉及到Promise的一个至关重要的方法 **then**

## Promise的then方法
先来看then方法的定义：

- 一个 promise 的 then 方法接受两个可选参数
  - onFulfilled(onResolved)
    - 如果onResolved不是函数，则会被忽略
    - 如果onResolved是函数，一定是在 promise 是 fulfilled 状态后调用，并且接受一个参数 **value**
    - 它最多被调用一次

  - onRejected
    - 如果onRejected不是函数，则会被忽略
    - 如果onRejected是函数，一定是在 promise 是 fulfilled 状态后调用，并且接受一个参数 **reason**
    - 它最多被调用一次

- 在同一个 promise 实例中，then 可以链式调用多次
- then 方法一定返回一个 promise

上面几点是比较简单且不全面的定义，更全面的定义请参考[Promises/A+规范](http://blog.vear.vip/2019/09/14/2019-09-14%20Promises%20A+%E8%A7%84%E8%8C%83/)

下面，就这个定义实现一个then方法
```javascript
class Promiz {
  static PENDING = 'pending'
  static RESOLVED = 'resolved' // 方便理解，使用resolved代替fulfilled
  static REJECTED = 'rejected'

  status = Promiz.PENDING // 状态
  value = undefined // 成功结果
  reason = undefined // 失败原因


  constructor(executor) {
    if (typeof executor !== 'function') {
      throw Error('🐸 - 呱呱呱')
    }
    this.status = Promiz.PENDING
    executor(this.resolve, this.reject) // 这个函数接收2个函数，resolve函数在异步/同步操作成功时执行，reject函数在异步/同步操作失败时执行，具体由Promiz对象创建者来选择执行哪一个

  }

  resolve = (value) => {
    if (this.status === Promiz.PENDING) {
      this.status = Promiz.RESOLVED
      this.value = value // 保存成功结果
    }
  }

  reject = (reason) => {
    if (this.status === Promiz.PENDING) {
      this.status = Promiz.REJECTED
      this.reason = reason // 保存失败原因
    }
  }

  then = (onResolved, onRejected) => {
    if (this.status === Promiz.RESOLVED) {
      if (typeof onResolved === 'function') {
        onResolved(this.value)
      }

    }
    if (this.status === Promiz.REJECTED) {
      if (typeof onRejected === 'function') {
        onRejected(this.reason)
      }
    }
  }
}
```

这样的话进行一个简单的校验，发现是可以通过then方法拿到值的
```javascript
let p1 = new Promiz((res, rej) => {
  res('ojbk')
})
p1.then(value => { console.log(value) })
// ojbk
```

但碰到异步，就失灵了
```javascript
let p9 = new Promiz((res, rej) => {
  setTimeout(() => {
    res('hallo')
  }, 50)
})
p9.then(value => { console.log(value) })
// undefined
```
