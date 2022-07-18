import request from '@/utils/request'
import axios from 'axios'

// 查询品类字节标题
export function getTitleListByCatreeGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getTitleListByCatreeGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 新增品类字节标题
export function insertTitle(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\insertTitle&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 编辑品类字节标题
export function updateTitleByGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\updateTitleByGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 编辑品类字节标题
export function deleteTitleByGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\deleteTitleByGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 查询品类字节内容
export function getNameListByCatreeGuidAndLevel(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getNameListByCatreeGuidAndLevel_1_0_3&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 新增品类字节内容
export function insertNameTree(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\insertNameTree&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 修改品类字节内容
export function updateNameTree(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\updateNameTree&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 删除品类字节内容
export function deleteNameTree(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\deleteNameTree&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-品类定义-生成品类名称之前判断字节内容是否都有维护
export function getNoContentTitles(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\defineName\\getNoContentTitles&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-品类定义-生成品类名称之前判断字节内容是否都有维护
export function insertCatName(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/web_insertCatName?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}

//web-查询一级字节内容_1_0_1
export function getTopParentNameList_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getTopParentNameList_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

//web-查询子级字节内容_1_0_1
export function getChildNameList_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getChildNameList_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

//web-变更字节内容节点顺序_1_0_1
export function updateNameTreeNorder1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\updateNameTreeNorder1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

//web-查询品类字节标题最大层级
export function getNameTitleMaxLevel_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\getNameTitleMaxLevel_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

//web-新增品类字节标题_1_0_1
export function saveNameTitle_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\saveNameTitle_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-品类定义-判断是否生成过品类名称_1_0_1
export function genCatNameFlag_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\genCatNameFlag_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-黏贴品类字节内容_1_0_1
export function web_pasteNameTree_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/web_pasteNameTree_1_0_1?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}
