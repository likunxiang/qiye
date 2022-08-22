import request from '@/utils/request'
import axios from 'axios'

// web-供应-按单-查询报价接单开放值
export function getAcceptOrderFlag(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\getAcceptOrderFlag_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-开启报价接单
export function updAccOrderFlagOn(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\updAccOrderFlagOn_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-关闭报价接单
export function updAccOrderFlagOff(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\updAccOrderFlagOff_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-品类按单报价各状态数量统计
export function countPriceStatus(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\bReq\\countPriceStatus_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-查询符合供需配对的需求列表
export function getMapReqList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\bReq\\getMapReqList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-拒绝报价
export function rejectGivePrice(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\bReq\\rejectGivePrice_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-删除按单报价
export function deletePricePlates(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\bReq\\deletePricePlates_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-报价(我要报价)
export function insertBillPrice(data) {
	return request({
		url: '/ProxyService/aprc_weborg_deReq_insertBillPrice?CustomMimeType=application/json',
		method: 'post',
		data: data
	})
}

// web-供应-按单/型号-查询报价方案
export function getOfferCase(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\suReqPrice\\getPriceInfo_1_0_1,aprc\\webSuOrg\\supplier\\suReqPrice\\getPlates_1_0_1,aprc\\webSuOrg\\supplier\\suReqPrice\\getPlateFields_1_0_1,aprc\\webSuOrg\\supplier\\suReqPrice\\getPlateFieldValues_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-查询型号价格列表-按型号模式
export function getPriceList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\price\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-判断型号是否可以上架
export function isCanSales(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\price\\isCanSales_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-型号上架
export function updSalesOn(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\price\\updSalesOn_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-型号下架
export function updSalesOff(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\price\\updSalesOff_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-删除型号报价
export function deletePrice(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\price\\delete_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-型号-新增型号报价-按型号模式
export function insertModelPriceTc(data) {
  return request({
    url: '/ExSql_Distributed?TransactionName=insertModelPriceTc&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-查询型号价格内容
export function getModelPriceContent(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\price\\plates\\getModel_1_0_1,aprc\\webSuOrg\\supplier\\model\\price\\plates\\getPlates_1_0_1,aprc\\webSuOrg\\supplier\\model\\price\\plates\\getPlateFields_1_0_1,aprc\\webSuOrg\\supplier\\model\\price\\plates\\getPlateFieldValues_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

