import request from '@/utils/request'
import axios from 'axios'

// web-查询节点交易规则管理列表
export function getDealRules(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\getDealRules&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询类型节点交易规则管理列表_1_0_1
export function getCattypeDealRules_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\getCattypeDealRules_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-设置交接节点
export function updateDealRule(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\model\\updateDealRule&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询节点交易节点详情
export function getDealRuleByGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\getDealRuleByGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询节点交易规则发布记录
export function getDealRulePublishHistory(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\getDealRulePublishHistory&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-发布节点交易规则
export function publishDealRule(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\publishDealRule&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-移除一行品类规则
export function deleteDealRule(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\model\\deleteDealRule&DBC=w_m',
    method: 'post',
    data: data
  })
}
