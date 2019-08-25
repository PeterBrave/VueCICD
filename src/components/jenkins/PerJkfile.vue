<template>
  <div class="container">
    <el-steps :active="2" simple class="process">
      <el-step title="Create" icon="el-icon-circle-plus-outline"></el-step>
      <el-step title="Server" icon="el-icon-upload"></el-step>
      <el-step title="Jenkinsfile" icon="el-icon-edit"></el-step>
    </el-steps>
    <div class="header-section">
      <div>
        <div class="new-pipeline">New Pipeline</div>
        <div class="title">Review your jenkins file</div>
      </div>
      <button class="run-button" style="align-self: flex-end; margin-right: 40px" @click="submitJenkinsfile">Save and run</button>
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
          type: JSON.parse(window.localStorage.getItem('jenkinsId')),
        }).then(resp => {
          if (resp && resp.status == 200) {
            console.log("resp.data = " + resp.data.obj);
            this.codes = resp.data.obj;
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
        var typeId = JSON.parse(window.localStorage.getItem('jenkinsId'));
        this.postRequest("/project/update", {
          name: JSON.parse(window.localStorage.getItem('projectName')),
          type: 0,
          enable: true,
        }).then(resp=>{

        });
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
              type: typeId,
            }).then(resp=>{
              _this.loading = false;
              if (resp && resp.status == 200) {
                if (typeId == 1 || typeId == 2) {
                  window.open('http://3.15.149.72:8080/job/' + JSON.parse(window.localStorage.getItem('projectName')));
                } else if (typeId == 3) {
                  window.open('http://13.125.214.112:30002/job/' + JSON.parse(window.localStorage.getItem('projectName')));
                }
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
</style>
