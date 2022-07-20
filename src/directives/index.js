// 管理自定义指令

export const imgerror = {
  inserted(el, options) {
    // el  指令所绑定的元素，可以用来直接操作dom
    // options options.value 指令的绑定值
    el.onerror = function () {
      // 图片异常的时候，会将指令配置的默认图片设置为图片的内容
      el.src = options.values
    }
  }
}

export const focus = {
  inserted(el) {
    el.focus()
  }
}
