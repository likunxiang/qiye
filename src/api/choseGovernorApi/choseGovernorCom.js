import request from '@/utils/request'
import axios from 'axios'


// 获取字符加密密文
export function getEncryptStr(password) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/com_getEncryptPwd?pwdStr=' + password,
    method: 'get'
  })
}

// web-经理/主管查询引导专员名单列表
export function introducerGetList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\introducer\\getList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-主管新建引导专员
export function introducerAdd(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\introducer\\add_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 5-11
// web-主管新建引导专员
export function introducerDelete(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\introducer\\delete_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询引导专员团队管理列表
export function introducerGetRegisteredList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\introducer\\getRegisteredList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询引导专员招募名单未开通账号列表
export function introducerGetUnRegisteredList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\introducer\\getUnRegisteredList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询引导专员权限管理列表
export function getValidStaffList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getValidStaffList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
