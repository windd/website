<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 实时数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="float:left;" class="">
          <img src="../../../static/img/kyn28-side.png"><br><br>
        </div>
        <div style="display:inline-block;width:700px;height:546px;margin-left:10px" class="">
          <el-tag style="width:400px;color:#98FB98">更新时间: {{RealtimeData[0].Create_Time}}</el-tag><br><br>

          <el-tag style="color:#ffff00">UA: {{RealtimeData[0].UA}} kV</el-tag>
          <el-tag style="color:#00ff00">UB: {{RealtimeData[0].UB}} kV</el-tag>
          <el-tag style="color:#DC143C">UC: {{RealtimeData[0].UC}} kV</el-tag>

          <el-tag style="color:#ffff00">IA: {{RealtimeData[0].IA}} A</el-tag>
          <el-tag style="color:#00ff00">IB: {{RealtimeData[0].IB}} A</el-tag>
          <el-tag style="color:#DC143C">IC: {{RealtimeData[0].IC}} A</el-tag><br><br>

          <el-tag >P: {{RealtimeData[0].P}} kW</el-tag>
          <el-tag >Q: {{RealtimeData[0].Q}} kVar</el-tag>
          <el-tag >COS: {{RealtimeData[0].COS}}</el-tag><br><br>

          <el-tag >上端A温度: {{RealtimeData[0].UpTempA}} ℃</el-tag>
          <el-tag >上端B温度: {{RealtimeData[0].UpTempB}} ℃</el-tag>
          <el-tag >上端C温度: {{RealtimeData[0].UpTempC}} ℃</el-tag>

          <el-tag >下端A温度: {{RealtimeData[0].UpTempA}} ℃</el-tag>
          <el-tag >下端B温度: {{RealtimeData[0].UpTempB}} ℃</el-tag>
          <el-tag >下端C温度: {{RealtimeData[0].UpTempC}} ℃</el-tag><br><br>

          <el-tag>空气温度: {{RealtimeData[0].AirTemp}} ℃</el-tag>
          <el-tag>空气湿度: {{RealtimeData[0].AirHumidity}} %</el-tag>
          <el-tag>六氟化硫: {{RealtimeData[0].SF6}} %</el-tag>
          <el-tag>噪音: {{RealtimeData[0].Noise}} dB</el-tag>

        <!--div class="container"
        <el-table v-loading='load' :data="RealtimeData">
                <el-table-column prop="UA" label="UA(kV)" width="100"></el-table-column>
                <el-table-column prop="UB" label="UB(kV)" width="100"></el-table-column>
                <el-table-column prop="UC" label="UC(kV)" width="100"></el-table-column>
        </el-table>
        <el-table v-loading='load' :data="RealtimeData" border :row-class-name="warning-row">
                <el-table-column prop="IA" label="IA(A)" width="100"></el-table-column>
                <el-table-column prop="IB" label="IB(A)" width="100"></el-table-column>
                <el-table-column prop="IC" label="IC(A)" width="100"></el-table-column>
        </el-table>
                <el-table v-loading='load' :data="RealtimeData" border :row-class-name="tableRowClassName" >
                <el-table-column prop="P" label="P(kW)" width="100"></el-table-column>
                <el-table-column prop="Q" label="Q(kVar)" width="100"></el-table-column>
                <el-table-column prop="COS" label="COS" width="100"></el-table-column>
        </el-table>
        <el-table v-loading='load' :data="RealtimeData" border :row-class-name="tableRowClassName" >
                <el-table-column prop="UpTempA" label="上A温度(℃)" width="100"></el-table-column>
                <el-table-column prop="UpTempB" label="上B温度(℃)" width="100"></el-table-column>
                <el-table-column prop="UpTempC" label="上C温度(℃)" width="100"></el-table-column>
        </el-table>
        <el-table v-loading='load' :data="RealtimeData" border :row-class-name="tableRowClassName" >
                <el-table-column prop="DownTempA" label="下A温度(℃)" width="100"></el-table-column>
                <el-table-column prop="DownTempB" label="下B温度(℃)" width="100"></el-table-column>
                <el-table-column prop="DownTempC" label="下C温度(℃)" width="100"></el-table-column>
        </el-table>
        <el-table v-loading='load' :data="RealtimeData" border :row-class-name="tableRowClassName" >
                <el-table-column prop="AirTemp" label="空气温度(℃)" width="105"></el-table-column>
                <el-table-column prop="AirHumidity" label="空气湿度(%)" width="100"></el-table-column>
                <el-table-column prop="SF6" label="六氟化硫" width="100"></el-table-column>
                <el-table-column prop="Noise" label="噪音(dB)" width="100"></el-table-column>
                <el-table-column prop="create_time" label="时间" width="160"></el-table-column>
        </el-table>-->
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
    // this.getData()
    // if (this.timeOut) {
    //   clearTimeout(this.timeOut)
    // }
    // this.getListing()
    console.log('create')
  },
  activated () {
    this.getListing()
  },
  mounted () {
    // this.getListing()
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 0) {
        return 'warning-row'
      } else if (rowIndex === 1) {
        return 'success-row'
      }
      return 'warning-row'
    },
    getData () {
      this.axiosapi.ajaxGet(this.api.dataLastest, res => {
        this.RealtimeData = res.data.latestdata
        this.load = false
      })
    },
    getListing () {
      this.getData()
      console.log(this.timeOut)
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

.el-table .warning-row {
    background: #ff00ff;
  }

.el-table .success-row {
    background: #379906;
  }

.el-tag{
  background:#848587;
  color: #13171f;
  width:200px;
  height: 50px;
  text-align: auto;
  line-height:50px;
  font-size: 20px;
  font:bold;
  margin-top: 2px;
}
</style>
