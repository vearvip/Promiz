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
