import request from '@/utils/request'
import axios from 'axios'


// web-新增服务对象路径字节内容
export function pathInsert(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\path\\insert_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务对象路径顶级节点列表
export function pathGetTopParList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\path\\getTopParList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询对象路径儿子节点列表
export function pathGetSonList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\path\\getSonList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询对象路径儿子节点列表
export function pathGetSonListById(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\path\\getSonListByAllPid_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询对象路径1级节点内容列表-关联搜索用
export function pathGetSerchTopParList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\path\\getSerchTopParList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询对象路径儿子节点内容列表-关联搜索用
export function pathGetSearchSonList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\path\\getSearchSonList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-编辑对象路径字节内容
export function pathUpdate(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\path\\update_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-删除对象路径字节内容
export function pathDelete(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\path\\delete_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-复制黏贴对象路径字节内容
export function web_guidancepathcontent_paste(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/web_guidancepathcontent_paste?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}

// web-查询对象路径字节标题列表
export function pathGetPathTitleList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\path\\getPathTitleList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-修改服务对象路径字节标题
export function pathUpdateOrgPathTitle(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Exsql?SqlCmdName=web\\guidance\\path\\updateOrgPathTitle_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-新增服务对象
export function namelistInsert(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\namelist\\insert_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-编辑服务对象
export function namelistUpdate(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\namelist\\update_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-删除服务对象
export function namelistDel(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\namelist\\del_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务对象列表
export function namelistGetList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\namelist\\getList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

//web-批量新增服务对象(文件导入)
export function web_addByFileForNM(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/web_addByFileForNM?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}
