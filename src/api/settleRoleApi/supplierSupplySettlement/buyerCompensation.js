import request from '@/utils/request'
import axios from 'axios'

// web-查看需方违约赔偿支付列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\ft2\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-未结算列表
export function getUnPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\ft2\\getUnPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看供方收款账号信息
export function getSupplyBankInfo(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\ft2\\getSupplyBankInfo&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-提交付款证明
export function submitPayProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\order\\settle\\demandDisobey\\ft2\\submitPayProve&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-已结算
export function getPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    // url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\ft2\\getPayListByMonth&DBC=w_m',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\ft2\\getPaidListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看付款证明
export function getPaidProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\ft2\\getPaidProve&DBC=w_m',
    method: 'post',
    data: data
  })
}
