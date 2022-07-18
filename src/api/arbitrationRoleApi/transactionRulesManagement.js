import request from '@/utils/request'
import axios from 'axios'

// 获取交易规则列表
export function getBizRule(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getBizRule&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 获取交易规则详情
export function getBizRuleById(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getBizRuleById&DBC=w_m',
    method: 'post',
    data: data
  })
}
