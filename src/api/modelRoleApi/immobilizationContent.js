import request from '@/utils/request'
import axios from 'axios'

// 查询供需主体顶级列表等
export function getFixedData(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\getFixedData&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询固化内容信息管理
export function getFixedMappingData(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\getFixedMappingData&DBC=w_m',
    method: 'post',
    data: data
  })
}
