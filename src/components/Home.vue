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
            <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center; vertical-align: middle;">
              {{user.name}}
              <i><img v-if="user.userface!=''" :src="user.userface"
                      style="width: 20px;height: 20px;margin-right: 5px;margin-left: 5px;border-radius: 40px; background-color:#D3DCE6 "/></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Account Center</el-dropdown-item>
              <el-dropdown-item>Setting</el-dropdown-item>
              <el-dropdown-item command="logout" divided>Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-container style="margin-top: 0px; margin-bottom: 0px">
        <el-aside width="250px" class="home-aside">
          <div style="display: flex;justify-content: flex-start;width: 250px;text-align: left;">
            <el-menu style="background:#ececec;width: 250px;" router default-active>
              <template v-for="(item,index) in this.routes" v-if="!item.hidden">
                <el-submenu :key="index" :index="index+''">
                  <template slot="title">
                    <i :class="item.iconCls" style="color: #20a0ff;width: 14px; vertical-align: middle; margin-right: 12px;"></i>
                    <span slot="title">{{item.name}}</span>
                  </template>
                  <el-menu-item width="210px"
                                style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 250px;text-align: left"
                                v-for="child in item.children"
                                :index="child.path"
                                :key="child.path">{{child.name}}
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </div>
        </el-aside>
        <el-container>
          <el-main style="background-color: #f6f6f6">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
              <!--            <p style="color: #2c3e50; font-family: 'Microsoft YaHei'; font-size: 50px; margin-top: 200px">Welcome to Citrix CI/CD!</p>-->
              <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>

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
      }
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

  .home-header {
    height: 48px;
    line-height: 48px;
    color: #333;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    border-bottom: 1px #c8c9cc solid;
  }

  .home_title {
    font-size: 16px;
    /*display: inline;*/
    margin-left: 18px;
    vertical-align: middle;
    font-weight: bolder;
    color: rgba(0,120,212,1);
  }

  .home-footer {
    text-align: right;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
    padding-left: 8px;
  }

  .home-aside {
    background-color: #ececef;
    line-height: unset;
  }

  .foot_title {
    color: black;
    font-size: 16px;
    display: inline;
    margin-right: 20px;
  }

  .home_userinfo {
    cursor: pointer;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }

</style>
