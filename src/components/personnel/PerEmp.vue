<template>
  <div id="container">
        <el-steps :active="0" align-center>
          <el-step title="Create Job" style="font-family: 'Microsoft YaHei'"></el-step>
          <el-step title="Configure Server" style="font-family: 'Microsoft YaHei'"></el-step>
          <el-step title="Configure JenkinsFile" style="font-family: 'Microsoft YaHei'"></el-step>
          <el-step title="Build Job" style="font-family: 'Microsoft YaHei'"></el-step>
          <el-step title="Get Building Result" style="font-family: 'Microsoft YaHei'"></el-step>
<!--          <el-step title="Configure DockerFile" style="font-family: 'Microsoft YaHei'"></el-step>-->
        </el-steps>
    <h1 class="title">Please Create Jenkins Project</h1>
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
          <el-option v-for="(repoInfo, index) in repoApi" :key="index" :label="repoInfo.name+ ' '+repoInfo.language" :value="repoInfo.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Language：">
        <el-select v-model="formLabelAlign.lan" placeholder="Please Select Language">
          <el-option v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value"></el-option>
        </el-select>(Choose According to Your Requirements.)
      </el-form-item>

    </el-form>

    <el-button class="button" type="primary" plain @click="createJenkinsJob">Create</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        setPlaceholder:'',
        labelPosition: 'right',
        formLabelAlign: {
          lan:'',
          name: '',
          desc: '',
          repo: ''
        },
        repoApi: [],
        options: [{
          value: 'java',
          label: 'Java'
        }, {
          value: 'vue',
          label: 'VUE'
        }, {
          value: 'c',
          label: 'C'
        }, {
          value: 'python',
          label: 'Python'
        }],
        value: ''
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
        this.$store.commit('setLanguage', this.formLabelAlign.lan);
        // alert(global_.projectName + global_.repoName);
        var _this = this;
        this.loading = true;
        this.postRequest('/jenkins/create', {
          projectName: this.formLabelAlign.name,
          description: this.formLabelAlign.desc,
          repo: this.formLabelAlign.repo,
        }).then(resp=>{
          _this.loading = false;
          if (resp && resp.status == 200) {
            // this.$router.push({path:'/config/server'});
            this.$router.push({path:'/config/jkfile'})
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
    font-family: "Microsoft YaHei";
    font-size: 25px;
  }
</style>

