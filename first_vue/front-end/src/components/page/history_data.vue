<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 历史数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        <el-table v-loading='load' :data="RealtimeData" border style="width: 100%" ref="multipleTable" >
               <el-table-column prop="create_time" label="时间" width="180"></el-table-column>
                <el-table-column prop="UA" label="UA" width="80"></el-table-column>
                <el-table-column prop="UB" label="UB" width="80"></el-table-column>
                <el-table-column prop="UC" label="UC" width="80"></el-table-column>
                <el-table-column prop="IA" label="IA" width="80"></el-table-column>
                <el-table-column prop="IB" label="IB" width="80"></el-table-column>
                <el-table-column prop="IC" label="IC" width="80"></el-table-column>
                <el-table-column prop="P" label="P" width="80"></el-table-column>
                <el-table-column prop="Q" label="Q" width="80"></el-table-column>
                <el-table-column prop="COS" label="COS" width="80"></el-table-column>
                <el-table-column prop="UpTempA" label="上A温度" width="80"></el-table-column>
                <el-table-column prop="UpTempB" label="上B温度" width="80"></el-table-column>
                <el-table-column prop="UpTempC" label="上C温度" width="80"></el-table-column>
                <el-table-column prop="DownTempA" label="下A温度" width="80"></el-table-column>
                <el-table-column prop="DownTempB" label="下B温度" width="80"></el-table-column>
                <el-table-column prop="DownTempC" label="下C温度" width="80"></el-table-column>
                <el-table-column prop="AirTemp" label="空气温度" width="80"></el-table-column>
                <el-table-column prop="AirHumidity" label="空气湿度" width="80"></el-table-column>
                <el-table-column prop="SF6" label="六氟化硫" width="80"></el-table-column>
                <el-table-column prop="Noise" label="噪音" width="80"></el-table-column>

        </el-table>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      RealtimeData: [],
      load: true
    }
  },
  created () {
    this.getData()
    // if (this.timeOut) {
    //   clearTimeout(this.timeOut)
    // }
    // this.getListing()
    console.log('create')
  },
  activated () {
    // this.getListing()
  },
  mounted () {
    // this.getListing()
  },
  methods: {
    getData () {
      this.axiosapi.ajaxGet(this.api.dataHistory, res => {
        this.RealtimeData = res.data.historydata
        this.load = false
      })
    },
    getListing () {
      this.getData()
      if (this.$route.path === '/data') {
        let _this = this
        this.timeOut = setTimeout(() => {
          _this.getListing()
        }, 2000)
      } else {
        // clearTimeout(this.timeOut)
        // this.timeOut = ''
      }
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 400px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
