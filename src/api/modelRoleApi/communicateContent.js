import request from '@/utils/request'
import axios from 'axios'

// web-查询简历需求信息列表
export function getModes(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\chat\\getModes&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-发布-判断是否可以发布
export function isCanPublish(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\chat\\isCanPublish&DBC=w_m',
    method: 'post',
    data: data
  })
}

// // web-发布
// export function publish(data) {
//   axios.defaults.baseURL = '/api'
//   return request({
//     xf_url: '/api',
//     url: '/ExSql?SqlCmdName=web\\model\\chat\\publish&DBC=w_m',
//     method: 'post',
//     data: data
//   })
// }

// web-发布简历需求信息
export function publishChatMode(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\chat\\publishChatMode&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询发布记录
export function getPublishHistory(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\model\\supplyassign\\getPublishHistory&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-移除简历需求信息
export function deleteByCategoryGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\model\\chat\\deleteByCategoryGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询简历品类库
export function getNameListOfType1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getNameListOfType1&DBC=w_m',
    method: 'post',
    data: data
  })
}


