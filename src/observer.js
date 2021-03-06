import Dep from './dep.js'

class Observer {
  constructor(data) {
    this.observer(data)
  }
  observer(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    // 将数据一一劫持
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      this.observer(data[key]) // 深度劫持
    })
  }
  // 定义响应式
  defineReactive(data, key, value) {
    const _this = this
    const dep = new Dep() // 每个变化的数据都会对应一个数组，这个数组存放所有更新操作
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target) // JS是单线程的
        return value
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue
          // 如果新值是对象，需要重新劫持
          _this.observer(value)
          // 通知所有订阅者，数据已变化
          dep.notify()
        }
      },
    })
  }
}

export default Observer
