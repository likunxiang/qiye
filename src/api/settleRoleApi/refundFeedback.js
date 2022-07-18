import request from '@/utils/request'
import axios from 'axios'

// web-查看采购/供应退货退款意见反馈列表-未回复
export function unreplyType1List(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\feedback\\unreplyType1List&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看采购退货退款意见反馈列表-已回复
export function replyType1List(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\feedback\\replyType1List&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看供应退货退款意见反馈列表-已回复
export function replyType2List(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\feedback\\replyType2List&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看回复详情
export function getReplyDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\feedback\\getReplyDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-回复反馈
export function reply(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\order\\feedback\\reply&DBC=w_m',
    method: 'post',
    data: data
  })
}
