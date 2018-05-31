/*
 * @Author: mikey.zhaopeng
 * @Date: 2018-05-11 23:22:56
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-11 23:25:06
 */
 /*

*/
<template>
<div>
 <mt-header id="hd" fixed title="英格尔数据采集平台"></mt-header>
  <div id="content" class="routerview">
    <transition name="fade" mode="out-in">
    <router-view></router-view>
    </transition>
  </div>
  <footer class="mui-bar mui-bar-tab">
    <router-link class="mui-tab-item" to="/main">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="mui-tab-item" to="/data">
      <span class="mui-icon mui-icon-contact"></span>
      <span class="mui-tab-label">实时数据</span>
    </router-link>
    <router-link class="mui-tab-item" to="/history_data">
      <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
      <span class="mui-badge">1</span>
      </span>
      <span class="mui-tab-label">报表</span>
    </router-link>
    <router-link class="mui-tab-item" to="/search">
      <span class="mui-icon mui-icon-search"></span>
      <span class="mui-tab-label">搜索</span>
    </router-link>
  </footer>
</div>
</template>

<script>

export default {
  data () {
    return {
      collapse: false
    }
  },
  components: {

  },
  created () {
  }
}

</script>

<style>
  @import '../../../static/css/muihead.css';
body{
  background-color:white;
}
.mint-tab-item-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 5px
}
.routerview{
  margin-top: 45px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
