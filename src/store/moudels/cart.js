import { getCartList, updateCart, deleteCart } from '@/api/cart'
import { Toast } from 'vant'
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
    },
    // 更新购物车里商品数量
    changeCount (state, obj) {
      const { goodsId, goodsNum } = obj
      const good = state.cartList.find(item => item.goods_id === goodsId)
      good.goods_num = goodsNum
    },
    // 删除本地购物车数据
    handelDelete (state, cartIds) {
      // for (const id in cartIds) {
      //   state.cartList = state.cartList.filter(item => item.id !== id)
      // }
      cartIds.forEach(id => {
        state.cartList = state.cartList.filter(item => item.id !== id)
      })
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
    },
    // 更新购物车数据
    // 1.更新后台数据后重新渲染一次
    // async changeCountAction (context, obj) {
    //   await updateCart(obj)
    //   context.dispatch('getCartAction')
    // }
    // 或者将dispatch从context中解构出来 ： ({ dispatch },obj) ---- dispatch('getCartAction)

    // 2.先更新本地数据再更新后台数据
    async changeCountAction (context, obj) {
      await updateCart(obj)
      context.commit('changeCount', obj)
    },

    // 删除购物车数据
    async deleteAction (context, arr) {
      const cartIds = arr.map(item => item.id)
      context.commit('handelDelete', cartIds)
      console.log(cartIds)
      await deleteCart(cartIds)
      Toast('删除成功')
    },
    // 退出登录时清楚VUEX的内容
    logout (context) {
      context.commit('setCartList', [])
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
