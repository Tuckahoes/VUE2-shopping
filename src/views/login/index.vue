<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobile">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="picCode">
          <img :src="picUrl" alt="" @click="getImgCode" v-if="picUrl">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="msgCode">
          <button @click="getCode">{{ totleSecond === second ? '获取短信验证码' : second + '秒后重新获取' }}</button>
        </div>
      </div>

      <div class="login-btn" @click="loginFn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, login } from '@/api/login'
import { Toast } from 'vant' // 如果要直接使用Toast，需要再次在组件中导入？
export default {
  name: 'LoginPage',
  created () {
    this.getImgCode()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picUrl: '', // 请求回来的验证码图片
      picKey: '', // 验证码对应的key
      totleSecond: 60,
      second: 60,
      timer: null,
      mobile: '', // 手机号
      msgCode: ''// 短信验证码
    }
  },
  methods: {
    async getImgCode () {
      const { data: { base64, key } } = await getPicCode()// 不要忘了()调用
      this.picUrl = base64
      this.picKey = key
    },
    async getCode () {
      if (!this.validFn()) return
      if (this.timer !== null) return
      // 获取短信验证码
      const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
      console.log(res)
      Toast('短信已发送，请注意查收')
      this.timer = setInterval(() => {
        this.second--
        if (this.second <= 0) {
          clearInterval(this.timer)
          this.second = this.totleSecond
          this.timer = null
        }
      }, 1000)
    },
    // 手机号与图形验证码校验
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        Toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 登录
    async loginFn () {
      if (!this.validFn()) {
        return false
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        Toast('请检查短信验证码是否正确')
        return false
      }
      const res = await login(this.mobile, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      console.log(res)
      this.$toast('登录成功~')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
