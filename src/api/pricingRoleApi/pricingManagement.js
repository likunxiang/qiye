import request from '@/utils/request'
import axios from 'axios'

// web-查询交易服务定价列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务费设置详情-按品类
export function getDetailOfType1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getDetailOfType1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-设置定价-按品类
export function insertRatioOfType1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\insertRatioOfType1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务费设置详情（已添加的供方列表）-按供方型号
export function getAddedSuppliersOfType2(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getAddedSuppliersOfType2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询可添加的供方列表
export function getSuppliers(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getSuppliers&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-删除已经添加的供方
export function deleteSuppliers(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\deleteSuppliers&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-删除已经添加的型号
export function deleteModels(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\deleteModels&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询可添加的型号列表-按供方型号
export function getModelsByType2(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getModelsByType2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询可添加的型号列表-按我方型号
export function getModelsByType3(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getModelsByType3&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务费设置详情(已添加的型号列表)
export function getAddedModels(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getAddedModels&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-添加型号-按供方型号
export function addModelsByType2(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\addModelsByType2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-设置定价-按供方型号
export function updateRatioOfType2(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\updateRatioOfType2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-添加引用型号-按我方型号
export function addModelByType3(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\addModelByType3&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-设置定价-按我方型号
export function updateRatioOfType3(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\updateRatioOfType3&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-添加供方-按供方型号
export function addSupplier(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\addSupplier&DBC=w_m',
    method: 'post',
    data: data
  })
}

/**
 *
 * 4.30
 */
// web-查询某一品类收取服务定价列表-按品类
export function getAcctoCatLogList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\getAcctoCatLogList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某一品类收取服务定价列表-按型号类型
export function getAcctoMtLogList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\mt\\getAcctoMtLogList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-新增服务定价-按型号类型
export function insertAcctoMt(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\mt\\insertAcctoMt_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某一品类供方数量统计-按型号名称
export function getSupplierCount(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\mn\\getSupplierCount_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某一品类服务定价个人供方列表-按型号名称
export function getAcctoMnPersSupplierList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\mn\\getAcctoMnPersSupplierList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某一品类供方型号列表
export function getSupplierModelList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\mn\\getSupplierModelList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某一品类服务定价供方型号列表-按型号名称
export function getAcctoMnPersModelList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\mn\\getAcctoMnPersModelList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某一型号最大终止时间-按型号名称
export function getAcctoMnMaxEndDate(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\mn\\getAcctoMnMaxEndDate_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-新增服务定价-按型号名称
export function insertAcctoMn(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\mn\\insertAcctoMn_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询供方型号服务定价详情-按型号名称
export function getAcctoMnPersModelDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\servicefee\\mn\\getAcctoMnPersModelDetail_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-删除型号定价-按型号名称
export function deleteMn(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\servicefee\\mn\\deleteMn_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
