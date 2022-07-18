import request from '@/utils/request'
import axios from 'axios'

// web-查询服务专员报名管理列表
export function introducerGetListBySource(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getListBySource_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}