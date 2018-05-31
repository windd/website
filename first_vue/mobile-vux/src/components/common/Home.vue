<template>
<div style="height:100%;">

  <x-header  style="width:100%;position:absolute;left:0;top:0;z-index:100;" title="英格尔数据采集平台" ></x-header>
  <div id="content" class="routerview">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  <tabbar  >
      <tabbar-item selected link="/main">
       <img slot="icon" src="../../../static/img/home.png"/>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/data" badge="" icon-class="">
       <img slot="icon" src="../../../static/img/data.png"/>
        <span slot="label">实时数据</span>
      </tabbar-item>
      <tabbar-item  link="/history_data">
       <img slot="icon" src="../../../static/img/table.png"/>
        <span slot="label">报表</span>
      </tabbar-item>
      <tabbar-item link="/search">
        <img slot="icon" src="../../../static/img/search.png"/>
        <span slot="label">搜索</span>
      </tabbar-item>
    </tabbar>

</div>
</template>

<script>
import { ViewBox, Icon, Tabbar, TabbarItem, XHeader } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    Icon,
    ViewBox
  },

  data () {
    return {
      collapse: false
    }
  },
  created () {
  }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.routerview{
  margin-top: 45px;
  margin-bottom: 60px;
}
</style>
