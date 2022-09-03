import request from '@/utils/request'
import axios from 'axios'

// web-查询反馈信息列表
export function getList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\feedback\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-我要反馈（新增反馈）
export function InsertOne(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\feedback\\InsertOne_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查看回复（已回复未回复都用此接口）
export function getDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\feedback\\getDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-退货退款意见反馈列表
export function getListByType(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefundFeedback\\getListByType_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-退货退款意见反馈-查看回复详情
export function getReplyDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefundFeedback\\getReplyDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-新增反馈
export function insert(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefundFeedback\\insert_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-退货退款异常反馈-列表内容阅读标志_1_0_1
export function getRefundReadFlag(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefundFeedback\\getRefundReadFlag_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

