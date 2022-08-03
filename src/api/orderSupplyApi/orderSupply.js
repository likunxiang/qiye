import request from '@/utils/request'
import axios from 'axios'

// web-供应-查询供应交接管理列表(待供方处理的订单)
export function getWaitHandleList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\order\\getWaitHandleList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-查询订单详情
export function getOrderDetail(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\order\\getDetail_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}