<template xmlns:el-row="http://www.w3.org/1999/html">
    <div>
      <el-container>
        <el-header class="home-header" height="48px">
          <div>
            <a href="/#/create/job">
              <img
                class="citrix-logo"
                :src="url"
                :fit="fit"/>
            </a>
            <a href="/#/create/job"><span class="home_title">DevOps Platform</span></a>
          </div>
          <div>
            <el-dropdown style="color: black" @command="handleCommand">
            <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center; vertical-align: middle;">
              {{user.name}}
              <i><img v-if="user.userface!=''" :src="user.userface"
                      style="width: 20px;height: 20px;margin-right: 5px;margin-left: 5px;border-radius: 40px; background-color:#D3DCE6 "/></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a href="/#/profile">Account Center</a></el-dropdown-item>
                <el-dropdown-item command="logout" divided>Log Out</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="setting-profile-main" style="bottom: 30px">
          <el-row>
            <el-col :span="9">
              <div class="profile-left">
                <img :src="user.userface" class="profile-avatar">
                <div class="profile-name">
                  <div class="profile-username">{{user.name}}</div>
                  <button class="profile-button" @click="editClick">Edit</button>
                </div>
                <div class="profile-notice">
                  <i class="el-icon-warning"></i>
                  <span class="profile-notice-text">The following need to set up carefully!</span>
                </div>
                <div class="profile-info">
                  <el-tooltip class="item" effect="light" content="Your RepoName" placement="bottom-start">
                    <i class="el-icon-s-shop profile-icon"></i>
                  </el-tooltip>
                  <div class="profile-detail">{{user.githubName}}</div>
                </div>
                <div class="profile-info">
                  <el-tooltip class="item" effect="light" content="Your Github Token" placement="bottom-start">
                  <i class="el-icon-s-ticket profile-icon"></i>
                  </el-tooltip>
                  <div class="profile-detail">{{user.githubToken}}</div>
                </div>
                <br>
                <div class="profile-notice">
                  <i class="el-icon-ice-drink light-color"></i>
                  <span class="profile-notice-text">Basic Information</span>
                </div>
                <div class="profile-info">
                  <i class="el-icon-message profile-icon light-color"></i>
                  <div class="profile-detail">{{user.email}}</div>
                </div>
                <div class="profile-info">
                  <i class="el-icon-house profile-icon light-color"></i>
                  <div class="profile-detail">{{user.address}}</div>
                </div>
                <div class="profile-info">
                  <i class="el-icon-mobile-phone profile-icon light-color"></i>
                  <div class="profile-detail">{{user.phone}}</div>
                </div>
              </div>
            </el-col>
            <el-col :span="15">
              <div class="profile-right">
                <div style="display: inline-block; width: 100%;border-bottom: 1px solid gray;">
                  <div class="project-title">My Projects</div>
                  <button class="create-button" style="float: right" v-on:click="createNewJenkinsJob">Create New</button>
                </div>
                <div class="repo-list" v-for="project in projectList">
                  <img class="repo-img" :src="user.userface">
                  <div style="float: left; margin: 8px 0 8px 0;">
                    <div>
                      <span class="repo-name" v-on:click="projectDetailOnJenkins(project.name)">{{project.name}}</span>
                      <span class="repo-fork" >{{project.typeName}}</span>
                    </div>
                    <span height="auto" class="repo-time">{{project.create_time | formatDate}}</span>
                  </div>
                  <div class="repo-language">
                    <span class="repo-language-color" :style="{background: project.color}"></span>
                    <span>{{project.language}}</span>
                    <button class="delete-button" v-on:click="deleteProject(project.name)">delete</button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
        <footer class="home-footer">
          <span class="foot_title">© 1999-2019 Citrix Systems, Inc. All rights reserved.</span>
        </footer>
      </el-container>
    </div>
</template>

