<template>
  <el-container>
  <div>
    <img
      class="citrix-logo"
      :src="url"
      :fit="fit"/>
    <el-link class="textLogin" style="font-size: 15px; color: #409EFF; " @click="submitLogin">Login</el-link>
    <el-link class="textSignup" style="font-size: 15px; " @click="submitSignup">SignUp</el-link>
  </div>
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">Login to CI/CD System</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="Account"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="Password"></el-input>
    </el-form-item>
    <el-form-item style="width: 100% ">
      <el-button type="primary" style="width:100%" @click="submitClick">Login</el-button>
<!--      <el-button type="primary" style="width: 35%" @click="submitRegister">Sign up</el-button>-->
    </el-form-item>
    <div style="font-size: 12px">
      New User?<span style="font-size: 12px; color: #409EFF" @click="submitRegister">Sign Up</span>
    </div>
  </el-form>
  </el-container>
</template>
<script>
  export default{
    data(){
      return {
        url: 'https://raw.githubusercontent.com/PeterBrave/MardownPic/master/citrix-logo.jpg',
        fit: 'contain',
        rules: {
          account: [{required: false, message: 'Please Enter the Username', trigger: 'blur'}],
          checkPass: [{required: false, message: 'Please Enter the Password', trigger: 'blur'}]
        },
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      submitLogin: function(){
        this.$router.push("/");
      },
      submitSignup: function(){
        this.$router.push("/register");
      },
      submitClick: function () {
        var _this = this;
        this.loading = true;
        this.postRequest('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            window.localStorage.clear();
            var data = resp.data;
            _this.$store.commit('login', data.obj);
            console.log(data.obj);
            var path = _this.$route.query.redirect;
            _this.$router
              .replace({path: path == '/' || path == undefined ? '/profile' : path});
          }
        });
      },
      submitRegister () {
        this.$router.push("/register");
      }
    }
  }
</script>
<style>
  .textLogin{
    position: absolute;
    right: 35px;
    top: 15px;
  }
  .textSignup{
    position: absolute;
    right: 95px;
    top: 15px;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
