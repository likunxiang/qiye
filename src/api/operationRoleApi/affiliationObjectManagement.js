import request from '@/utils/request'
import axios from 'axios'

// web-根据服务对象查询可指派的服务专员
export function introducerGetCanGrant2NMList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getCanGrant2NMList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据服务对象guid查询绑定的有效的服务专员
export function introducerGetValidIntroInfoByNMGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getValidIntroInfoByNMGuid_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-将服务专员指定给服务对象
export function introducerGrant2NM(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\introducer\\grant2NM_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
