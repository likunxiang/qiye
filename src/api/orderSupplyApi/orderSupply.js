import request from '@/utils/request'
import axios from 'axios'

// web-供应-查询供应交接管理列表(待供方处理的订单)
export function getWaitHandleList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\order\\getWaitHandleList_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询订单详情
export function getOrderDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\order\\getDetail_1_0_2&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-确认处理完成
export function orderSuDone(data) {
  return request({
    url: '/ExSql?SqlCmdName= aprc\\webSuOrg\\supply\\order\\SuDone_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-发布成果
export function orderSubmitOutcome(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\order\\submitOutcome_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-更新订单阅读取消标志为已读
export function updOrderReadCFlag(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\order\\updOrderReadCFlag_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询退货交接管理列表
export function getJudgeResultNo3OrderList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\demand\\orderRefund\\getJudgeResultNo3OrderList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询退货签收详情
export function getRefundDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefund\\getRefundDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-提交退货收货地址
export function submitRefundAddr(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefund\\submitRefundAddr_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询需方退货证明
export function getDemandProveDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefund\\getDemandProveDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-退货供方手工验收通过
export function refundAcceptW1(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefund\\refundAcceptW1_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-退货供方系统验收通过
export function refundAcceptW2(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefund\\refundAcceptW2_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-退货验收通过后执行
export function aprc_webSuOrg_orderRefund(data) {
  return request({
    url: '/ProxyService/aprc_webSuOrg_orderRefund',
    method: 'post',
    data: data
  })
}

// web-供应-退货供方手工验收不通过
export function refundNotAccept(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefund\\refundNotAccept_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询订单状态管理列表
export function getOrderStatusList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderStatus\\getOrderStatusList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询订单状态详情
export function getOrderStatusDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderStatus\\getOrderStatusDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询订单是否取消
export function isOrderCancel(data) {
  return request({
    url: '/QueryData?SqlCmdName= aprc\\webSuOrg\\supply\\orderCancel\\isOrderCancel_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查看裁决结果信息
export function orderJudgeGetDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderJudge\\getDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询取消订单详情(订单已取消)
export function orderCancelGetDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderCancel\\getDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询退货申请
export function getRefundApplyDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefund\\getRefundApplyDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询验收情况(订单未裁决，需方正常验收)
export function getDemandAcceptDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\order\\getDemandAcceptDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询退货供方验收情况(订单有裁决，供方验收情况)
export function getSupplyAcceptDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderRefund\\getSupplyAcceptDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询供方处理订单情况(交付情况)
export function getSupplyDoneDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\order\\getSupplyDoneDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}
