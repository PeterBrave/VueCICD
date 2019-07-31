<template>
  <div class="container">
    <el-steps :active="4" align-center>
      <el-step title="Create Job" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Configure Server" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Configure JenkinsFile" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Build Job" style="font-family: 'Microsoft YaHei'"></el-step>
      <el-step title="Get Building Result" style="font-family: 'Microsoft YaHei'"></el-step>
<!--      <el-step title="Configure DockerFile" style="font-family: 'Microsoft YaHei'"></el-step>-->
    </el-steps>
    <h1 style="font-family: Microsoft YaHei; font-size: 25px">Build Job</h1>
    <el-button class="button" type="primary" plain @click="startBuild">Get Building Result</el-button>
    <a :href=" 'http://3.15.149.72:8080/job/' + $store.state.projectName">Link To Jenkins Result</a>

    <el-input
      type="textarea"
      :rows="32"
      placeholder="ConsoleOutput:"
      v-model="textarea">
    </el-input>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        textarea: '',
      }
    },
    methods: {
      startBuild() {
        var _this = this;
        this.loading = true;
        this.postRequest('/jenkins/output', {
          projectName: this.$store.state.projectName,
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
