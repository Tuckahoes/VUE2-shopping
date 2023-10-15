<template>
    <div>
      <router-view></router-view>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o" to="home">首页</van-tabbar-item>
        <van-tabbar-item icon="qr" to="category">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="manager-o" to="my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
