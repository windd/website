<template>
    <div >
        <group>
          <datetime v-model="startTime" :format="format" @on-change="onChange" title="起始时间"></datetime>
          <datetime v-model="endTime" :format="format" @on-change="onChange" title="终止时间"></datetime>
          <x-number :title="title" v-model="currentPage" button-style="round" :min="1" :max="pageTotal" fillable></x-number>
        </group>
        <div>
        <el-table
          style="width: 100%"
          v-loading='load'
          class="td_center"
          :data="TableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          ref="multipleTable" >
               <el-table-column prop="Create_Time" label="时间" width="130px" fixed></el-table-column>
                <el-table-column prop="UA" label="UA" ></el-table-column>
                <el-table-column prop="UB" label="UB"></el-table-column>
                <el-table-column prop="UC" label="UC"></el-table-column>
                <el-table-column prop="IA" label="IA"></el-table-column>
                <el-table-column prop="IB" label="IB" ></el-table-column>
                <el-table-column prop="IC" label="IC" ></el-table-column>
                <el-table-column prop="P" label="P" ></el-table-column>
                <el-table-column prop="Q" label="Q" ></el-table-column>
                <el-table-column prop="COS" label="COS" ></el-table-column>
                <el-table-column prop="UpTempA" label="上A温度" ></el-table-column>
                <el-table-column prop="UpTempB" label="上B温度" ></el-table-column>
                <el-table-column prop="UpTempC" label="上C温度" ></el-table-column>
                <el-table-column prop="DownTempA" label="下A温度" ></el-table-column>
                <el-table-column prop="DownTempB" label="下B温度" ></el-table-column>
                <el-table-column prop="DownTempC" label="下C温度" ></el-table-column>
                <el-table-column prop="AirTemp" label="空气温度" ></el-table-column>
                <el-table-column prop="AirHumidity" label="空气湿度" ></el-table-column>
                <el-table-column prop="SF6" label="六氟化硫" ></el-table-column>
                <el-table-column prop="Noise" label="噪音" ></el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
import { XNumber, Datetime } from 'vux'

export default {
  components: {
    Datetime,
    XNumber
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      format: 'YYYY-MM-DD HH:mm',
      TableData: [],
      load: true,
      pageSize: 20,
      pageTotal: 1,
      title: '',
      currentPage: 1,
      Period: ['2018-5-15 10:10', '2018-5-15 11:00']// [new Date() - 3600 * 1000 * 24, new Date()]
    }
  },
  created () {
    // this.endTime = (new Date()).toJSON()
    this.endTime = this.datefomat(this.format, new Date())
    this.startTime = this.datefomat(this.format, new Date() - 3600 * 1000 * 24)
    this.onChange()
    this.getData()
  },
  mounted () {

  },
  methods: {
    datefomat (fmt, dat) {
      let date = new Date(dat)
      var o = {
        'M+': date.getMonth() + 1,                 // 月份
        'D+': date.getDate(),                    // 日
        'H+': date.getHours(),                   // 小时
        'm+': date.getMinutes(),                 // 分
        's+': date.getSeconds(),                 // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds()             // 毫秒
      }
      if (/(Y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      }
      return fmt
    },
    onChange (val) {
      this.Period[0] = this.startTime
      this.Period[1] = this.endTime
      console.log(this.Period)
      console.log('change', val)
      this.getData()
    },
    getData () {
      this.currentPage = 1
      console.log(this.Period)
      this.axiosapi.ajaxPost(this.api.dataHistory, this.Period, res => {
        if (res.data.code === 200) {
          res.data.historydata.forEach(element => {
            element.Create_Time = element.Create_Time.slice(5, 19)
          })
          this.TableData = res.data.historydata
          this.pageTotal = Math.ceil(this.TableData.length / this.pageSize)
          this.title = '共' + this.TableData.length + '条' + this.pageTotal + '页'
          this.load = false
        } else {
          this.$message.error('wrong')
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }

  }
}
</script>

<style>
.el-table td, .el-table th {
    padding: 1px 0 !important;
    text-align: center;
}
</style>
