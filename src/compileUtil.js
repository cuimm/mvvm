import Watcher from './watcher.js'

const CompileUtil = {
  getValue(vm, expr) {
    // vm.$data.student.code  data[expr]
    // return vm.$data[expr]
    return expr.split('.').reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },
  getTextValue(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      return this.getValue(vm, args[1])
    })
  },
  setValue(vm, expr, value) {
    // vm.$data a.b.c value
    const _expr = expr.split('.')
    _expr.reduce((prev, next, currentIndex) => {
      if (_expr.length - 1 === currentIndex) {
        return prev[next] = value
      }
      return prev[next]
    }, vm.$data)
  },
  // 文本处理
  text(node, vm, expr) {
    const updateFn = this.updater['textUpdater']
    const value = expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      // 监控文本节点里面每一个绑定的值 {{a}} {{b.c}}
      const _expr = args[1]
      new Watcher(vm, _expr, () => {
        // 如果文本节点数据变化，文本节点需要重新获取依赖的数据。否则，如果直接拿a的新值覆盖，b.c 会被覆盖
        updateFn && updateFn(node, this.getTextValue(vm, expr))
      })
      return this.getValue(vm, args[1])
    })
    updateFn && updateFn(node, value)
  },
  // 输入框处理
  model(node, vm, expr) {
    const updateFn = this.updater['modelUpdater']
    updateFn && updateFn(node, this.getValue(vm, expr))
    new Watcher(vm, expr, (newValue) => {
      // 当值变化后会调用cb，将新值传递过来
      updateFn && updateFn(node, newValue)
    })
    node.addEventListener('input', (e) => {
      const value = e.target.value
      this.setValue(vm, expr, value)
    })
  },
  updater: {
    // 文本框更新
    textUpdater(node, value) {
      node.textContent = value
    },
    // 输入框更新
    modelUpdater(node, value) {
      node.value = value
    },
  },
}

export default CompileUtil
