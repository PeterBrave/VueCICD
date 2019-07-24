<template>
  <div class="container">
    <el-steps :active="3" align-center>
      <el-step title="创建任务" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="配置服务器" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="配置jenkinsfile" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="构建任务" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="获取构建结果" description="这是一段很长很长很长的描述性文字"></el-step>
    </el-steps>
    <h1>构建任务</h1>
    <el-button class="button" type="primary" plain @click="startBuild">启动构建</el-button>


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
        this.postRequest('/jenkins/build', {
          jobName: this.$store.state.projectName
        }).then(resp=>{
          _this.loading = false;
          if (resp && resp.status == 200) {
            this.$router.push({path:'/output'});
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

</style>
