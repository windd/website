<template>
    <div class="table">
        <span class="block">
          <span class="demonstration">设置起止日期:</span>
          <el-date-picker
            v-model="Period"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
          <el-button @click="getData"  type="success">查询</el-button>
        </span>
          <span style="float:right;">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="TableData.length">
          </el-pagination>
          </span>
          <div></div>
        <div class="container">
        <el-table
          style="width: 100%"
          v-loading='load'
          :data="TableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          ref="multipleTable" >
               <el-table-column prop="Create_Time" label="时间" width="180"></el-table-column>
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
      TableData: [],
      load: true,
      currentPage: 4,
      pageSize: 10,
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
      Period: [new Date() - 3600 * 1000 * 24, new Date()]
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
          this.TableData = res.data.historydata
          this.load = false
          // console.log(this.TableData)
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
