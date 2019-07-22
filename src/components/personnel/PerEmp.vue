<template>
  <div id="container">
        <el-steps :active="0" align-center>
          <el-step title="创建任务" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="配置服务器" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="配置jenkinsfile" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="构建任务" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="获取构建结果" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
    <div class="title">请创建jenkins项目</div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="名称：">
        <el-input v-model="formLabelAlign.name" class="form"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input type="textarea" v-model="formLabelAlign.desc" class="form"></el-input>
      </el-form-item>
      <el-form-item label="仓库：">
        <el-select v-model="formLabelAlign.repo" placeholder="请选择仓库" class="form">

          <el-option v-for="(repoInfo, index) in repoApi" :key="index" :label="repoInfo.name" :value="repoInfo.name"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-button class="button" type="primary" plain @click="createJenkinsJob">创建</el-button>
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
            this.$router.push({path:'/per/ec'});
            this.$message('提交成功！');
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

