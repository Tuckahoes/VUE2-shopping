import request from '@/utils/request'

// 搜索列表相关请求
export const getSearchList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取商品详情信息
export const getProDeatil = (goodsId) => {
  return request.get('/goods/detail/', {
    params: {
      goodsId
    }
  })
}
// 获取商品评论
export const getProContent = (goodsId) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit: 5
    }
  })
}
