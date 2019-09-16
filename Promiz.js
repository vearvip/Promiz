class Promiz { // 自定义一个Promiz类简单实现Promises/A+规范
  static PENDING = 'pending'
  static RESOLVED = 'resolved' // 方便理解，使用resolve代替fulfilled
  static REJECTED = 'rejected'
  constructor(executor) { // Promiz的构造器接收一个函数
    this.status = Promiz.PENDING
    this.resolveQueue = []
    this.rejectQueue = []
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
  then() {

  }
}
const promiz =  new Promiz((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 500)
})