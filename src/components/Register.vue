<template>
  <el-container>
    <div>
      <img
        class="citrix-logo"
        :src="url"
        :fit="fit"/>
      <el-link class="textLogin" style="font-size: 15px; " @click="submitLogin">Login</el-link>
      <el-link class="textSignup" style="font-size: 15px;color: #409EFF; " @click="submitSignup">SignUp</el-link>
    </div>
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">Sign Up to CI/CD System</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="Account"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="Password"></el-input>
    </el-form-item>
    <el-form-item style="width: 100% ">
      <el-button type="primary" style="width: 100%" @click="submitClick">Sign Up</el-button>
    </el-form-item>
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
        checked: true,
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
        this.postRequest('/register', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            this.$router.push({path: '/'})
          } else {
            alert("error!");
          }
        });
      }
    }
  }
</script>

<style>
  .citrix-logo{
    position: absolute;
    left: 45px;
    top: 20px;
  }
  .textLogin{
    position: absolute;
    right: 35px;
    top: 20px;
  }
  .textSignup{
    position: absolute;
    right: 95px;
    top: 20px;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
