import request from '@/utils/request'
// 首页home相关请求
export const getHomePage = () => {
  const res = request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
  return res
}
