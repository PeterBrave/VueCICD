<template>
  <div class="container">
    <el-steps :active="4" simple>
      <el-step title="Create" icon="el-icon-circle-plus-outline"></el-step>
      <el-step title="Server" icon="el-icon-upload"></el-step>
      <el-step title="Jenkinsfile" icon="el-icon-edit"></el-step>
      <el-step title="Build" icon="el-icon-lightning"></el-step>
      <el-step title="Result" icon="el-icon-s-promotion"></el-step>
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

</style>
