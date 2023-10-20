// mixins可以将VUE中诸如data、methods、computed等方法、函数混入到其他VUE文件中，以实现多文件下的封装复用
import { Dialog } from 'vant'
export default {
  methods: {
    loginConfirm () {
      const token = this.$store.state.user.userInfo.token
      if (!token) {
        // console.log('弹出提示框')
        Dialog.confirm({
          title: '温馨提示',
          message: '您还未登录，请先登录~',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm
            this.$router.replace({
              path: '/login',
              query: {
                // fullpath:包含查询参数 path:不包含
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return false
      }
    }
  }
}
