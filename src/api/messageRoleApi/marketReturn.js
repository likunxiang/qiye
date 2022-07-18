import request from '@/utils/request'
import axios from 'axios'

// 查询反馈信息列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\feedback\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 查询反馈详情
export function getDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\feedback\\getDetail_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-回复反馈
export function feedbackReply(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\feedback\\reply&DBC=w_m',
    method: 'post',
    data: data
  })
}
