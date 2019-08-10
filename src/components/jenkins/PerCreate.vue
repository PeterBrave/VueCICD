<template>
  <div class="container">
    <el-steps :active="0" simple class="process">
      <el-step title="Create" icon="el-icon-circle-plus-outline"></el-step>
      <el-step title="Server" icon="el-icon-upload"></el-step>
      <el-step title="Jenkinsfile" icon="el-icon-edit"></el-step>
    </el-steps>
    <div class="new-pipeline">New Pipeline</div>
    <div class="title">Select a repository</div>
    <br/>
    <div class="repo-filter">
      <i class="el-icon-search"></i>
      <input class="repo-filter-search-input" placeholder="filter by keywords" v-model="search"></input>
      <i class="el-icon-close" v-on:click="clearSearch()"></i>
    </div>
    <div v-if="searchData.length>0">
      <div class="repo-list" v-for="repo in searchData" v-on:click="createJenkinsJob(repo.name, repo.language)">
        <img class="repo-img" :src="repo.owner.avatar_url">
        <div style="float: left; margin: 8px 0 8px 0;">
          <div>
            <span class="repo-name">{{repo.full_name}}</span>
            <span class="repo-fork" v-if="repo.fork">fork</span>
          </div>
          <span height="auto" class="repo-time">{{repo.updated_at | formatDate}}</span>
        </div>
        <div class="repo-language">
          <span class="repo-language-color" :style="{background: repo.color}"></span>
          <span>{{repo.language}}</span>
        </div>
      </div>
    </div>
    <div v-else style="width: 70%">
      <i class="el-icon-coffee-cup"></i>
      <span>No matching repositories were found. If you can't find a repository, make sure you provide access.You may also select a specific connection.</span>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        setPlaceholder: '',
        labelPosition: 'right',
        formLabelAlign: {
          lan: '',
          name: '',
          desc: '',
          repo: ''
        },
        repoApi: [],
        value: '',
        search: '',
      }
    },
    computed: {
      searchData: function () {
        var search = this.search;
        console.log("search = " + search);
        if (search) {
          return this.repoApi.filter((item) => {
            return item.name.toLowerCase().startsWith(this.search.toLowerCase());
          })
        }
        return this.repoApi;
      },
      user() {
        return this.$store.state.user;
      }
    },
    mounted: function () {
      this.initData();
    },
    filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      }
    },
    methods: {
      initData() {
        var _this = this;
        this.getRequest("https://api.github.com/users/" + this.user.githubName+ "/repos").then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data;
            var map = {Java: "#b07219", JavaScript: "#f1e05a", HTML: "#e34c26", Swift: "#ffac45", Python: "#3572A5"};
            data.sort(function (a, b) {
              return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            })
            for (var repo in data) {
              data[repo].color = map[data[repo].language];
            }
            _this.repoApi = data;
            console.log(data);

          }
        })
      },
      clearSearch() {
        this.search = '';
      },

      createJenkinsJob(name, language) {
        var time = new Date().getTime()/1000;
        console.log(name, language);
        this.$store.commit('setRepoName', name);
        this.$store.commit('setProjectName', name + time);
        this.$store.commit('setLanguage', language);
        window.localStorage.setItem('repoName', JSON.stringify(name));
        window.localStorage.setItem('projectName', JSON.stringify(name + time));
        window.localStorage.setItem('language', JSON.stringify(language));

        var _this = this;
        this.loading = true;
        this.postRequest('/jenkins/create', {
          projectName: name + time,
          description: '',
          repo: name,
        }).then(resp => {
          _this.loading = false;
          if (resp && resp.status == 200) {
            // this.$router.push({path:'/config/server'});
            this.$router.push({path: '/config/jkfile'})
            this.$message('Submit Successfully!');
          }
        })

      }
    }

  }
</script>
<style>
  .repo-list {
    width: 70%;
    height: 58px;
    border-bottom: 1px solid rgba(0, 0, 0, .08);
  }

  .repo-list:hover {
    background-color: rgba(0, 0, 0, .06);
  }

  .repo-name {
    font-size: 14px;
    line-height: 20px;
    margin-top: 12px;
  }

  .repo-time {
    font-size: 12px;
    line-height: 16px;
    color: rgba(0, 0, 0, .55);
    padding-top: 4px;
  }

  .repo-img {
    width: 32px;
    height: 32px;
    margin: 12px;
    float: left;
  }

  .repo-fork {
    font-size: 12px;
    background-color: rgba(0, 0, 0, .06);
    padding: 2px 10px 2px 10px;
    border-radius: 12px;
  }

  .repo-language {
    width: 14%;
    float: right;
    margin: 16px 20px 16px 0;
  }

  .repo-language-color {
    border-radius: 50%;
    display: inline-block;
    height: 12px;
    position: relative;
    top: 1px;
    width: 12px;
  }

  .repo-filter {
    width: 70%;
    background-color: rgba(0, 0, 0, .06);
    height: 32px;
    margin: 8px 0 8px 0;
    padding: 8px 0 8px 0;
  }

  .repo-filter-search-input {
    font-size: 14px;
    line-height: 20px;
    padding: 5px 0 5px 8px;
    background-color: transparent;
    border: none;
    outline: none;
    width: 80%;
  }

  .el-icon-search {
    padding: 6px 0 6px 8px;
  }

  .el-icon-close {
    float: right;
    padding: 6px 20px 6px 16px;
    font-size: 20px;
  }
</style>

