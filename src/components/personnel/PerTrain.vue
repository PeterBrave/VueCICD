
<template>
  <div class="container">
    <el-steps :active="2" align-center class="process">
      <el-step title="Create Job" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Configure Server" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Configure JenkinsFile" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Build Job" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Get Building Result" style="font-family: 'Microsoft YaHei'"></el-step>
<!--      <el-step title="Configure DockerFile" style="font-family: 'Microsoft YaHei'"></el-step>-->
    </el-steps>
    <div class="monaco-container" style="text-align: left">
      <div class="title">JenkinsFile</div>
      <div ref="container" class="monaco-editor" style="height: 250px;"></div>
    </div>
    <el-button class="button" type="primary" plain @click="submitJenkinsfile">Submit</el-button>

  </div>

</template>

<script>
  import * as monaco from 'monaco-editor'
  export default {
    data() {
      return {
        codes: '',
        readOnly: false,
        // 主要配置
        editorOptions: {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: this.readOnly, // 只读
          cursorStyle: 'line', // 光标样式
          automaticLayout: false, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 28, // 字体大小
          autoIndent: false // 自动布局
        }
      }
    },
    methods: {
      initData() {
        this.postRequest("/github/content", {
          repo: this.$store.state.repoName,
          language: this.$store.state.language,
        }).then(resp => {
          if (resp && resp.status == 200) {
            this.codes = resp.data;
            this.initEditor();
          }
        });
      },
      initEditor() {
        this.monacoEditor = monaco.editor.create(this.$refs.container, {
          value: this.codes, // 见props
          language: 'java',
          theme: 'vs', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
          editorOptions: this.editorOptions // 同codes
        })
      },
      submitBashToServer() {
        var _this = this;
        this.loading = true;
        this.postRequest('/server/run', {
          serverId: this.formLabelAlign.serverId,
          bashContent: this.monacoEditor.getValue()
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            alert(data);

          }
        })
      },
      submitJenkinsfile() {
        var _this = this;
        this.loading = true;
        this.postRequest('/github/commit', {
          codeContent: this.monacoEditor.getValue(),
          repo: this.$store.state.repoName
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            this.$router.push({path:'/build/job'});
          }
        })
      },
    },
    mounted () {
      this.initData();
    },

  }
</script>
<style>
  .container {
    text-align: left;
    width: 60%;
    margin: 20px 20px;
  }
  .title {
    padding: 0 0 10px 10px;
    font-family: "Microsoft YaHei";
    font-size: 18px;
  }
  .process {
    margin-bottom: 20px;
  }
</style>
