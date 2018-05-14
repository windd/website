<template>
  <div>
      <div>
        <div>
             <!-- <img src="../assets/index/back.png" class="rank-head-back" @click="routerBack"/> -->
              <span >历史曲线</span>
        </div>
      </div>
      <div >
            <div >
                <span >{{$route.params.monitorName}}({{$route.params.meterId}})</span>
            </div>
      </div>
      <div >
            <div >
                <yesterdaypicker v-on:startPicked="startPicked" style="margin-left:10px;"></yesterdaypicker>
            </div>
                <div >
                <daypicker v-on:endPicked="endPicked" style="margin-left:10px;"></daypicker>
                </div>
      </div>
      <div >
            <div >
                  <vchooser  :selections="periodList" @on-change="onParamChange('versions', $event)"></vchooser>
            </div>
      </div>
      <div >
            <div class="charts" >
                 <vue-highcharts :options="options" ref="lineCharts" ></vue-highcharts>
            </div>
      </div>
  </div>
</template>

<script>
// import vchooser from '../components/chooser.vue'
import VueHighcharts from 'vue2-highcharts'
// import daypicker from '../components/daypicker.vue'
// import yesterdaypicker from '../components/yesterdaypicker.vue'

export default {
  data () {
    return {
      startDay: '',
      endDay: '',
      setIntervalNum: 0,
      itemStatus: 0,
      itemTitle: '功率因数',
      itemType: this.$route.params.meterType,
      periodList: [
        {
          label: '功率因数',
          value: 0
        },
        {
          label: '电流',
          value: 1
        },
        {
          label: '电压',
          value: 2
        },
        {
          label: '有功功率',
          value: 3
        },
        {
          label: '无功功率',
          value: 4
        },
        /*, {
               label: '视在功率',
               value: 5
             } */ {
          label: '有功电量',
          value: 6
        }
      ],
      ownerFreeData: [],
      options: {
        global: {
          useUTC: false
        },
        chart: {
          type: 'spline'
        },
        title: {
          text: '功率因素'
          // text: ' '
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: '功率因素(%)'
            // text: '  '
          },
          labels: {
            formatter: function () {
              return this.value
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
  methods: {
    startPicked (year, month, date) {
      // this.ownerFreeData = []
      if (this.$refs.lineCharts != null) {
        this.$refs.lineCharts.removeSeries()
      }
      var monthStr = ''
      var dayStr = ''
      if (month < 10) {
        monthStr = `0${month}`
      } else {
        monthStr = `${month}`
      }
      if (date < 10) {
        dayStr = `0${date}`
      } else {
        dayStr = `${date}`
      }

      this.startDay = `${year}-` + monthStr + '-' + dayStr

      if (this.$refs.lineCharts != null) {
        this.getList()
      }
    },
    endPicked (year, month, date) {
      // this.ownerFreeData = []
      if (this.$refs.lineCharts != null) {
        this.$refs.lineCharts.removeSeries()
      }

      var monthStr = ''
      var dayStr = ''
      if (month < 10) {
        monthStr = `0${month}`
      } else {
        monthStr = `${month}`
      }
      if (date < 10) {
        dayStr = `0${date}`
      } else {
        dayStr = `${date}`
      }

      this.endDay = `${year}-` + monthStr + '-' + dayStr

      if (this.$refs.lineCharts != null) {
        this.getList()
      }
    },
    onParamChange (attr, val) {
      this.itemStatus = val.value
      if (this.$refs.lineCharts != null) {
        this.$refs.lineCharts.removeSeries()
      }

      if (this.$refs.lineCharts != null) {
        this.getList()
      }
    },
    routerBack () {
      // let lineCharts = this.$refs.lineCharts;
      // lineCharts.getChart().destroy();

      // this.$router.go(-1);
      var mid = this.$route.params.id
      var mname = this.$route.params.name
      var mpname = this.$route.params.pname

      this.$router.push({
        name: 'timeSortPoint',
        params: { id: mid, name: mname, pname: mpname }
      })
    },
    setType () {
      var title = ''
      let lineCharts = this.$refs.lineCharts
      if (this.itemStatus === 0) {
        title = '功率因素'
        lineCharts.getChart().title.update({ text: '功率因素' })
        lineCharts.getChart().yAxis[0].setTitle({ text: '功率因素(%)' })
        if (this.itemType === 0) {
          lineCharts.addSeries({ name: this.startDay + ' 功率因素', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' 功率因素', data: [] })
        } else if (this.itemType === 1) {
          lineCharts.addSeries({
            name: this.startDay + ' 总功率因素',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' A相功率因素',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' B相功率因素',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' C相功率因素',
            data: []
          })

          lineCharts.addSeries({ name: this.endDay + ' 总功率因素', data: [] })
          lineCharts.addSeries({
            name: this.endDay + ' A相功率因素',
            data: []
          })
          lineCharts.addSeries({
            name: this.endDay + ' B相功率因素',
            data: []
          })
          lineCharts.addSeries({
            name: this.endDay + ' C相功率因素',
            data: []
          })
        }
      } else if (this.itemStatus === 1) {
        title = '电流'
        lineCharts.getChart().title.update({ text: '电流' })
        lineCharts.getChart().yAxis[0].setTitle({ text: '电流(A)' })
        if (this.itemType === 0) {
          lineCharts.addSeries({ name: this.startDay + ' 电流', data: [] })
          lineCharts.addSeries({ name: this.endDay + '电流', data: [] })
        } else if (this.itemType === 1) {
          lineCharts.addSeries({
            name: this.startDay + ' Ia 相电流',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' Ib 相电流',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' Ic 相电流',
            data: []
          })
          lineCharts.addSeries({ name: this.startDay + ' 零序电流', data: [] })

          lineCharts.addSeries({ name: this.endDay + ' Ia 相电流', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' Ib 相电流', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' Ic 相电流', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' 零序电流', data: [] })
        }
      } else if (this.itemStatus === 2) {
        title = '电压'
        lineCharts.getChart().title.update({ text: '电压' })
        lineCharts.getChart().yAxis[0].setTitle({ text: '电压(V)' })
        if (this.itemType === 0) {
          lineCharts.addSeries({ name: this.startDay + ' 电压', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' 电压', data: [] })
        } else if (this.itemType === 1) {
          lineCharts.addSeries({ name: this.startDay + ' A相电压', data: [] })
          lineCharts.addSeries({ name: this.startDay + ' B相电压', data: [] })
          lineCharts.addSeries({ name: this.startDay + ' C相电压', data: [] })

          lineCharts.addSeries({ name: this.endDay + ' A相电压', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' B相电压', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' C相电压', data: [] })
        }
      } else if (this.itemStatus === 3) {
        title = '有功功率'
        lineCharts.getChart().title.update({ text: '有功功率' })
        lineCharts.getChart().yAxis[0].setTitle({ text: '有功功率(KVA)' })
        if (this.itemType === 0) {
          lineCharts.addSeries({ name: this.startDay + ' 有功功率', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' 有功功率', data: [] })
        } else if (this.itemType === 1) {
          lineCharts.addSeries({
            name: this.startDay + ' 总有功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' A相有功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' B相有功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' C相有功功率',
            data: []
          })

          lineCharts.addSeries({ name: this.endDay + ' 总有功功率', data: [] })
          lineCharts.addSeries({
            name: this.endDay + ' A相有功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.endDay + ' B相有功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.endDay + ' C相有功功率',
            data: []
          })
        }
      } else if (this.itemStatus === 4) {
        title = '无功功率'
        lineCharts.getChart().title.update({ text: '无功功率' })
        lineCharts.getChart().yAxis[0].setTitle({ text: '有功功率(KVA)' })
        if (this.itemType === 0) {
          lineCharts.addSeries({ name: this.startDay + ' 无功功率', data: [] })
          lineCharts.addSeries({ name: this.endDay + ' 无功功率', data: [] })
        } else if (this.itemType === 1) {
          lineCharts.addSeries({
            name: this.startDay + ' 总无功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' A相无功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' B相无功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.startDay + ' C相无功功率',
            data: []
          })

          lineCharts.addSeries({ name: this.endDay + ' 总无功功率', data: [] })
          lineCharts.addSeries({
            name: this.endDay + ' A相无功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.endDay + ' B相无功功率',
            data: []
          })
          lineCharts.addSeries({
            name: this.endDay + ' C相无功功率',
            data: []
          })
        }
      } else if (this.itemStatus === 5) {
      } else if (this.itemStatus === 6) {
        title = '总有功电量'
        lineCharts.getChart().title.update({ text: '总有功电量' })
        lineCharts.getChart().yAxis[0].setTitle({ text: '总有功电量(KWH)' })
        lineCharts.addSeries({ name: this.startDay + ' 总有功电量', data: [] })
        lineCharts.addSeries({ name: this.endDay + '总有功电量', data: [] })
      }
    },
    getList () {
      var title = ''
      let lineCharts = this.$refs.lineCharts

      var meterId = this.$route.params.meterId
      this.setType()

      this.$http
        .post(this.URLINFO + '/mobile/electricity/getElectricityApp.do', {
          meterId: meterId,
          startDay: this.startDay,
          endDay: this.endDay
        })
        .then(function (res) {
          for (var i = 0; i < res.data.ls1.length; i++) {
            if (this.itemStatus === 0) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].totalnum
                    ],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].totalnum
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].numa
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[2].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].numb
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[3].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].numc
                    ],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 1) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ia[i].ia],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].ia],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].ib],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[2].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].ic],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[3].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].zeroi
                    ],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 2) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ia[i].ua],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].ua],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].ua],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[2].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].uc],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 3) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ia[i].totalp
                    ],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].pa],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].pb],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[2].addPoint(
                    [getTimeStr(res.data.ls1[i].transtime), res.data.ls1[i].pc],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 4) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ia[i].reactivep
                    ],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[0].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ia[i].reactivep
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].reactivepa
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[2].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].reactivepb
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[3].addPoint(
                    [
                      getTimeStr(res.data.ls1[i].transtime),
                      res.data.ls1[i].reactivepc
                    ],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 6) {
              lineCharts
                .getChart()
                .series[0].addPoint(
                  [
                    getTimeStr(res.data.ls1[i].transtime),
                    res.data.ia[i].readNum
                  ],
                  false,
                  false
                )
            }
          }

          for (i = 0; i < res.data.ls2.length; i++) {
            if (this.itemStatus === 0) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].totalnum
                    ],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[4].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].totalnum
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[5].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].numa
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[6].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].numb
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[7].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].numc
                    ],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 1) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].ia],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[4].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].ia],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[5].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].ib],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[6].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].ic],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[7].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].zeroi
                    ],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 2) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].ua],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[3].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].ua],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[4].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].ub],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[5].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].uc],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 3) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].totalp
                    ],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[4].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].totalp
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[5].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].pa],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[6].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].pb],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[7].addPoint(
                    [getTimeStr(res.data.ls2[i].transtime), res.data.ls2[i].pc],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 4) {
              if (this.itemType === 0) {
                lineCharts
                  .getChart()
                  .series[1].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].reactivep
                    ],
                    false,
                    false
                  )
              } else if (this.itemType === 1) {
                lineCharts
                  .getChart()
                  .series[4].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].reactivep
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[5].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].reactivepa
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[6].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].reactivepb
                    ],
                    false,
                    false
                  )
                lineCharts
                  .getChart()
                  .series[7].addPoint(
                    [
                      getTimeStr(res.data.ls2[i].transtime),
                      res.data.ls2[i].reactivepc
                    ],
                    false,
                    false
                  )
              }
            } else if (this.itemStatus === 6) {
              lineCharts
                .getChart()
                .series[1].addPoint(
                  [
                    getTimeStr(res.data.ls2[i].transtime),
                    res.data.ls2[i].readNum
                  ],
                  false,
                  false
                )
            }
          }

          lineCharts.getChart().redraw()
        })
        .catch(function (error) {
          console.log(error)
          this.$toast('查询业主电费异常')
        })
    }
  },
  components: {
    // vchooser,
    VueHighcharts
    // daypicker,
    // yesterdaypicker
  },
  mounted () {
    this.getList()
  }
}

function getCurrentTime () {
  var date = new Date()
  var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minute =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var second =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return hour + ':' + minute + ':' + second
}

function getTime (nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
}

function formatDate (now) {
  var year = now.getYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  // return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
  return hour + ':' + minute + ':' + second
}

function getTimeStr (ns) {
  var d = new Date(ns)
  return formatDate(d)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 16px;
  font-weight: normal;
}

.rank-head {
  width: 100%;
  height: 40px;
  position: fixed;
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  );
  z-index: 999;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
}

.container {
  width: 100%;
  overflow: hidden;
}

.rank-head-back {
  display: block;
  float: left;
  width: 40px;
  height: 40px;
  /*background: url("../assets/index/back.png") no-repeat center center;*/
  background-size: 100% 100%;
}
</style>
