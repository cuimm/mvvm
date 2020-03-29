import Compile from './compile.js'
import Observer from './observer.js'

class MVVM {
  constructor(options = {}) {
    this.$el = options.el
    this.$data = options.data
    this.computed = options.computed

    if (this.$el) {
      // 计算属性
      this.observerComputed(this.$data, this.computed)
      // 数据劫持
      new Observer(this.$data)
      // 模版编译
      new Compile(this.$el, this)
      // 代理$data
      this.proxyData(this.$data)
      this.proxyComputed(this.computed)
    }
  }

  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(val) {
          data[key] = val
        },
      })
    })
  }
  proxyComputed(computed) {
    const _this = this
    Object.keys(computed).forEach(key => {
      Object.defineProperty(this, key, {
        // get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
        // set: computed[key].set,
        get: Object.getOwnPropertyDescriptor(_this.$data, key).get,
        set: Object.getOwnPropertyDescriptor(_this.$data, key).set,
      })
    })
  }

  observerComputed(data, computed) {
    Object.keys(computed).forEach(key => {
      Object.defineProperty(data, key, {
          // enumerable: true,
          // configurable: true,
          get() {
            if (typeof computed[key] === 'function') {
              return computed[key].call(data)
            } else if (typeof computed[key] === 'object') {
              return computed[key].get.call(data)
            }
            return undefined
          },
          set(val) {
            if (typeof computed[key] === 'object' && computed[key].set) {
              computed[key].set.call(data, val)
            } else {
              console.error('no set')
            }
          }
        },
      )
    })
  }
}

export default MVVM
