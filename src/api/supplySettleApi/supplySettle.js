import request from '@/utils/request'
import axios from 'axios'

// web-供应-查询订单验收通过结算列表
export function orderSettleGetList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderSettle\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询订单验收通过结算详情
export function getOrderFeeSettleDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderSettle\\getOrderFeeSettleDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-订单违约费用缴纳列表
export function getJudgeFeeType1List(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderJudge\\getJudgeFeeType1List_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-订单违约费用缴纳详情
export function getJudgeFeeType1Detail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderJudge\\getJudgeFeeType1Detail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-微信支付-线上缴纳违约费用
export function aprc_webSuOrg_order_wxpayJudgeFeeType1(data) {
  return request({
    url: '/ProxyService/aprc_webSuOrg_order_wxpayJudgeFeeType1_1_0_1',
    method: 'post',
    data: data
  })
}

// web-供应-提供违约费用缴纳证明
export function updateJudgeFeeType1(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\orderJudge\\updateJudgeFeeType1_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-订单交易赔偿办理列表
export function getJudgeFeeType2List(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderJudge\\getJudgeFeeType2List_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-交易赔偿办理-办理详情
export function getJudgeFeeType2Detail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderJudge\\getJudgeFeeType2Detail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-交易赔偿办理-提交(填写)收款账号
export function submitBankInfo(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\orderJudge\\submitBankInfo_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查看付款证明
export function getPaidProve(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderJudge\\getPaidProve_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查看收款账号信息
export function getSupplyBankInfo(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\web\\order\\settle\\demand2supplyDisobey\\getSupplyBankInfo_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}


