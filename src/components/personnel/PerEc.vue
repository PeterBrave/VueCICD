
<template>
  <div class="container">
    <el-steps :active="1" align-center class="process">
      <el-step title="创建任务" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="配置服务器" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="配置jenkinsfile" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="构建任务" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="获取构建结果" description="这是一段很长很长很长的描述性文字"></el-step>
    </el-steps>

    <el-form label-width="80px" :model="formLabelAlign">
      <el-form-item label="服务器">
        <el-select v-model="formLabelAlign.serverId" placeholder="请选择服务器" class="form">
          <el-option v-for="(serverInfo, index) in serverList" :key="index" :label="serverInfo.serverName" :value="serverInfo.serverId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="monaco-container" style="text-align: left">
      <div class="title">请输入将在服务器上执行的bash脚本</div>
      <div ref="container" class="monaco-editor" style="height: 250px;"></div>
    </div>
    <el-button class="button" type="primary" plain @click="submitBashToServer">提交</el-button>

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
            this.$router.push({path:'/per/train'});
            this.$message('提交成功！');

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
    padding: 0 0 20px 30px;
    font-family: "Microsoft YaHei";
    font-size: 18px;
  }
  .process {
    margin-bottom: 20px;
  }
</style>
