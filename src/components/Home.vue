<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header">
        <span class="home_title" style="font-family: Monaco; color: black">Citrix CI/CD</span>
        <div style="display: flex;align-items: center;margin-right: 7px">
<!--          <el-badge style="margin-right: 30px" :is-dot="this.$store.state.nfDot">-->
<!--            <i class="fa fa-bell-o" @click="goChat" style="cursor: pointer"></i>-->
<!--          </el-badge>-->
          <el-dropdown style="color: black" @command="handleCommand">
  <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center;">
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
        <el-aside width="210px" class="home-aside">
          <div style="display: flex;justify-content: flex-start;width: 210px;text-align: left; font-family: 'Microsoft YaHei'">
            <el-menu style="background:#ececec;width: 210px;" unique-opened router>
              <template v-for="(item,index) in this.routes" v-if="!item.hidden">
                <el-submenu :key="index" :index="index+''">
                  <template slot="title">
                    <i :class="item.iconCls" style="color: #20a0ff;width: 14px;"></i>
                    <span slot="title">{{item.name}}</span>
                  </template>
                  <el-menu-item width="200px"
                                style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 209px;text-align: left"
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
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>

          <router-view v-if="this.$route.meta.keepAlive"></router-view>

          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>
          <el-footer class="home-footer" >
            <span class="foot_title" style="font-family: Monaco"> Made by Three Walnuts! @seu.edu.cn</span>
          </el-footer>

      </el-container>


      </el-container>

    </el-container>
  </div>
</template>
<script>
  export default{
//     mounted: function () {
// //      this.devMsg();
//       this.loadNF();
//     },
    methods: {
      // loadNF(){
      //   var _this = this;
      //   this.getRequest("/chat/sysmsgs").then(resp=> {
      //     var isDot = false;
      //     resp.data.forEach(msg=> {
      //       if (msg.state == 0) {
      //         isDot = true;
      //       }
      //     })
      //     _this.$store.commit('toggleNFDot', isDot);
      //   })
      // },
      // goChat(){
      //   this.$router.push({path: '/chat'});
      // },
      // devMsg(){
      //   this.$alert('为了确保所有的小伙伴都能看到完整的数据演示，数据库只开放了查询权限和部分字段的更新权限，其他权限都不具备，完整权限的演示需要大家在自己本地部署后，换一个正常的数据库用户后即可查看，这点请大家悉知!', '友情提示', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.$notify({
      //         title: '重要重要!',
      //         type: 'warning',
      //         message: '小伙伴们需要注意的是，目前只有权限管理模块完工了，因此这个项目中你无法看到所有的功能，除了权限管理相关的模块。权限管理相关的模块主要有两个，分别是 [系统管理->基础信息设置->权限组] 可以管理角色和资源的关系， [系统管理->操作员管理] 可以管理用户和角色的关系。',
      //         duration: 0
      //       });
      //     }
      //   });
      // },
      handleCommand(cmd){
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
    data(){
      return {
        // isDot: false
      }
    },
    computed: {
      user(){
        return this.$store.state.user;
      },
      routes(){
        return this.$store.state.routes
      }
    }
  }
</script>
<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    display: flex;
    line-height: 60px;
  }

  .home-aside {
    background-color: #D3DCE6;
    line-height: unset;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .foot_title{
    color: black;
    font-size: 10px;
    display: inline;
    margin-left: 500px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>
