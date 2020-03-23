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
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        return value
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue
          // 如果新值是对象，需要重新劫持
          _this.observer(value)
        }
      },
    })
  }
}

export default Observer
