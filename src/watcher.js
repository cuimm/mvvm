import CompileUtil from './compileUtil.js'
import Dep from './dep.js'

/*
* 观察者的目的是：给需要观察的对象添加一个观察者，当数据变化时执行对应的方法
* 用新值和老值进行比较，如果发生变化，就调用更新方法
* this.$watch('a.b.c', () => {
*   // do something
* })
*/
class Watcher {
  constructor(vm, expr, cb) {
    // 监控对象
    this.vm = vm
    // 表达式
    this.expr = expr
    // 回调
    this.cb = cb
    // 初始值
    this.value = this.getValue(this.vm, this.expr)
  }
  getValue(vm, expr) {
    Dep.target = this
    const value = CompileUtil.helper.getValue(vm, expr)
    Dep.target = null
    return value
  }
  update() {
    const newValue = this.getValue(this.vm, this.expr)
    const oldValue = this.value
    if (newValue !== oldValue) {
      this.cb(newValue)
    }
  }
}

export default Watcher
