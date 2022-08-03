import request from '@/utils/request'
import axios from 'axios'

// web-供应-采购需求接收列表分类数量
export function countByRT(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\mtNotice\\countByRT_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询某一品类下的采购需求接收需求信息列表
export function getListBySuPGuid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\mtNotice\\getListBySuPGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-删除需方需求(实际为删除消息通知)
export function deleteDemand(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\mtNotice\\delete_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查看需求内容详情
export function getDemandDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\dReq\\plates\\getPlates_1_0_1,aprc\\webSuOrg\\supplier\\dReq\\plates\\getPlateFields_1_0_1,aprc\\webSuOrg\\supplier\\dReq\\plates\\getPlateFieldValues_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

