import Monaco from './components/MonacoEditor.vue' // 这里导入文件名不带后缀亦可

export default {
  install: function (Vue, options) {
    Vue.component('monaco', Monaco)
  }
}

