import request from '@/utils/request'
import axios from 'axios'

// 根据角色ID查询用户
export function getClassRoleList(query) {
  return request({
    url: '/system/role/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// web-查询各类角色用户管理列表
export function getRoleUserList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\user\\getRoleUserList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询各类角色用户管理列表-用户账号信息
export function getRoleUserDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\user\\getRoleUserDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 修改用户密码
/**
 * role_id
 * 1  超级管理员
 * 2  普通角色
 * 3  品类专员
 * 4  型号专员
 * 5  定价专员
 * 6  信息专员
 * 7  结算专员
 * 8  仲裁专员
 */
export function changePassword(data) {
  return request({
    url: '/system/user',
    method: 'put',
    data: data
  })
}

// web-查询服务专员列表
export function introducerGetListOfDir(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getListOfDir_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员列表 -- 招募专用
export function introducerGetListByDirIdFromM(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getListByDirIdFromM_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-将服务专员授权归属主管
export function introducerGrant2Dir(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\introducer\\grant2Dir_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-将服务专员脱离归属主管
export function introducerUnGrant2Dir(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\introducer\\unGrant_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

