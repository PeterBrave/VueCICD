<template>
  <div class="monaco-container" style="text-align: left">
    <div ref="container" class="monaco-editor" style="height: 250px;"></div>
    <el-button type="primary" @click="sendContext">提交</el-button>
  </div>

</template>

<script>
  import * as monaco from 'monaco-editor'
  export default {
    data(){
      return {
        value:''
      }
    },
    mounted () {
      this.getData();
    },
    props: {
      readOnly: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      // 主要配置
      editorOptions: {
        type: Object,
        default: function () {
          return {
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: this.readOnly, // 只读
            cursorStyle: 'line', // 光标样式
            automaticLayout: false, // 自动布局
            glyphMargin: true, // 字形边缘
            useTabStops: false,
            fontSize: 14, // 字体大小
            autoIndent: false, // 自动布局
          }
        }
      },
      url:{
        type: String,
        default: ''
      },
    },
    methods:{
      getData(){
        if(!this.url)
          return
        this.getRequest(this.url).then(resp => {
          this.value = resp.data;
          this.init();
        })
      },
      init(){
        var editor = monaco.editor.create(this.$refs.container, {
          value: this.value, // 见props
          language: 'java',
          theme: 'vs', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
          editorOptions: this.editorOptions, // 同codes
        });
      },
      sendContext() {
        this.$emit('sendContext', "hahaah");
      }
    }
  }
</script>

<style scoped>

</style>
