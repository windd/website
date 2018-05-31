<template>
<div>
  <grid :show-lr-borders="true" :show-vertical-dividers="true">
      <grid-item link="/data" label="实时数据">
        <img slot="icon" src="../../../static/img/data.png">
      </grid-item>
      <grid-item link="/history_data" label="历史报表">
        <img slot="icon" src="../../../static/img/table.png">
      </grid-item>
      <grid-item link="/search" label="搜索">
        <img slot="icon" src="../../../static/img/search.png">
      </grid-item>
    </grid>
</div>
</template>

<script>
import { Grid, GridItem } from 'vux'
export default {
  components: {
    Grid,
    GridItem
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style>

</style>
