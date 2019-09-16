let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('定时器执行完毕value')
    // reject('返回一个reason')
    throw Error('asdfjjjjj')
  }, 500);
})
p.then(value => {
  console.log('value', value)
}, reason => {
  console.log('reason', reason)
}).catch(error => {
  console.log('error', error)
})