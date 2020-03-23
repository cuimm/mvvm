import Compile from './compile.js'
import Observer from './observer.js'

class MVVM {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data

    if (this.$el) {
      // 数据劫持
      new Observer(this.$data)
      // 模版编译
      new Compile(this.$el, this)

      Object.keys(this.$data).forEach(key => {
        Object.defineProperty(this, key, {
          get() {
            return this.$data[key]
          },
          set(val) {
            this.$data[key] = val
          },
        })
      })
    }
  }
}

export default MVVM
