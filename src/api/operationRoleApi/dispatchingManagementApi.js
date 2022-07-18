import request from '@/utils/request'
import axios from 'axios'

// 获取用户实名认证信息
export function getUserCertification(id) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=WEB\\GetUserCertification_1_0_1&DBC=w_m&user_id=' + id,
    method: 'get',
  })
}

// 获取用户个人信息
export function getUserInfoOne(id) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\user\\getOne&DBC=w_m&userId=' + id,
    method: 'get',
  })
}

// 删除实名认证信息
export function deleteCertification(id) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=WEB\\DeleteCertification_1_0_1&DBC=w_m&certification_id=' + id,
    method: 'get',
  })
}

// 获取用户列表
export function getUserInfo(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=WEB\\GetUserInfo_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
// 合格引导标准
export function getCerterion(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\guide\\getCerterion',
    method: 'post',
    data: data
  })
}
// 修改标准时限天数
export function updateCerterion(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=com\\guide\\updateCerterion&DBC=w_m',
    method: 'post',
    data: data
  })
}
// 人力资源调度管理
export function getUserGuideList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getUserGuideList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// Web-派发人力资源管理-查看列表
export function getGuideUserInfoList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getGuideUserInfoList&DBC=w_m',
    method: 'post',
    data: data
  })
}


// Web-回收用户投放管理-详情的用户列表
export function getTakeBackUserList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getTakeBackUserList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 回收投放管理
export function getCategoryTakeBakeCount(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=WEB\\guide\\getCategoryTakeBakeCount&DBC=w_m',
    method: 'post',
    data: data
  })
}
// 回收投放管理 -- 放入用品库-- 有品类时
export function unlockUserByCaGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=WEB\\guide\\unlockUserByCaGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 回收投放管理 -- 放入用品库-- 无品类时
export function unlockNoCatUserByCaGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=WEB\\guide\\unlockNoCatUserByCaGuid&DBC=w_m',
    method: 'post',
    data: data
  })
}
// 引导成果统计
export function getOutComeNumList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=WEB\\guide\\getOutComeNumList_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 引导成果统计 -- 用户间接成果详情
export function getOutComeCountByMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\guide\\getOutComeCountByMonth_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-用户自己采购成果统计列表_1_0_1
export function getUserSelfDeOrderStatiList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getUserSelfDeOrderStatiList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-用户自己月份采购成果详情_1_0_1
export function getUserSelfDeOrderList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getUserSelfDeOrderList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-用户自己供应成果统计列表_1_0_1
export function getUserSelfSuOrderStatiList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getUserSelfSuOrderStatiList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-用户自己月份供应成果详情_1_0_1
export function getUserSelfSuOrderList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getUserSelfSuOrderList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 引导成果统计 -- 用户月份间接成果详情 -- 用户月份间接成果详情
export function getUserOrderCountByDate(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\order\\getUserOrderCountByDate_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 引导成果统计 -- 用户月份间接成果详情 -- 用户月份间接成果详情 -- 用户月份 采购/供应 成果详情
export function getOutComeDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\guide\\getOutComeDetail_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 派发人力资源管理-增加人力资源信息
export function getUserManualAddedList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getUserManualAddedList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 派发人力资源管理-派发人力资源信息
export function getUserAdminAddedCountList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getUserAdminAddedCountList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 派发人力资源管理-派发人力资源信息-派发详情
export function getUserAdminAddedList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getUserAdminAddedList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 派发人力资源管理-筛选方式添加-统计总回收数量
export function getTakeBackTotalNum(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getTakeBackTotalNum&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 派发人力资源管理-筛选方式添加-统计总回收数量
export function getTakeBackListByMulCon(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getTakeBackListByMulCon&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 派发人力资源管理-筛选方式添加-添加
export function insertTakeBackUser(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guide\\insertTakeBackUser&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-用户间接成果详情-月份统计
export function getOrderStatisticMonth(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getOrderStatisticMonth_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 用户采购成果详情-月份详情
export function getOrderDemandMonthLis(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\order\\getOrderDemandMonthLis&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 用户供应成果详情-月份详情
export function getOrderSupplyMonthList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\order\\getOrderSupplyMonthList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 2022-01-08
// web-查询用户列表（未封号用户/已封号用户）
export function permissionGetList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\user\\permission\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看用户操作权限（根据操作权限类型）
export function permissionGetOneByType123(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\user\\permission\\getOneByType123&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看用户操作权限（品类采购操作权限）
export function permissionGetOneByType4(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\user\\permission\\getOneByType4&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查看用户操作权限（品类供应操作权限）
export function permissionGetOneByType5(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\user\\permission\\getOneByType5&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-更新用户账号操作权限
export function permissionUpdateByType1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\user\\permission\\updateByType1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-更新用户采购操作权限
export function permissionUpdateByType2(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\user\\permission\\updateByType2&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-更新用户供应操作权限
export function permissionUpdateByType3(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\user\\permission\\updateByType3&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-添加用户限制的品类采购操作权限
export function permissionUpdateByType4(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\user\\permission\\insertByType4&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-添加用户品类供应操作权限
export function permissionUpdateByType5(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\user\\permission\\insertByType5&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-取消品类限制
export function permissionDeleteDetail(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\cat\\user\\permission\\deleteDetail&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询未被限制采购/供应的品类列表
export function getUnLmitCatList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cat\\user\\permission\\getUnLmitCatList&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-用户采购成果详情-月份详情
export function getOrderDemandMonthList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\getOrderDemandMonthList_1_0_2&DBC=w_m',
    method: 'post',
    data: data
  })
}

//Web-回收用户投放管理-查询回收用户总数量
export function getCategoryTakeBakeTotalCount_1_0_1(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guide\\getCategoryTakeBakeTotalCount_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}


//web-通过文件上传方式添加（新增）人力资源
export function web_guide_upload_phone(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/web_guide_upload_phone?CustomMimeType=application/json',
    method: 'post',
    data: data
  })
}

