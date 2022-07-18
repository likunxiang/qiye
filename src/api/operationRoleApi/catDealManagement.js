import request from '@/utils/request'
import axios from 'axios'

// web-查询品类采购资质列表（管制品类即为有采购资质的）
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-添加管制品类
export function addCategory(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\buyqualification\\addCategory&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-删除管制品类
export function deleteClass(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\buyqualification\\delete&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类资质审批统计列表
export function getApproveList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\getApproveList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类资质用户列表
export function getUserList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\getUserList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类资质用户列表-未审批
export function getWaitApproUserList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\getWaitApproUserList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-统计用户申请的资质审批(通过/不通过)数量
export function getApprovedDetailCount(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\getApprovedDetailCount&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-审批用户资质
export function updateApprove(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\buyqualification\\updateApprove&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类资质用户列表-已审批
export function getApprovedUserList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\getApprovedUserList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询用户资质详情
export function getUserIntelligence(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=WEB\\cat\\buyqualification\\getPlates,WEB\\cat\\buyqualification\\getPlateTypes,WEB\\cat\\buyqualification\\getPlateFields,WEB\\cat\\buyqualification\\getPlateFieldContents,WEB\\cat\\buyqualification\\getPlateFieldValues&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-发布采购资质信息-判断是否可以发布
export function isCanPublish(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\isCanPublish&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-发布采购资质信息-判断是否可以发布
export function publish(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\publish&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询管制品类是否重复添加
export function getAddedFlag(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\getAddedFlag&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询沟通类支撑跟踪列表
export function getPublishFlagList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\chat\\getPublishStatisticList_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询交易类支撑跟踪列表
export function getPublishStatisticList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\deal\\getPublishStatisticList_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类交易跟踪管理列表-沟通类
export function getBriefMode1List(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\statistic\\getBriefMode1List&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类交易跟踪管理列表-交易类
export function getBriefMode2List(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\statistic\\getBriefMode2List&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询供方数量-沟通类
export function getMode1Suppliers(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\statistic\\getMode1Suppliers&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询供方数量-交易类
export function getMode2SupplierInfos(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\statistic\\getMode2SupplierInfos&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-按年查询订单数量-交易类
export function getOneCatOrderCountYear(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\statistic\\getOneCatOrderCountYear&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-按月份查询订单数量-交易类
export function getOneCatOrderCountMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\statistic\\getOneCatOrderCountMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询订单月份详情-交易类
export function getOneCatOrderDetailMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\statistic\\getOneCatOrderDetailMonth&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询未管制的品类列表
export function getCategoryList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\buyqualification\\getCategoryList&DBC=w_m',
    method: 'post',
    data: data
  })
}
