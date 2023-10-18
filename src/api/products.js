// 搜索列表相关请求
import request from '@/utils/request'

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
