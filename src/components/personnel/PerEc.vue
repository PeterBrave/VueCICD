
<template>
  <div class="container">
    <el-steps :active="1" align-center class="process">
      <el-step title="Create Job" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Configure Server" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Configure JenkinsFile" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Build Job" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Get Building Result" style="font-family: 'Microsoft YaHei'"></el-step>
<!--      <el-step title="Configure DockerFile" style="font-family: 'Microsoft YaHei'"></el-step>-->
    </el-steps>
    <el-form label-width="80px" :model="formLabelAlign">
      <el-form-item label="Server">
        <el-select v-model="formLabelAlign.serverId" placeholder="Please Select Server" class="form">
          <el-option v-for="(serverInfo, index) in serverList" :key="index" :label="serverInfo.serverName" :value="serverInfo.serverId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="monaco-container" style="text-align: left">
      <div class="title">Please Input Bash Script</div>
      <div ref="container" class="monaco-editor" style="height: 250px;"></div>
    </div>
    <el-button class="button" type="primary" plain @click="submitBashToServer">Submit</el-button>

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
            this.$router.push({path:'/config/jkfile'});
            this.$message('Submit Successfully!');

          }
        })
      }
    },
    mounted () {
      this.initEditor();
    },

  }
</script>
<style>
  .container {
    text-align: left;
    width: 60%;
    margin: 20px 20px;
  }
  .monaco-container {
    border: 1px #3a8ee6 solid;
    padding-left: 20px;
    margin-bottom: 20px;
    padding-top: 20px;
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