<script>
    export default {
      mounted: function () {
        this.initData();
      },
      methods: {
        handleCommand(cmd) {
          var _this = this;
          if (cmd == 'logout') {
            this.$confirm('Are you sure to log out?', 'Hint', {
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              _this.getRequest("/logout");
              _this.$store.commit('logout');
              _this.$router.replace({path: '/'});
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: 'Cancel'
              });
            });
          }
        },
        editClick: function () {
          this.$router.push("/setting");
        },
        initData() {
          var _this = this;
          this.postRequest("/project/all", {
            author: this.user.name
          }).then(resp => {
            if (resp && resp.status == 200) {
              var data = resp.data.obj;
              console.log(data.obj);
              var map = {Java: "#b07219", JavaScript: "#f1e05a", HTML: "#e34c26", Swift: "#ffac45", Python: "#3572A5"};
              var type_map = {0: "unknown", 1: "windows server",2: "linux server", 3: "Docker"}
              for (var project in data) {
                data[project].color = map[data[project].language];
                data[project].typeName = type_map[data[project].type];
              }
              _this.projectList = data;
              console.log(data);
            }
          })
        },
        projectDetailOnJenkins(name) {
          window.open('http://3.15.149.72:8080/job/' + name);
        },
        deleteProject(name) {
          this.postRequest("/project/delete", {
            name: name,
          }).then(resp => {
            if (resp && resp.status == 200) {
              location.reload();
            }
          })
        },
        createNewJenkinsJob() {
          var currentGithubName = this.user.githubName;
          var currentGithubToken = this.user.githubToken;
          console.log(currentGithubName + currentGithubToken);
          if (currentGithubName!=null && currentGithubToken !=null) {
            this.$router.push("/create/job");
          } else {
            alert("Please go to the settings page to improve the information！");
            this.$router.push("/setting");
          }
        }
      },
      data() {
        return {
          url: 'https://raw.githubusercontent.com/PeterBrave/MardownPic/master/citrix-logo.jpg',
          fit: 'contain',
          projectList: [],
        }
      },
        name: "GithubRegister",
      computed: {
        user() {
          return this.$store.state.user;
        }
      }
    }

</script>

<style scoped>
  .profile-left {
    /*border-right: 1px solid gray;*/
    height: auto;
    padding-left: 80px;
    padding-right: 20px;
  }
  .profile-right {
    border-left: 1px solid gray;
    height: auto;
    margin: 4px 12px;
    padding-left: 30px;
  }
  .profile-avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin-top: 40px;
    box-shadow: 0 0 2px gray;
  }
  .profile-name {
    display: block;
    height: 40px;
  }
  .profile-username {
    font-size: 24px;
    line-height: 28px;
    font-weight: 400;
    float: left;
  }
  .profile-button {
    float: right;
    border: none;
    font-size: 14px;
    line-height: 18px;
    font-weight: bold;
    padding: 6px 12px;
    background-color: rgba(0,120,212,1);
    color: white;
    border-radius: 2px;
    bottom: 0px;
  }
  .profile-notice {
    text-align: left;
    margin: 10px 0;
    padding: 6px 4px;
    border-bottom: 1px solid rgba(0,120,212,1);
  }
  .el-icon-warning {
    color: rgba(0,120,212,1);
    font-size: 22px;
  }
  .profile-notice-text {
    font-size: 18px;
  }
  .profile-info {
    display: block;
    text-align: left;
    margin: 10px 0;
    padding: 6px 0;
    height: 30px;
  }
  .profile-icon {
    font-size: 24px;
    float: left;
    padding: 4px 2px;
    color: blueviolet;
  }
  .profile-detail {
    float: left;
    padding: 4px 2px;
    margin-left: 4px;
  }
  .light-color {
    color: rgba(0,120,212,1);
  }
  .el-icon-ice-drink {
    font-size: 22px;
  }
  .project-title {
    text-align: left;
    font-size: 24px;
    line-height: 28px;
    font-weight: 400;
    padding: 12px 0;
    float: left;
  }
  .delete-button {
    border: none;
    font-size: 12px;
    line-height: 14px;
    font-weight: bold;
    padding: 2px 6px;
    background-color: rgba(0,120,212,1);
    color: white;
    border-radius: 2px;
    float: right;
  }
  .create-button {
    border: none;
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
    padding: 6px 12px;
    background-color: rgba(0,120,212,1);
    color: white;
    border-radius: 2px;
    position: relative;
    bottom: 0px;
  }
</style>
