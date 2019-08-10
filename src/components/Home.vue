<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header" height="48px">
        <div>
          <img
            class="citrix-logo"
            :src="url"
            :fit="fit"/>
          <span class="home_title">DevOps Platform</span>
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
              <el-menu-item>
                <i class="el-icon-menu"></i>
                <span slot="title">Overview</span>
              </el-menu-item>
              <el-menu-item
                index="/create/job"
                class="bg-gray">
                <i class="el-icon-circle-plus-outline"></i>
                <span slot="title">Create</span>
              </el-menu-item>
              <el-menu-item
                index="/config/server"
                class="bg-gray">
                <i class="el-icon-upload"></i>
                <span slot="title">Server</span>
              </el-menu-item>
              <el-menu-item
                index="/config/jkfile"
                class="bg-gray">
                <i class="el-icon-edit"></i>
                <span slot="title">Jenkinsfile</span>
              </el-menu-item>
              <el-menu-item index="/setting" class="menu-setting">
                <i class="el-icon-setting"></i>
                <span slot="title">Setting</span>
              </el-menu-item>
            </el-menu>
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
      <span class="foot_title">© 1999-2019 Citrix Systems, Inc. 保留所有权利。</span>
    </footer>
  </div>
</template>
<script>
  export default {
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

    },
    data() {
      return {
        url: 'https://raw.githubusercontent.com/PeterBrave/MardownPic/master/citrix-logo.jpg',
        fit: 'contain',
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

  .citrix-logo {
    width: 80px;
    height: auto;
    vertical-align: middle;
    padding-left: 12px;
  }

  .home-aside {
    background-color: #ececef;
    line-height: unset;
    position: fixed;
    left: 0;
    top: 48px;
    bottom: 0;
  }


  .home_userinfo {
    cursor: pointer;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
  .menu-setting {
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 20%;
    height: 56px;
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
  .bg-gray {
    background-color: rgba(0, 0, 0, .07);
  }

</style>
