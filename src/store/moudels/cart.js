import { getCartList } from '@/api/cart'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, arr) {
      state.cartList = arr
    },
    toggle (state, id) {
      const good = state.cartList.find(item => item.goods_id === id)
      good.isChecked = !good.isChecked
    },
    toggleAll (state, isCheckedAll) {
      state.cartList.forEach(item => { item.isChecked = isCheckedAll })
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 给每项数据添加一个属性表示是否选中
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    }
  },
  getters: {
    // 商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品
    selList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品数量
    selNum (state, getters) {
      return getters.selList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品总价
    selPrice (state, getters) {
      return getters.selList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 是否全选
    isSelAll (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
