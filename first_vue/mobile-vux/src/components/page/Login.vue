<template>
    <div class="login-wrap">
        <h3  style="text-align:center;margin-top:100px">英格尔数据采集平台</h3>
        <div class="ms-login">
            <group title="确认输入">
              <x-input title="账号" type="text" placeholder="" v-model="ruleForm.username"></x-input>  
              <x-input title="密码" type="password" placeholder="" v-model="ruleForm.password"  @on-change="change" @keyup.enter.native="submitForm('ruleForm')"></x-input>
              <x-button @click.native="submitForm('ruleForm')" type="primary">登录</x-button>
            </group>
        </div>
    </div>
</template>

<script>
import { XInput } from 'vux'

export default {
  components: {
    XInput
  },
  data: function () {
    return {
      ruleForm: {
        username: 'ad',
        password: '12'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    change () {

    },
    submitForm (formName) {
      console.log('shaa')
      console.log(this.api.userLogin)
      this.axiosapi.ajaxPost(this.api.userLogin, this.ruleForm, res => {
        if (res.data.code === 200) {
          this.$store.commit('user', res.data.user)
          console.log(this.$store.state.user)
              // this.$message.success('ok')
          this.$router.push('/main')
        } else {
          this.$message.error('password wrong')
        }
      })
          // localStorage.setItem('ms_username', this.ruleForm.username)
          // this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
