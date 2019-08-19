<template>
  <div class="container">
    <el-steps :active="1" simple class="process">
      <el-step title="Create" icon="el-icon-circle-plus-outline"></el-step>
      <el-step title="Server" icon="el-icon-upload"></el-step>
      <el-step title="Jenkinsfile" icon="el-icon-edit"></el-step>
    </el-steps>

    <div style="display: inline-block; width: 98%; text-align: left">
      <div class="fl-left">
        <div class="new-pipeline">New Pipeline</div>
        <div style="display: flex">
          <div class="title">Select your environment</div>
          <el-form label-width="20px" :model="formLabelAlign">
            <el-form-item>
              <el-select v-model="formLabelAlign.serverId" placeholder="Select environment" class="form">
                <el-option v-for="(serverInfo, index) in serverList" :key="index" :label="serverInfo.serverName" :value="serverInfo.serverId"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <button class="fl-right run-button" @click="submitBashToServer">Save and run</button>
    </div>
    <div class="monaco-container">
      <div class="file-name">Please Input Bash Script</div>
      <div ref="container" class="monaco-editor"></div>
    </div>
  </div>

</template>

<script>
  import * as monaco from 'monaco-editor'
  export default {
    data() {
      return {
        formLabelAlign: {
          serverId: '',
          bashContent: '',
        },
        serverList: [{
            serverName: "Windows Server",
            serverId: 1
          }, {
            serverName: "Linux Server",
            serverId: 2
          }, {
            serverName: "Docker",
            serverId: 3
          }
        ],
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
      submitBashToServer() {
        var _this = this;
        this.loading = true;
        var typeId = this.formLabelAlign.serverId;
        window.localStorage.setItem('jenkinsId', JSON.stringify(typeId));
        var projectName = JSON.parse(window.localStorage.getItem('projectName'));
        var repoName = JSON.parse(window.localStorage.getItem('repoName'));
        var githubName = this.user.githubName;
        var language = JSON.parse(window.localStorage.getItem('language'));
        console.log("type = " + typeId);
        this.postRequest('/jenkins/create', {
          projectName: projectName,
          repo: repoName,
          githubName: githubName,
          type: typeId,
        }).then(resp => {
          _this.loading = false;
          if (resp && resp.status == 200) {
            this.postRequest('/project/add', {
              name: projectName,
              author: this.user.name,
              language: language,
              type: typeId,
            }).then(resp => {
              if (resp && resp.status == 200 &&typeId === 3) {
                this.$router.push({path:'/config/jkfile'});
              } else {
                this.postRequest('/server/run', {
                  serverId: this.formLabelAlign.serverId,
                  bashContent: this.monacoEditor.getValue()
                }).then(resp=> {
                  _this.loading = false;
                  if (resp && resp.status == 200) {
                    var data = resp.data;
                    alert(data);
                    this.$router.push({path:'/config/jkfile'});
                    this.$message('Submit Successfully!');
                  }
                })
              }
            })
          }
        })

      }
    },
    mounted () {
      this.initEditor();
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
