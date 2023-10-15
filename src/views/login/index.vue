<template>
  <div>
    <van-nav-bar
      title="login"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  methods: {
    onClickLeft () {
      // console.log('return')
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
