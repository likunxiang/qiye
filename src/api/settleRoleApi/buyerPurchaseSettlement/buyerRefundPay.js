import request from '@/utils/request'
import axios from 'axios'

// web-查看需方退货退款列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandRefund\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-未结算
export function getUnPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandRefund\\getUnPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// // web-查看收款账号
// export function getDeBankAccount(data) {
//   axios.defaults.baseURL = '/api'
//   return request({
//     xf_url: '/api',
//     url: '/QueryData?SqlCmdName=web\\order\\settle\\demandRefund\\getDeBankAccount&DBC=w_m',
//     method: 'post',
//     data: data
//   })
// }

// web-查看收款账号
export function getPayAccount(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandRefund\\getPayAccount&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看退货证明
export function getRefundDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandRefund\\getRefundDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看退货验收情况详情
export function getSupplyAcceptDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandRefund\\getSupplyAcceptDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-系统验收通过
export function updateSuAccept(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\order\\settle\\demandRefund\\updateSuAccept&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-提交付款证明
export function submitPayProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\order\\settle\\demandRefund\\submitPayProve&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-结算管理-已结算
export function getPayListByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandRefund\\getPayListByMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看付款证明
export function getPaidProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\order\\settle\\demandRefund\\getPaidProve&DBC=w_m',
    method: 'post',
    data: data
  })
}


// web-查看原路退款付款证明
export function getReturnPaidProve(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandRefund\\getReturnPaidProve&DBC=w_m',
    method: 'post',
    data: data
  })
}
