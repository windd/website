<template>
    <div>
      <group>
        <cell :title="Total" :value="RealTime"></cell>
        <cell-form-preview :list="list"></cell-form-preview>
      </group>

      <flexbox>
        <flexbox-item>
          <x-button  @click.native="heZha"  :gradients="['#FF2719', '#FF61AD']">合闸</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button @click.native="fenZha" :gradients="['#1D62F0', '#19D5FD']">分闸</x-button>
        </flexbox-item>
      </flexbox>
      <div v-transfer-dom>
      <confirm v-model="show"
      show-input
      title="请输入密码"
      :input-attrs="{type: 'password'}"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
      </confirm>
      <alert v-model="show2" :title="tongzhi"></alert>
    </div>
    </div>
</template>

<script>
import {Alert, Confirm, Cell, CellFormPreview, Flexbox, FlexboxItem, TransferDomDirective as TransferDom} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Flexbox,
    FlexboxItem,
    CellFormPreview,
    Cell,
    Confirm,
    Alert
  },
  data () {
    return {
      tongzhi: 'OK',
      show: false,
      show2: false,
      Total: '实时数据',
      RealTime: '2018-5-29 12:23:43',
      first: false,
      list: [{
        label: 'label',
        value: 'value'
      }],
      testad: [],
      RealtimeData: [],
      command: ''
    }
  },
  created () {
    this.getListing()
    console.log('create')
  },
  activated () {
    // this.getListing()
  },
  mounted () {
    // this.getListing()
  },
  methods: {
    onCancel () {
      console.log('on cancel')
    },
    onConfirm (msg) {
      console.log('on confirm')
      if (msg) {
        console.log(msg)
        this.fh(msg)
      }
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    getData () {
      this.axiosapi.ajaxGet(this.api.dataLastest, res => {
        this.RealtimeData = res.data.latestdata
        if (this.first === false) {
          for (var ad in this.RealtimeData[0]) {
            this.testad.push({label: 'aa', value: 'dd'})
            console.log(ad)
          }
        }
        this.testad[0].value = this.RealtimeData[0].UA
        this.testad[1].value = this.RealtimeData[0].UB
        this.testad[2].value = this.RealtimeData[0].UC
        var i = 0
        for (var ada in this.RealtimeData[0]) {
          this.testad[i].label = ada
          this.testad[i].value = this.RealtimeData[0][ada]
          i++
        }
        this.list = this.testad
        if (this.first === false) this.first = true
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
      this.show = true
      this.command = {type: 'fenzha', msg: 'FFF0FE'}
    },
    heZha () {
      this.show = true
      this.command = {type: 'hezha', msg: 'F0F0FE'}
    },
    fh (psd) {
      console.log(psd)
      console.log(this.command)
      let comd = ''
      if (this.command.type === 'fenzha') { comd = this.api.commandFZ }
      if (this.command.type === 'hezha') { comd = this.api.commandHZ }
      console.log(comd)
      if (comd) {
        this.axiosapi.ajaxPost(comd, this.command, res => {
          if (res.data.code === 200) {
            console.log(psd, '2222')
            this.tongzhi = '操作成功'
          } else {
            console.log(psd, '111111')
            this.tongzhi = '操作失败'
          }
          this.show2 = true
        })
      } else {
        this.tongzhi = '无效'
        this.show2 = true
      }
    }
  }
}
</script>

<style lang="less">
.custom-primary-red {
  border-radius: 99px!important;
  border-color: #CE3C39!important;
  color: #CE3C39!important;
  &:active {
    border-color: rgba(206, 60, 57, 0.6)!important;
    color: rgba(206, 60, 57, 0.6)!important;
    background-color: transparent;
  }
}
</style>