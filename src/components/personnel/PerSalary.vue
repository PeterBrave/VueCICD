<template>
  <div class="container">
    <el-steps :active="3" align-center>
      <el-step title="Create Job"></el-step>
      <el-step title="Configure Server"></el-step>
      <el-step title="Configure JenkinsFile"></el-step>
      <el-step title="Build Job"></el-step>
      <el-step title="Get Building Result"></el-step>
    </el-steps>
    <h1 class="title">Build Job</h1>
    <el-button class="button" type="primary" plain @click="startBuild">Start Building</el-button>


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
  .title {
    margin-top: 20px;
    font-family: "Microsoft YaHei";
    font-size: 25px;
  }

</style>
