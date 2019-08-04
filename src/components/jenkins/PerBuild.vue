<template>
  <div class="container">
    <el-steps :active="3" simple>
      <el-step title="Create" icon="el-icon-circle-plus-outline"></el-step>
      <el-step title="Server" icon="el-icon-upload"></el-step>
      <el-step title="Jenkinsfile" icon="el-icon-edit"></el-step>
      <el-step title="Build" icon="el-icon-lightning"></el-step>
      <el-step title="Result" icon="el-icon-s-promotion"></el-step>
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

</style>
