import CompileUtil from './compileUtil.js'

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
    this.value = CompileUtil.getValue(this.vm, this.expr)
  }
  update2(newValue, cb) {
    if (this.value !== newValue) {
      cb(newValue)
    }
  }
  update() {
    const newValue = CompileUtil.getValue(this.vm, this.expr)
    const oldValue = this.value
    if (newValue !== oldValue) {
      this.cb(newValue)
    }
  }
}

export default Watcher
