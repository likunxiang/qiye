import request from '@/utils/request'
import axios from 'axios'

// web-查询非系统名义未裁决列表
export function getNonSysWaitJudgeList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\judge\\getNonSysWaitJudgeList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询系统名义未裁决列表
export function getSysWaitJudgeList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\judge\\getSysWaitJudgeList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询非系统名义已裁决列表
export function getNonSysJudgeList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\judge\\getNonSysJudgeList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询系统名义已裁决列表
export function getSysJudgeList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\judge\\getSysJudgeList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询仲裁申请情况-订单取消
export function getCancelOrderDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getCancelOrderDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询仲裁申请情况-订单退货
export function getRefundOrderDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getRefundOrderDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询订单成果接收
export function getOutcomeDetails(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=WEB\\order\\getOrderCatInfo,WEB\\order\\getOutcomeDetails,WEB\\order\\getOutcomeDetailData&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询订单详情
export function getOrderDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-采购查询订单详情
export function getDemandDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getDemandDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-供应查询订单详情
export function getSupplyDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getSupplyDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询采购详情
export function getOrderFeeDemandDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getOrderFeeDemandDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询供应详情
export function getOrderFeeSupplyDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getOrderFeeSupplyDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询采购/供应详情-需求信息
export function getDemandMessage(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=WEB\\order\\demand\\getReq\\getPlates,WEB\\order\\demand\\getReq\\getPlateTypes,WEB\\order\\demand\\getReq\\getPlateFields,WEB\\order\\demand\\getReq\\getPlateFieldContents,WEB\\order\\demand\\getReq\\getPlateFieldValues&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询采购/供应详情-供应信息
export function getSupplydMessage(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=WEB\\order\\demand\\getPrice\\getBaseInfo,WEB\\order\\demand\\getPrice\\getPlates,WEB\\order\\demand\\getPrice\\getPlateTypes,WEB\\order\\demand\\getPrice\\getPlateFields,WEB\\order\\demand\\getPrice\\getPlateFieldContents,WEB\\order\\demand\\getPrice\\getPlateFieldValues&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-裁决意见批复
export function SysMakeJudge(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Exsql?SqlCmdName=web\\order\\judge\\SysMakeJudge&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-系统名义裁决意见批复
export function NonSysMakeJudge(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Exsql?SqlCmdName=web\\order\\judge\\NonSysMakeJudge&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-裁决意见批复后执行
export function webOrderRefund(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/web_orderRefund?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}
