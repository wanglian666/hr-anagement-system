import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control




import * as directives from '@/directives'
//  遍历所有导出的指令对象，完成自定义指令的全局注册
Object.keys(directives).forEach(key => {
  // 全局注册自定义指令
  Vue.directive(key, directives[key])
})

import * as filters from '@/filters'
//  遍历所有导出的指令对象，完成自定义指令的全局注册
Object.keys(filters).forEach(key => {
  // 全局注册过滤器
  Vue.filter(key, filters[key])
})



// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})

// 全局注册组件
/* import PageTools from '@/components/PageTools/index.vue'
Vue.component('PageTools', PageTools); */

// 全局注册组件
import Components from '@/components/index'
Vue.use(Components);


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
