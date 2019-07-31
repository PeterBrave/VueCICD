<template>
  <div class="container">
    <el-steps :active="4" align-center>
      <el-step title="Create Job"></el-step>
      <el-step title="Configure Server"></el-step>
      <el-step title="Configure JenkinsFile"></el-step>
      <el-step title="Build Job"></el-step>
      <el-step title="Get Building Result"></el-step>
    </el-steps>
    <h1 style="font-family: Microsoft YaHei; font-size: 25px">Build Job</h1>
    <el-button class="button" type="primary" plain @click="startBuild">Get Building Result</el-button>
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
