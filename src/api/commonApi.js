import request from '@/utils/request'
import axios from 'axios'

// web-查看裁决结果信息
export function getJudgeResult(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\order\\settle\\demandDisobey\\getJudgeResult&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 上传图片
export function upLoadImgApi(data,FileName,FilePath) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/UpLoadFile?FileName=' + FileName +'&FilePath=' + FilePath,
    method: 'post',
    data: data
  })
}

// 获取仲裁账单编号
export function GetfeeNo(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/html?SqlCmdName=web\\GetfeeNo&DBC=w_m',
    method: 'post',
    data: data
  })
}

// web-编辑字段别名
export function updatePlateFieldAlias(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ExSql?SqlCmdName=web\\model\\updatePlateFieldAlias&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 新增id
export function getNewId(data) {
  return request({
    url: '/guid?OnlyTagReturn=true&DBC=w_a',
    method: 'post',
    params: data
  })
}

// 获取上传进度
export function getFileProgress(guid) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Cache?Name=GuideFileProgress&Key=' + guid,
    method: 'get',
  })
}

// 获取上传结果
export function getUploadResult(guid) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Cache?Name=GuideFileHandleNum&Key=' + guid,
    method: 'get',
  })
}

// 获取上传进度--批量新建服务对象
export function getFileProgress_service(guid) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Cache?Name=GuidanceNMFileProgress&Key=' + guid,
    method: 'get',
  })
}

// 获取上传结果--批量新建服务对象
export function getUploadResult_service(guid) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/Cache?Name=GuidanceNMFileHandleNum&Key=' + guid,
    method: 'get',
  })
}

// 获取国家列表
export function getNation(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\base\\getNation&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 获取省列表
export function getProvince(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\base\\getProvince&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 获取市列表
export function getCity(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\base\\getCity&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 获取县/区列表
export function getCounty(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\base\\getCounty&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 获取街道/镇列表
export function getTown(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\base\\getTown&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 发送短信验证码接口
export function web_SMS_Send(phonenumber,type) {
  return request({
    url: '/ProxyService/SMS_Send?mobile=' + phonenumber + '&type=' + type,
    method: 'get',
  })
}

// 校验验证码是否正确
export function web_SMS_validCode(phonenumber,code) {
  return request({
    url: '/ProxyService/SMS_validCode?phonenumber=' + phonenumber + '&code=' + code,
    method: 'get',
  })
}

// web-查询用户个人信息-根据用户id和用户角色
export function getDetailByIdAndRK(data) {
  return request({
    url: '/QueryData?SqlCmdName=web\\user\\info\\getDetailByIdAndRK_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 查询一级项目列表(一级供应路径)
export function getTopParentList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\path\\getTopParentList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// 查询个人/企业儿子路径列表
export function getSonList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\path\\getSonList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询固化库字段内容列表
export function getByCode(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\model\\fdValues\\getByCode_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}




