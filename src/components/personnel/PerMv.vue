<template>
  <div class="container">
    <el-steps :active="4" align-center>
      <el-step title="创建任务" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="配置服务器" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="配置jenkinsfile" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="构建任务" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="获取构建结果" description="这是一段很长很长很长的描述性文字"></el-step>
    </el-steps>
    <h1>构建任务</h1>
    <el-button class="button" type="primary" plain @click="startBuild">获取构建结果</el-button>
    <el-input
      type="textarea"
      :rows="32"
      placeholder="控制台输出:"
      v-model="textarea">
    </el-input>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        textarea: ''
      }
    },
    methods: {
      startBuild() {
        var _this = this;
        this.loading = true;
        this.postRequest('/jenkins/output', {
          projectName: this.$store.state.projectName
        }).then(resp=>{
          _this.loading = false;
          if (resp && resp.status == 200) {
            this.textarea = resp.data;
          }
        })
      }
    }
  }
</script>

<style>
  .container {
    text-align: left;
    width: 60%;
    margin: 20px 20px;
  }
  .button {
    margin-bottom: 20px;
  }
</style>
