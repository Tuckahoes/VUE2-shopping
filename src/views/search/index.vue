<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search show-action placeholder="请输入搜索关键词" clearable v-model="inputKey">
      <template #action>
        <div @click="goSearch(inputKey)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="historyList.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="delHistory" />
      </div>
      <div class="list">
        <div class="list-item" @click="goSearch(item)" v-for="item in historyList" :key="item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, setHistory, removeHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      inputKey: '',
      historyList: getHistory()
    }
  },
  methods: {
    goSearch (key) {
      if (!key) return console.log('内容不可为空')
      this.inputKey = ''
      this.historyList = this.historyList.filter(item => item !== key)
      this.historyList.unshift(key)
      setHistory(this.historyList)
      this.$router.push(`/searchlist?search=${key}`)
    },
    delHistory () {
      this.historyList = []
      removeHistory()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
