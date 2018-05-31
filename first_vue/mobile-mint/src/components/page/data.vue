<template>
    <div class="table">

        <mt-badge size="normal">10</mt-badge>
        <mt-cell title="标题文字"></mt-cell>
<mt-cell title="标题文字" value="说明文字"></mt-cell>

        <!--
        <div  >
          <el-tag style="width:400px;">更新时间: {{RealtimeData[0].Create_Time}}</el-tag><br><br>

          <el-tag style="color:#ffffff">UA: {{RealtimeData[0].UA}} kV</el-tag>
          <el-tag style="color:#ffffff">UB: {{RealtimeData[0].UB}} kV</el-tag>
          <el-tag style="color:#ffffff">UC: {{RealtimeData[0].UC}} kV</el-tag>

          <el-tag style="color:#ffffff">IA: {{RealtimeData[0].IA}} A</el-tag>
          <el-tag style="color:#ffffff">IB: {{RealtimeData[0].IB}} A</el-tag>
          <el-tag style="color:#ffffff">IC: {{RealtimeData[0].IC}} A</el-tag><br>

          <el-tag style="color:#ffffff">P: {{RealtimeData[0].P}} kW</el-tag>
          <el-tag style="color:#ffffff">Q: {{RealtimeData[0].Q}} kVar</el-tag>
          <el-tag style="color:#ffffff">COS: {{RealtimeData[0].COS}}</el-tag><br><br>

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
        </div>-->
        <div >
<el-button @click="heZha"  type="danger ">合闸</el-button>
<el-button @click="fenZha" type="success">分闸</el-button>
        </div>
        <div style="height:60px"></div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      RealtimeData: [],
      load: true,
      command: ''
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
    },
    fenZha () {
      MessageBox.prompt('请输入控制密码').then(({ value, action }) => {

      })
      this.command = {type: 'fenzha', msg: 'FFF0FE'}
      this.axiosapi.ajaxPost(this.api.commandFZ, this.command, res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message.success('分闸成功')
        } else {
          this.$message.error('分闸失败')
        }
      })
    },
    heZha () {
      MessageBox.prompt('请输入控制密码').then(({ value, action }) => {

      })
      this.command = {type: 'hezha', msg: 'F0F0FE'}
      this.axiosapi.ajaxPost(this.api.commandHZ, this.command, res => {
        if (res.data.code === 200) {
          this.$message.success('合闸成功')
        } else {
          this.$message.error('合闸失败')
        }
      })
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
  background:#21d0d3;
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
