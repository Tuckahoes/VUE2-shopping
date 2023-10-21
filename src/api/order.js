import request from '@/utils/request'

// mode = 'cart'    =>  { cartIds, remark }
// mode = 'buyNow'  =>  { goodsId, goodsNum, goodsSkuId, remark }
// 订单结算接口(购物车、立即购买)
export const getOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: '10',
      shopId: '0',
      couponId: '0',
      isUsePoints: 0,
      ...obj
    }
  })
}
// 提交订单
export const submitOrder = (mode, obj, remark) => {
  return request.get('/checkout/submit', {
    params: {
      mode,
      delivery: '10',
      shopId: '0',
      couponId: '0',
      isUsePoints: 0,
      remark,
      payType: '10',
      ...obj
    }
  })
}
