<template>
  <div class="container">
    <el-steps :active="2" simple class="process">
      <el-step title="Create" icon="el-icon-circle-plus-outline"></el-step>
      <el-step title="Server" icon="el-icon-upload"></el-step>
      <el-step title="Jenkinsfile" icon="el-icon-edit"></el-step>
    </el-steps>
    <div style="display: inline-block; width: 98%; text-align: left">
      <div class="fl-left">
        <div class="new-pipeline">New Pipeline</div>
        <div class="title">Review your jenkins file</div>
      </div>
      <button class="fl-right run-button" @click="submitJenkinsfile">Save and run</button>
    </div>
    <div class="monaco-container">
      <div class="file-name">JenkinsFile</div>
      <div ref="container" class="monaco-editor"></div>
    </div>

  </div>

</template>

<script>
  import * as monaco from 'monaco-editor'
  export default {
    data() {
      return {
        codes: '',
      }
    },
    methods: {
      initData() {
        this.postRequest("/github/content", {
          repo: JSON.parse(window.localStorage.getItem('repoName')),
          language: JSON.parse(window.localStorage.getItem('language')),
          githubName: this.user.githubName,
          githubToken: this.user.githubToken,
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
          language: 'javascript',
          theme: 'vs', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
          fontSize: 14, // 字体大小
          automaticLayout: true, // 自动布局
          autoIndent: true, // 自动布局
          editorOptions: this.editorOptions // 同codes
        })
      },
      submitJenkinsfile() {
        var _this = this;
        this.loading = true;
        this.postRequest('/github/commit', {
          codeContent: this.monacoEditor.getValue(),
          repo: JSON.parse(window.localStorage.getItem('repoName')),
          githubName: this.user.githubName,
          githubToken: this.user.githubToken,
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            this.loading = true;
            this.postRequest('/jenkins/build', {
              jobName: JSON.parse(window.localStorage.getItem('projectName')),
            }).then(resp=>{
              _this.loading = false;
              if (resp && resp.status == 200) {
                window.open('http://3.15.149.72:8080/job/' + JSON.parse(window.localStorage.getItem('projectName')));
              }
            })
          }
        })
      },
    },
    mounted () {
      this.initData();
    },
    computed: {
        user() {
          return this.$store.state.user;
      }
    }

  }
</script>
<style>
  .monaco-editor {
    height: 512px;
  }
  .monaco-container {
    height: auto;
    margin-bottom: 20px;
    width: 98%;
    background-color: white;
    box-shadow: 0 0 2px gray;
    border-radius: 2px;
  }
  .fl-right {
    float: right;
  }
  .run-button {
    border: none;
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
    margin-top: 40px;
    padding: 6px 12px;
    background-color: rgba(0,120,212,1);
    color: white;
    border-radius: 2px;
    position: relative;
    bottom: 0px;
  }
  .file-name {
    line-height: 32px;
    font-size: 21px;
    letter-spacing: -.02em;
    font-weight: 600;
    padding: 18px 36px;
  }
</style>
