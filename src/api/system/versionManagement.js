import request from '@/utils/request'
import axios from 'axios'

// 获取版本发布列表
export function getList_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\appVersion\\getList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 新增版本
export function insert_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Exsql?SqlCmdName=web\\appVersion\\insert_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 发布版本
export function updateStatus_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Exsql?SqlCmdName=web\\appVersion\\updateStatus_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
