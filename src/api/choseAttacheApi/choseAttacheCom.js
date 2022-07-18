import request from '@/utils/request'
import axios from 'axios'

// web-查询可领取机构列表
export function getOrgInfoList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getOrgInfoList_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-引导专员领取机构
export function collectOrg(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\collectOrg_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询权限机构合作签约列表
export function getSignValidOrgList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getSignValidOrgList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某一领取的权限机构签约记录
export function getOneValidOrgSignRecords(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getOneValidOrgSignRecords_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-删除签约记录
export function delOrgSignBySignGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\delOrgSignBySignGuid_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-引导专员操作机构签约
export function insertFirstSign(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\insertFirstSign_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询机构最近一次合同终止日期
export function getSignMaxEndDate(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\getSignMaxEndDate_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看机构签约详情
export function getSignDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getSignDetail_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询机构领取统计管理
export function getCollectList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getCollectList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询机构回收统计管理
export function getTakebackList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getTakebackList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-引导专员操作机构续签
export function inserAgainSign(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\inserAgainSign_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询引导专员权限管理列表
export function getValidStaffList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\getValidStaffList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询引导专员机构合作详情
export function getValidStaffOrgSignRecords(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\org\\getValidStaffOrgSignRecords_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询机构领取详情
export function getCollectDetailListByTime(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getCollectDetailListByTime_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询机构回收详情
export function getTakebackDetailListByTime(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\org\\getTakebackDetailListByTime_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
