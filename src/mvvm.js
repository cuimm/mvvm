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
    }
  }
}

export default MVVM
