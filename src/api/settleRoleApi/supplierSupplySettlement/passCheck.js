import request from '@/utils/request'
import axios from 'axios'

// web-查看供方验收通过支付列表
export function getDoneList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supply\\getDoneList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看供方验收-结算管理-未结算
export function getUnPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supply\\getUnPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-提交付款证明
export function submitPayProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\order\\settle\\supply\\submitPayProve&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看供方验收-结算管理-已结算
export function getPaidListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supply\\getPaidListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看付款证明
export function getPaidProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supply\\getPaidProve&DBC=w_m',
    method: 'post',
    data: data
  })
}