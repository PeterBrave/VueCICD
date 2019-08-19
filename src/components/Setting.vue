<template>
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
      <el-main class="setting-profile-main">
        <el-row>
          <el-col :span="24">
            <div class="profile-left">
              <img :src="user.userface" class="profile-avatar">
              <el-row :gutter="20" class="input-model">
                <el-col :span="8">
                  <div class="setting-name">Name</div>
                </el-col>
                <el-col :span="16"><input class="setting-content" v-model="user.name"></input></el-col>
              </el-row>
              <div class="profile-notice">
                <i class="el-icon-warning"></i>
                <span class="profile-notice-text">The following need to set up carefully!</span>
              </div>
              <el-row :gutter="20" class="input-model">
                <el-col :span="8">
                  <div class="setting-name">Github Name</div>
                </el-col>
                <el-col :span="16"><input class="setting-content" v-model="user.githubName"></input></el-col>
              </el-row>
              <el-row :gutter="20" class="input-model">
                <div>
                  <el-col :span="8">
                    <div class="setting-name">Github Token</div>
                  </el-col>
                  <el-col :span="16"><input class="setting-content" v-model="user.githubToken" :type="showToken?'password':'text'"></input></el-col>
                </div>
              </el-row>
              <br>
              <div class="profile-notice">
                <i class="el-icon-ice-drink light-color"></i>
                <span class="profile-notice-text">Basic Information</span>
              </div>
              <el-row :gutter="20" class="input-model">
                <el-col :span="8">
                  <div class="setting-name">E-mail</div>
                </el-col>
                <el-col :span="16"><input class="setting-content" v-model="user.email"></input></el-col>
              </el-row>
              <el-row :gutter="20" class="input-model">
                <el-col :span="8">
                  <div class="setting-name">Address</div>
                </el-col>
                <el-col :span="16"><input class="setting-content" v-model="user.address"></input></el-col>
              </el-row>
              <el-row :gutter="20" class="input-model">
                <el-col :span="8">
                  <div class="setting-name">Phone</div>
                </el-col>
                <el-col :span="16"><input class="setting-content" v-model="user.phone"></input></el-col>
              </el-row>
              <button class="setting-button" @click="submitModify">Save change</button>
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
    data() {
      return {
        url: 'https://raw.githubusercontent.com/PeterBrave/MardownPic/master/citrix-logo.jpg',
        fit: 'contain',
        showToken: true,
      }
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
      submitModify: function () {
        console.log("here");
        var _this = this;
        this.loading = true;
        this.postRequest('/user/modify', {
          name: this.user.name,
          githubName: this.user.githubName,
          githubToken: this.user.githubToken,
          email: this.user.email,
          address: this.user.address,
          phone: this.user.phone
        }).then(resp => {
          _this.loading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.$store.commit('login', data.obj);
            _this.$router.push("/profile");
          } else {
            this.$message('update error');
          }
        })
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    }
  }

</script>

<style scoped>
  .profile-left {
    height: 700px;
    padding-left: 100px;
    padding-right: 50px;
    width: 64%;
  }

  .profile-avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin-top: 40px;
    box-shadow: 0 0 2px gray;
  }

  .input-model {
    margin: 20px 0;
    height: 32px;
  }

  .setting-name {
    text-align: left;
  }

  .setting-content {
    float: left;
    width: 100%;
    height: 30px;
    font-size: 14px;
    padding-left: 8px;
  }

  .profile-notice {
    text-align: left;
    margin: 10px 0;
    padding: 6px 4px;
    border-bottom: 1px solid rgba(0, 120, 212, 1);
  }

  .el-icon-warning {
    color: rgba(0, 120, 212, 1);
    font-size: 22px;
  }

  .profile-notice-text {
    font-size: 18px;
  }

  .light-color {
    color: rgba(0, 120, 212, 1);
  }

  .el-icon-ice-drink {
    font-size: 22px;
  }

  .setting-button {
    float: left;
    border: none;
    font-size: 14px;
    line-height: 18px;
    font-weight: bold;
    padding: 6px 12px;
    background-color: rgba(0, 120, 212, 1);
    color: white;
    border-radius: 2px;
    bottom: 0px;
  }
</style>
