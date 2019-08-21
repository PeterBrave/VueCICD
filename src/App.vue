<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: "Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
  input:focus {
    outline: 0;
    border: 1px solid rgba(0,120,212,1);
  }
  button:focus {
    outline: 0;
    border: 1px solid rgba(0,120,212,1);
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
    position: fixed;
    left: 0;
    right: 0;
    width: auto;
    z-index: 99;
    background-color: white;
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
    background-color: transparent;
    padding-left: 8px;
  }
  .foot_title {
    color: black;
    font-size: 16px;
    display: inline;
    margin-right: 20px;
  }
  .new-pipeline {
    margin: 10px 0 10px 0;
    text-align: left;
  }
  .title {
    font-size: 28px;
    font-weight: bold;
    line-height: 40px;
    letter-spacing: -.04em;
  }
  .fl-left {
    float: left;
  }
  .container {
    text-align: left;
    width: 100%;
    margin-top: 20px;
    height: 100%;
  }
  .process {
    margin-top: -20px;
    width: 80%;
    background-color: white;
  }
  .setting-profile-main {
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
  }
  a{
    text-decoration:none;
    color:#333;
  }
  .citrix-logo {
    width: 80px;
    height: auto;
    vertical-align: middle;
    padding-left: 12px;
  }
  .repo-list {
    width: 100%;
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
    width: 20%;
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
  .monaco-editor {
    height: 512px;
  }
  .monaco-container {
    height: auto;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0 0 2px gray;
    border-radius: 2px;
  }
  .file-name {
    line-height: 32px;
    font-size: 21px;
    letter-spacing: -.02em;
    font-weight: 600;
    padding: 18px 36px;
  }
  .run-button {
    border: none;
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
    padding: 6px 12px;
    background-color: rgba(0,120,212,1);
    color: white;
    border-radius: 2px;
  }
  .fl-right {
    float: right;
  }
  .login-container {
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .header-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    margin-bottom: 22px;
  }
</style>
