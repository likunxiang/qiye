import request from '@/utils/request'
import axios from 'axios'

// web-供应-消息通知-消息通知列表_1_0_1
export function getList(data) {
  return request({
    url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\supply\\orderNotice\\supply\\getList_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

// web-供应-更新订单消息通知阅读标志为已读_1_0_1
export function updateReadFlag(data) {
  return request({
    url: '/ExSql?SqlCmdName=aprc\\webSuOrg\\supply\\orderNotice\\updateReadFlag_1_0_1&DBC=w_a',
    method: 'post',
    data: data
  })
}

