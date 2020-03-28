import CompileUtil from './compileUtil.js'

class Compile {
  constructor(el, vm) {
    this.el = Compile.isElementNode(el) ? el : document.querySelector(el)
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
      if (Compile.isElementNode(node)) {
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
      if (Compile.isDirective(attrName)) {
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
  static isDirective(name) {
    return name.includes('v-')
  }
  // 判断是否是元素节点
  static isElementNode(node) {
    // 元素=1 属性=2 文本=3 注释=8 document=9 documentFragment=11
    return node.nodeType === 1
  }
}

export default Compile
