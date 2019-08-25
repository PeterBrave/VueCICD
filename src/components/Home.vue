<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header" style="height: 48px;">
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
            <span class="el-dropdown-link home_userinfo"
                  style="display: flex;align-items: center; vertical-align: middle;">
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

      <el-container style="margin-top: 0px; margin-bottom: 0px">
        <el-aside width="20%" class="home-aside">
          <div style="display: flex;justify-content: flex-start;width: 100%;text-align: left;">
            <el-menu
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              router="true"
              style="width: 100%">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>Project</span>
                </template>
                  <el-menu-item v-on:click="jumpToJenkins(project.name)" v-for="(project, index) in projectList" :key="index" class="bg-gray">
                    <i class="el-icon-s-data"></i>
                    <span slot="title">{{project.name}}</span>
                  </el-menu-item>
              </el-submenu>
              <el-menu-item
                index="/create/job">
                <i class="el-icon-circle-plus-outline"></i>
                <span slot="title">Create</span>
              </el-menu-item>
              <el-menu-item
                index="/profile">
                <i class="el-icon-s-custom"></i>
                <span slot="title">Account Center</span>
              </el-menu-item>
            </el-menu>
            <div class="menu-bottom">
              <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router="true"
                style="width: 100%">
                <el-menu-item index="/setting">
                  <i class="el-icon-setting"></i>
                  <span slot="title">Setting</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-main style="background-color: #f6f6f6; position: fixed; top:48px; left: 20%; bottom: 0px; width: 80%">

            <router-view v-if="this.$route.meta.keepAlive"></router-view>

            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          </el-main>

        </el-container>


      </el-container>

    </el-container>
    <footer class="home-footer">
      <span class="foot_title">© 1999-2019 Citrix Systems, Inc. All rights reserved.</span>
    </footer>
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
      initData() {
        var _this = this;
        this.postRequest("/project/all", {
          author: this.user.name
        }).then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data.obj;
            console.log(data.obj);
            _this.projectList = data;
          }
        })
      },
      jumpToJenkins(name) {
        window.open('http://3.15.149.72:8080/job/' + name);
      }
    },
    data() {
      return {
        url: 'https://raw.githubusercontent.com/PeterBrave/MardownPic/master/citrix-logo.jpg',
        fit: 'contain',
        projectList: [],
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      routes() {
        return this.$store.state.routes
      }
    }
  }
</script>
<style>
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form,
  fieldset, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
  }

  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-aside {
    background-color: #ececef;
    line-height: unset;
    position: fixed;
    left: 0;
    top: 5%;
    bottom: 0;
  }


  .home_userinfo {
    cursor: pointer;
  }

  .el-submenu .el-menu-item {
    width: 100%;
    min-width: 175px;
  }
  .menu-bottom {
    position: fixed;
    bottom: 0px;
    left: 0;
    border-top: 1px solid rgba(0, 0, 0, .1);
    width: 20%;
  }
  .bg-gray {
    background-color: rgba(0, 0, 0, .07);
  }

</style>
