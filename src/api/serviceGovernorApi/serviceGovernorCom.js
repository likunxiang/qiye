import request from '@/utils/request'
import axios from 'axios'

// web-添加服务专员
export function introducerInsert(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\introducer\\insert_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员列表
export function introducerGetListByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getListByDirId_1_0_1&DBC=w_m',
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

// web-删除服务专员
export function introducerDelete(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\guidance\\introducer\\delete_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员团队列表
export function introducerGetRegisteredListByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getRegisteredListByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员权限对象列表
export function introducerGetValidNMListByInUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getValidNMListByInUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员权限对象数量详情列表
export function introducerGetValidNMListByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getValidNMListByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员已注册权限对象数量详情列表
export function introducerGetValidRegisterdNMListByInUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getValidRegisterdNMListByInUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员未注册权限对象数量详情列表
export function introducerGetValidUnRegisterdNMListByInUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getValidUnRegisterdNMListByInUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员进度管理列表
export function statisticGetYearByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getYearByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员月新增注册对象数量详情列表
export function statisticGetMonthRegNumByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getMonthRegNumByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员日新增注册对象数量详情列表-统计每个服务专员每天的新增服务对象数量
export function statisticGetDayRegNumByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getDayRegNumByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询注册数量服务专员服务详情列表
export function statisticGetDayRegDetailListByIntroUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getDayRegDetailListByIntroUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员月采购验收通过订单数量详情列表
export function statisticGetMonthDeOrderOkNumByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getMonthDeOrderOkNumByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员日采购验收通过订单数量详情列表
export function statisticGetDayDeOrderOkNumByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getDayDeOrderOkNumByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询采购订单验收通过数量服务专员服务详情列表
export function statisticGetDayDeOrderOkDetailListByIntroUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getDayDeOrderOkDetailListByIntroUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员月供应验收通过订单数量详情列表
export function statisticGetMonthSuOrderOkNumByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getMonthSuOrderOkNumByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员日供应验收通过订单数量详情列表
export function statisticGetDaySuOrderOkNumByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getDaySuOrderOkNumByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询供应订单验收通过数量服务专员服务详情列表
export function statisticGetDaySuOrderOkDetailListByIntroUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getDaySuOrderOkDetailListByIntroUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-身份认证判断身份证号是否已被认证过
export function isIdNumberExists(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\tools\\ucertification\\isIdNumberExists_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-身份认证判断用户是否已经认证过
export function isUserExists(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\tools\\ucertification\\isUserExists_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-缴纳身份认证
export function ucertification_insert(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Exsql?SqlCmdName=web\\tools\\ucertification\\insert_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询用户提现账号信息
export function account_getOne(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\tools\\account\\getOne_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-新增用户提现账号信息
export function account_insert(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Exsql?SqlCmdName=web\\tools\\account\\insert_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务主管收益详情
export function statistic_getDetailByEarGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\earnings\\statistic\\getDetailByEarGuid_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务主管收益列表
export function web_getYearEarningsByDirUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/web_getYearEarningsByDirUserId?dirUserId=' + data.dirUserId + '&year=' + data.year + '&curUserId=' + data.curUserId,
    method: 'get',
  })
}

// web-服务主管提现
export function web_withdrawEar(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/web_withdrawEar',
    method: 'post',
    data: data
  })
}


// web-根据主管id查询服务专员列表-未开通账号
export function introducerGetUnRegisterListByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getUnRegisterListByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据主管id查询服务专员列表-已开通账号
export function introducerGetRegisterListByDirId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getRegisterListByDirId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据主管id查询所属服务专员的服务对象注册详情列表
export function statisticGetAllBelongRegDetailListByDirUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getAllBelongRegDetailListByDirUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据主管id查询所属服务专员的服务对象采购验收通过订单详情列表
export function statisticGetAllBeloDeOrderOkNumDetailListByDirUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getAllBeloDeOrderOkNumDetailListByDirUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据主管id查询所属服务专员的服务对象供应验收通过订单详情列表
export function statisticGetAllBeloSuOrderOkNumDetailListByDirUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getAllBeloSuOrderOkNumDetailListByDirUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据服务主管用户id和服务专员用户id查询服务对象注册详情列表
export function statisticGetValidRegisterDetailListByIntroUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getBeloRegiDetailListByIntroUidAndDirUid_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据服务主管id和服务专员guid查询服务对象的采购验收通过订单详情列表
export function statisticGetDeOrderOkNumDetailListByDirAndIntroGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getDeOrderOkNumDetailListByDirAndIntroGuid_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据服务主管用户id和服务专员guid查询服务对象的供应验收通过订单详情列表
export function statisticGetSuOrderOkNumDetailListByDirAndIntroGuid(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getSuOrderOkNumDetailListByDirAndIntroGuid_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询订单详情列表
export function statisticGetOrderDetailList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getOrderDetailList_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-查询服务专员团队列表
export function introducerGetRegisteredListByDirIdOfM(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\introducer\\getRegisteredListByDirIdOfM_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}







// web-根据服务专员id查询服务对象的采购验收通过订单详情列表
export function statisticGetAllRegisterDetailListByIntroUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getAllRegisterDetailListByIntroUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

//web-根据服务专员id查询服务对象的采购验收通过订单详情列表
export function statisticGetDeOrderOkNumDetailListByIntroUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getDeOrderOkNumDetailListByIntroUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-根据服务专员用户id查询服务对象的供应验收通过订单详情列表
export function statisticGetSuOrderOkNumDetailListByIntroUserId(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\guidance\\statistic\\getSuOrderOkNumDetailListByIntroUserId_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
