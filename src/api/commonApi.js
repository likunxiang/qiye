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
  axios.defaults.baseURL = '/api'
  return request({
    url: '/guid?OnlyTagReturn=true&DBC=w_m',
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

// 获取省列表
export function getProvince(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\getProvince&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 获取市列表
export function getCity(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\getCity&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 获取县/区列表
export function getCounty(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=com\\getCounty&DBC=w_m',
    method: 'post',
    data: data
  })
}

// 发送短信验证码接口
export function web_SMS_Send(phonenumber,type) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/SMS_Send?mobile=' + phonenumber + '&type=' + type,
    method: 'get',
  })
}

// 校验验证码是否正确
export function web_SMS_validCode(phonenumber,code) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/ProxyService/SMS_validCode?phonenumber=' + phonenumber + '&code=' + code,
    method: 'get',
  })
}

// web-查询用户个人信息-根据用户id和用户角色
export function getDetailByIdAndRK(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\user\\info\\getDetailByIdAndRK_1_0_1&DBC=w_m',
    method: 'post',
    data: data
  })
}
