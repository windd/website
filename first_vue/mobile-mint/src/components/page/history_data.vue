<template>
    <div class="table">
        <span class="block">
          <span class="demonstration">设置起止日期:</span>

          <el-button @click="getData"  type="success">查询</el-button>
        </span>
          <span style="float:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev,  next, jumper"
            :total="TableData.length">
          </el-pagination>
          </span>
          <div></div>
        <div class="container">
        <el-table
          style="width: 100%"
          v-loading='load'
          class="td_center"
          :data="TableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          ref="multipleTable" >
               <el-table-column prop="Create_Time" label="时间" width="120px" fixed></el-table-column>
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
        <div style="height:60px">

        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      TableData: [],
      load: true,
      currentPage: 4,
      pageSize: 20,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      Period: ['2018-5-15 10:10', '2018-5-15 11:00']// [new Date() - 3600 * 1000 * 24, new Date()]
    }
  },
  created () {
    this.getData()
    console.log('create')
  },
  methods: {
    getData () {
      this.currentPage = 1
      console.log(this.Period)
      this.axiosapi.ajaxPost(this.api.dataHistory, this.Period, res => {
        if (res.data.code === 200) {
          // console.log(res.data.historydata)
          res.data.historydata.forEach(element => {
            element.Create_Time = element.Create_Time.slice(5, 19)
          })
          this.TableData = res.data.historydata
          // console.log(this.TableData)
          this.load = false
        } else {
          this.$message.error('wrong')
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    }

  }
}
</script>

<style>
.el-table td, .el-table th {
    padding: 1px 0 !important;
    text-align: center;
}
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
