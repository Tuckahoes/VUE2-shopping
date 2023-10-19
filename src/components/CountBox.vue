<template>
  <div class="countBox">
    <button class="minus" @click="handelSub">-</button>
    <input type="text" @change="handelChange" class="inp" :value="value">
    <button class="add" @click="handelAdd">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handelAdd () {
      this.$emit('input', this.value + 1)
    },
    handelSub () {
      if (this.value <= 1) return
      this.$emit('input', this.value - 1)
    },
    handelChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return false
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
  .countBox {
    width: 110px;
    display: flex;
    .minus, .add {
        width: 30px;
        height: 30px;
        border: none;
    }
    .inp {
        width: 40px;
        height: 30px;
        margin: 0 5px;
        text-align: center;
        border: none;
    }
  }
</style>
