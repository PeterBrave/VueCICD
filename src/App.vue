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
</style>
