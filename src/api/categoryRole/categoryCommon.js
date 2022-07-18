import request from '@/utils/request'
import axios from 'axios'

// 查询供需主体顶级列表等
export function getSonOfSDList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\cat\\getSonOfSDList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 查询验收期限品类未设置列表
export function getSonList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\cat\\getSonList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-新增采购/供应场景
export function insertType3(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=WEB\\cat\\insertType3&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-编辑采购/供应场景
export function updateType3(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\updateType3&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-删除采购/供应场景
export function deleteType3(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\deleteType3&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-变更采购/供应场景节点顺序
export function updateType3Norder(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\updateType3Norder&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类类型列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cattype\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类类型带是否有场景的列表
export function getWithHasCatTreeList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cattype\\getWithHasCatTreeList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询某个品类类型下的一级场景列表
export function getFirstSceneList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getFirstSceneList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询场景是否有品类名称的列表
export function getSonWithHasCatFlagList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getSonWithHasCatFlagList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询品类类型带是否有场景的列表
export function getListByCatTreeGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getListByCatTreeGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据品类导出型号名称数据
export function exportSupplyModels(categoryGuid,OutputFileName) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/OutputCsv?SqlCmdName=web\\cat\\exportSupplyModels&DBC=w_m&categoryGuid='+categoryGuid+'&OutputFileName='+OutputFileName,
    method: 'get'
  })
}

// web-根据品类导出品牌名称数据
export function exportSupplyBrandNames(categoryGuid,OutputFileName) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/OutputCsv?SqlCmdName=web\\cat\\exportSupplyBrandNames&DBC=w_m&categoryGuid='+categoryGuid+'&OutputFileName='+OutputFileName,
    method: 'get'
  })
}

// web-根据品类导出型号名称+品牌名称数据
export function exportSModelsAndBNames(categoryGuid,OutputFileName) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/OutputCsv?SqlCmdName=web\\cat\\exportSModelsAndBNames&DBC=w_m&categoryGuid='+categoryGuid+'&OutputFileName='+OutputFileName,
    method: 'get'
  })
}

// web-查询品类字节标题
export function existNTByCatTreeGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\existNTByCatTreeGuid_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
