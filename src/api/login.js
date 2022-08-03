import request from '@/utils/request'
import axios from 'axios'

// 发送短信验证码接口
export function getCode(phonenumber, type) {
	return request({
		url: '/ProxyService/aprc_app_sms_send?mobile=' + phonenumber + '&type=' + type,
		method: 'get'
	})
}

// 校验短信验证码接口
export function verifyCode(phonenumber, code) {
	return request({
		url: '/ProxyService/aprc_app_sms_validcode?mobile=' + phonenumber + '&code=' + code,
		// headers: {
		// 	'Content-Type': 'application/json'
		// },
		method: 'get'
	})
}

// web-注册用户
export function userRegister(data) {
	return request({
		url: 'ProxyService/aprc_worg_user_register_1_0_1?CustomMimeType=application/json',
		method: 'post',
		data: data
	})
}

// web-用户登录
export function userLogin(data) {
	return request({
		url: '/ProxyService/aprc_worg_user_login_1_0_1?CustomMimeType=application/json',
		method: 'post',
		data: data
	})
}

// web-获取机构用户个人信息
export function getUserInfo(data) {
	return request({
		url: '/QueryData?SqlCmdName=aprc\\webSuOrg\\user\\getOne_1_0_1&DBC=w_a',
		method: 'post',
		data: data
	})
}

// 原登录方法
// export function login(username, password, code, uuid) {
//   return request({
//     url: '/auth/login',
//     method: 'post',
//     data: { username, password, code, uuid }
//   })
// }

// 现登录方法
export function login(username, password, code, uuid) {
	axios.defaults.baseURL = '/api'
	return request({
		xf_url: '/api',
		url: '/ProxyService/Login?CustomMimeType=application/json',
		method: 'post',
		data: {
			username,
			password,
			code,
			uuid
		}
	})
}

// 注册方法
export function register(data) {
	return request({
		url: '/auth/register',
		headers: {
			isToken: false
		},
		method: 'post',
		data: data
	})
}

// 刷新方法
export function refreshToken() {
	return request({
		url: '/auth/refresh',
		method: 'post'
	})
}

// 获取用户详细信息
export function getInfo() {
	return request({
		url: '/system/user/getInfo',
		method: 'get'
	})
}

// 退出方法
export function logout() {
	return request({
		// url: '/auth/logout',
		url: '/ProxyService/aprc_web_logout',
		method: 'delete'
	})
}

// 获取验证码
export function getCodeImg() {
	return request({
		url: '/code',
		method: 'get',
		timeout: 20000
	})
}
