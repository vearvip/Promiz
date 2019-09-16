class Promiz { // 自定义一个Promiz类简单实现Promises/A+规范
  static PENDING = 'pending'
  static RESOLVED = 'resolved' // 方便理解，使用resolve代替fulfilled
  static REJECTED = 'rejected'
  constructor(executor) { // Promiz的构造器接收一个函数
    executor(this.resolve.bind(this), this.reject.bind(this)) // 这个函数接收2个函数，resolve函数在异步/同步操作成功时执行，reject函数在异步/同步操作失败时执行，具体由Promiz对象创建者来选择执行哪一个
  }
  resolve(value) {

  }
  reject(reason) {

  }
  then() {
    
  }
}