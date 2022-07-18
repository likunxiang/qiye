import request from '@/utils/request'
import axios from 'axios'

// 查询场景
export function checkSceneList(query) {
  return request({
    url: '/scenes/list',
    method: 'get',
    params: query
  })
}

// 新增场景
export function addScene(data) {
  return request({
    url: '/scenes',
    method: 'post',
    data: data
  })
}

// web-查询品类类型列表
export function getList(data) {
  axios.defaults.baseURL = '/api'
  return request({
    xf_url: '/api',
    url: '/QueryData?SqlCmdName=web\\cattype\\getList&DBC=w_m',
    method: 'post',
    data: data
  })
}

