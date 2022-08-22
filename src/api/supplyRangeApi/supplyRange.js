import request from '@/utils/request'
import axios from 'axios'

// web-供应-查看已添加的品类列表
export function getAddedCatList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\info\\getAddedCatList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询需求范围开关
export function getRangeFlag(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\info\\getRangeFlag_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-开启需求范围
export function updateRangeFlagOn(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\info\\updateRangeFlagOn_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-关闭需求范围
export function updateRangeFlagOff(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\info\\updateRangeFlagOff_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-新增需求范围内容
export function insertBill(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\insertBill_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-已有值修改需求范围内容
export function updateBill(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\updateBill_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-删除需求范围
export function deleteBill(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\deleteBill_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-按单-查询供方需求范围内容
export function getSupplyRangeBySingle(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\bill\\plates\\getPlates_1_0_1,aprc\\webSuOrg\\supplier\\bill\\plates\\getPlateFields_1_0_1,aprc\\webSuOrg\\supplier\\bill\\plates\\getPlateFieldValues_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-新增需求范围内容
export function insertSupplierModelTc(data) {
  return request({
    url: '/ExSql_Distributed?TransactionName=webSuOrg_insertSupplierModelTc&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-查询某一品类需求范围的型号列表
export function getModels(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\info\\getModels_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-查询供方需求范围内容
export function getSuppyRangeByModel(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\plates\\getPlates_1_0_1,aprc\\webSuOrg\\supplier\\model\\plates\\getPlateFields_1_0_1,aprc\\webSuOrg\\supplier\\model\\plates\\getPlateFieldValues_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-修改需求范围内容 // TODO
// export function getModels(data) {
//   return request({
//     url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\info\\getModels_1_0_1&DBC=w_a',
//     method: 'post',
//     data: data
//   })
// }

// web-供应-型号-删除需求范围
export function deleteModelBySupplierGuid(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\info\\deleteModelBySupplierGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-删除某一型号
export function deleteModel(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\info\\deleteModel_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-型号-查询型号名称是否重复
export function getModelNameExistsFlag(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\model\\info\\getModelNameExistsFlag_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}


// web-查询无值板块名称字段页面模板(需求范围按单报价、型号价格适用) --- 板块相关空白时使用
export function getPlateEmptyModel(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\model\\plates\\getPlates_1_0_1,aprc\\webSuOrg\\model\\plates\\getPlateFields_1_0_1,aprc\\\webSuOrg\\model\\plates\\getFieldContents_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}



