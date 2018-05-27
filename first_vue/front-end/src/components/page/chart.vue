<template>
  <div>
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
    <span>
         <el-select v-model="selectValue" clearable placeholder="请选择">
         <el-option
      v-for="item in selectOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </span>
    <div id="myChart" :style="{width: '1000px', height: '500px'}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
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
      Period: ['2018-5-15 10:10', '2018-5-15 11:00'], // [new Date() - 3600 * 1000 * 24, new Date()],
      postData: {
        start: '',
        end: '',
        dataName: 'UA'
      },
      myChart: '',
      chartOption: {
        title: { text: '数据曲线' },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '',
          type: 'line',
          data: []
        }]
      },
      selectOptions: [{
        value: 'UA',
        label: 'UA'
      }, {
        value: 'UB',
        label: 'UB'
      }, {
        value: 'UC',
        label: 'UC'
      }, {
        value: 'IA',
        label: 'IA'
      }, {
        value: 'P',
        label: 'P'
      }],
      selectValue: 'UA'
    }
  },
  created () {
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      this.myChart.setOption(this.chartOption)
    },
    getData () {
      this.chartOption.title.text = this.selectValue
      this.postData.start = this.Period[0]
      this.postData.end = this.Period[1]
      this.postData.dataName = this.selectValue
      console.log(this.chartOption.series)
      this.axiosapi.ajaxPost(this.api.dataChart, this.postData, res => {
        if (res.data.code === 200) {
          this.chartOption.series[0].data = res.data.chartData
          this.chartOption.series[0].name = this.selectValue
          let i
          for (i = 1; i < this.chartOption.series[0].data.length - 1; i++) {
            this.chartOption.xAxis.data[i] = ''
          }
          this.chartOption.xAxis.data[0] = this.Period[0]
          this.chartOption.xAxis.data[i] = this.Period[1]
          this.myChart.setOption(this.chartOption)
        } else {
          this.$message.error('wrong')
        }
      })
    }
  }

}
</script>
