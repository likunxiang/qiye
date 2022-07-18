import request from '@/utils/request'
import axios from 'axios'

// web-查看需方违约处罚收取列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\ft1\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-未结算列表
export function getUnPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\ft1\\getUnPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-已结算列表
export function getPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\supplyDisobey\\getPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}