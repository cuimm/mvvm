class Dep {
  constructor() {
    // 订阅的数组
    this.subs = []
  }
  addSub(watcher) {
    // 判断如果添加了watcher 就不再加入
    if (!this.subs.includes(watcher)) {
      this.subs.push(watcher)
    }
  }
  notify() {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

export default Dep
