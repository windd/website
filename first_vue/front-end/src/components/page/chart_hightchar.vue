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
    <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
    <!--<button @click="load">load</button>-->
  </div>
</template>

<script>
import VueHighcharts from 'vue2-highcharts'
var asyncData = {

  name: 'UA',
  marker: {
    symbol: 'square'
  },
  data: [
    7.0,
    6.9,
    9.5,
    14.5,
    18.2,
    21.5,
    25.2,
    {
      y: 26.5,
      marker: {
        symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
      }
    },
    23.3,
    18.3,
    13.9,
    9.6
  ]
}
export default {
  components: {
    VueHighcharts
  },
  data () {
    return {
      aaa: [],
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
      Period: [new Date() - 3600 * 1000 * 24, new Date()],
      options: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Monthly Average Temperature'
        },
        subtitle: {
          text: 'Source: WorldClimate.com'
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ]
        },
        yAxis: {
          title: {
            text: 'Temperature'
          },
          labels: {
            formatter: function () {
              return this.value + '°'
            }
          }
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            }
          }
        },
        series: []
      }
    }
  },
  created () {

  },
  mounted () {
    this.getData()
    this.load()
  },
  methods: {
    load () {
      let lineCharts = this.$refs.lineCharts
      lineCharts.delegateMethod('showLoading', 'Loading...')
      setTimeout(() => {
        lineCharts.addSeries(asyncData)
        lineCharts.hideLoading()
      }, 100)
    },
    getData () {
      this.axiosapi.ajaxGet(this.api.dataChart, res => {
        this.aaa = res.data.chartdata
        // this.load = false
        console.log(this.aaa)
        let i = this.aaa.length
        console.log(asyncData)
        while (i) {
          asyncData.data[i - 1] = this.aaa[i - 1].UA
          i--
        }
        console.log(asyncData.data)
      })
    }
  }

}
</script>
