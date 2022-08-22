import request from '@/utils/request'
import axios from 'axios'

// web-获取品类字节标题列表
export function getListBySceneGuid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\cat\\nt\\getListBySceneGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-按品类定义查询-获取品类字节内容列表
export function getNameTreeContentByCTGuid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\cat\\nt\\getNameTreeContentByCTGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-查询需求场景儿子节点列表
export function getSontList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\scene\\getSontList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-根据品类名称模糊搜索品类列表_1_0_1
export function getSuCatListBySdPathGuidAndCName(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\cat\\info\\getSuCatListBySdPathGuidAndCName_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-根据末级场景和字节内容查询品类列表_1_0_1
export function getSuCatListBySecenGuid(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\cat\\info\\getSuCatListBySecenGuid_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查看限制供应理由
export function getOneByType(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\user\\permission\\getOneByType_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供方-添加品类
export function addCat(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supplier\\info\\addCat_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-添加未完成交易的需求消息通知
export function addSupplyNMT(data) {
  return request({
    url: '/ProxyService/aprc_webbSuOrg_deReq_addSupplyNMT_1_0_1?CustomMimeType=application/json',
    method: 'post',
    params: data
  })
}

// web-供方-删除品类
export function deleteCat(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supplier\\info\\deleteCat_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}
