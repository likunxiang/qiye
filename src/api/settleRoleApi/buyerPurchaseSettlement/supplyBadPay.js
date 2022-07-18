import request from '@/utils/request'
import axios from 'axios'

// web-查看供方违约赔偿支付列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demand2supplyDisobey\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-未结算列表
export function getUnPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demand2supplyDisobey\\getUnPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看供方收款账号信息
export function getSupplyBankInfo(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demand2supplyDisobey\\getSupplyBankInfo&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-提交付款证明
export function submitPayProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\order\\settle\\demand2supplyDisobey\\submitPayProve&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-已结算
export function getPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demand2supplyDisobey\\getPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看付款证明
export function supplyObeygetPaidProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demand2supplyDisobey\\getPaidProve&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看裁决结果信息
export function getJudgeResult(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\getJudgeResult&DBC=w_m',
    method: 'post',
    data: data
  })
}
