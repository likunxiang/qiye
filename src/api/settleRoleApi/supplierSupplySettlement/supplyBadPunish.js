import request from '@/utils/request'
import axios from 'axios'

// web-查看供方违约处罚收取列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supplyDisobey\\ft1\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-未结算列表
export function getUnPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supplyDisobey\\ft1\\getUnPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-查看供方付款证明
export function getPayDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supplyDisobey\\ft1\\getPayDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-确认处罚收取
export function confirmPay(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\order\\settle\\supplyDisobey\\ft1\\confirmPay&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-已结算列表
export function getPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supplyDisobey\\ft1\\getPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}
