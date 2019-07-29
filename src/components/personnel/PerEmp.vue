<template>
  <div id="container">
        <el-steps :active="0" align-center>
          <el-step title="Create Job"></el-step>
          <el-step title="Configure Server"></el-step>
          <el-step title="Configure JenkinsFile"></el-step>
          <el-step title="Build Job"></el-step>
          <el-step title="Get Building Result"></el-step>
        </el-steps>
    <div class="title">Please Create Jenkins Project</div>
    <br/>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="ProName：">
        <el-input v-model="formLabelAlign.name" class="form"></el-input>
      </el-form-item>
      <el-form-item label="Description：">
        <el-input type="textarea" v-model="formLabelAlign.desc" class="form"></el-input>
      </el-form-item>
      <el-form-item label="Repository：">
        <el-select v-model="formLabelAlign.repo" placeholder="Please Select Repo" class="form">

          <el-option v-for="(repoInfo, index) in repoApi" :key="index" :label="repoInfo.name" :value="repoInfo.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-button class="button" type="primary" plain @click="createJenkinsJob">Create</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          desc: '',
          repo: ''
        },
        repoApi: []
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      initData() {
        var _this = this;
        this.getRequest("https://api.github.com/users/PeterBrave/repos").then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.repoApi = data;
          }
        })
      },
      createJenkinsJob() {
        // this.global.setProjectName(this.formLabelAlign.name);
        // this.global.setRepoName(this.formLabelAlign.repo)
        this.$store.commit('setRepoName', this.formLabelAlign.repo);
        this.$store.commit('setProjectName', this.formLabelAlign.name);
        // alert(global_.projectName + global_.repoName);
        var _this = this;
        this.loading = true;
        this.postRequest('/jenkins/create', {
          projectName: this.formLabelAlign.name,
          description: this.formLabelAlign.desc,
          repo: this.formLabelAlign.repo
        }).then(resp=>{
          _this.loading = false;
          if (resp && resp.status == 200) {
            this.$router.push({path:'/config/server'});
            this.$message('Submit Successfully!');
          }
        })

      }
    }

  }
</script>
<style>
  #container {
    text-align: left;
    width: 60%;
    margin: 20px 20px;
  }
  .form {
    width: 90%;
  }
  .title {
    margin-top: 20px;
  }
</style>

