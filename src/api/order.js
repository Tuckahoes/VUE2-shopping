import request from '@/utils/request'

// mode = 'cart'    =>  { cartIds, remark }
// mode = 'buyNow'  =>  { goodsId, goodsNum, goodsSkuId, remark }
// 订单结算接口(购物车、立即购买)
export const getOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}
// 提交订单
export const submitOrder = (mode, obj, remark) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    remark,
    payType: 10,
    ...obj

  })
}
// 我的订单
// 订单类型，all-全部，payment-待支付，delivery-待发货，received-待收货，comment-待评价
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      page,
      dataType
    }
  })
}
