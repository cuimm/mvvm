class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    if (this.el) {
      // 元素能获取到才开始编译
      // 1、先把真实的DOM移入到内存中
      const fragment = this.node2Fragment(this.el)
      // 2、编译 => 提取想要的元素节点 v-model 和 文本节点 {{}}
      this.compile(fragment)
      // 3、把编译好的 fragment 塞回到页面里去
      document.body.appendChild(fragment)
    }
  }
  /* 核心方法 */
  // 将DOM元素全部放入到文档碎片（内存）中
  node2Fragment(el) {
    // 创建文档碎片
    const fragment = document.createDocumentFragment()
    let firstChild
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }
  compile(fragment) {
    // 子节点（类数组）
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 元素节点 递归子节点 — 编译元素
        this.compileElement(node)
        this.compile(node)
      } else {
        // 文本节点 — 编译文本
        this.compileText(node)
      }
    })
  }
  // 编译元素节点
  compileElement(node) {
    // 节点所有的属性（类数组）需要取出v-mode、v-text...
    const attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      // name=属性名(v-model v-text) value=属性值(student.code)
      const attrName = attr.name
      if (this.isDirective(attrName)) {
        const expr = attr.value
        // 取到对应的值放到节点中 node this.vm.$data expr
        let [, type] = attrName.split('-')
        CompileUtil[type](node, this.vm, expr)
      }
    })
  }
  // 编译文本节点
  compileText(node) {
    // 取文本中的内容
    const expr = node.textContent
    //  匹配 {{a}} {{b.c}} {{d}}
    const reg = /\{\{([^}]+)\}\}/g
    if (reg.test(expr)) {
      // node this.vm.$data expr
      CompileUtil['text'](node, this.vm, expr)
    }
  }
  /* 辅助方法 */
  // 判断是否是指令
  isDirective(name) {
    return name.includes('v-')
  }
  // 判断是否是元素节点
  isElementNode(node) {
    // 元素=1 属性=2 文本=3 注释=8 document=9 documentFragment=11
    return node.nodeType === 1
  }
}

const CompileUtil = {
  getValue(vm, expr) {
    // vm.$data.student.code  data[expr]
    // return vm.$data[expr]
    return expr.split('.').reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },
  text(node, vm, expr) {
    // 文本处理
    const updateFn = this.updater['textUpdater']
    expr = expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
      const expr = args[1]
      return this.getValue(vm, expr)
    })
    updateFn && updateFn(node, expr)
  },
  model(node, vm, expr) {
    // 输入框处理
    const updateFn = this.updater['modelUpdater']
    updateFn && updateFn(node, this.getValue(vm, expr))
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

export default Compile
