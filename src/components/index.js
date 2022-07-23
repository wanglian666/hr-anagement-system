import uploadExcel from './uploadExcel/index.vue'
import PageTools from './PageTools/index.vue'

export default {
  install(Vue) {
    Vue.component('uploadExcel', uploadExcel);
    Vue.component('PageTools', PageTools);
  }
}
