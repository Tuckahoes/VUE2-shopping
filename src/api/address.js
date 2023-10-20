import request from '@/utils/request'

// 获取收货地址
export const getAddressList = () => {
  return request.get('/address/list')
}

// 添加收货地址
export const addAddress = () => {
  return request.post('/address/add', {
    form: {
      name: 'Tuckahoe',
      phone: '19911112222',
      region: [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 785,
          label: '徐汇区'
        }
      ],
      detail: '北京路1号楼8888室'
    }
  })
}
