import request from '@/utils/request'
import axios from 'axios'

// web-查询类型服务定价列表_1_0_1
export function getCattypeList_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getCattypeList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
