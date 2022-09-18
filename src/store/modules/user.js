import {
	userLogin,
	getUserInfo,
	login,
	logout,
	getInfo,
	refreshToken,
	getDefaultProject
} from '@/api/login'
import {
	getToken,
	setToken,
	setExpiresIn,
	removeToken,
	setAdminId,
	getAdminId,
	removeAdminId,
	setDeptId,
	getDeptId,
	removeDeptId,
	setProjectId,
	getProjectId,
} from '@/utils/auth'

const user = {
	state: {
		token: getToken(),
		name: '',
		avatar: '',
		roles: [],
		permissions: [],
		adminId: getAdminId(),
		deptId: getDeptId(),
		projectId: getProjectId()?JSON.parse(getProjectId()):{},
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_EXPIRES_IN: (state, time) => {
			state.expires_in = time
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_PERMISSIONS: (state, permissions) => {
			state.permissions = permissions
		},
		SET_ADMINID: (state, adminId) => {
			state.adminId = adminId
		},
		SET_DEPTID: (state, deptId) => {
			state.deptId = deptId
		},
		updataProject:(state,project) =>  {
			state.projectId = project
		}
	},

	actions: {
		// 新登录
		Login({
			commit
		}, userInfo) {
			let obj = {
				phonenumber: userInfo.phonenumber,
				code: userInfo.code
			}
			return new Promise((resolve, reject) => {
				userLogin(userInfo).then(res => {
					let data = res.Tag
					console.log('data', data);
					setToken(data.token)
					setAdminId(data.userid)
					commit('SET_TOKEN', data.token)
					commit('SET_ADMINID', data.userid)
					getDefaultProject().then(res => {
						let data1 = res
						this.choosedProject = data1.pathName
						setProjectId(data1)
						commit('updataProject', data1)
					})
					resolve()
				}).catch(error => {
					console.log(error);
					reject(error)
				})
			})
		},
		// // 登录
		// Login({
		// 	commit
		// }, userInfo) {
		// 	const username = userInfo.username.trim()
		// 	const password = userInfo.password
		// 	const code = userInfo.code
		// 	const uuid = userInfo.uuid
		// 	return new Promise((resolve, reject) => {
		// 		login(username, password, code, uuid).then(res => {
		// 			let data = res.Tag
		// 			console.log('data', data);
		// 			setToken(data.access_token)
		// 			setAdminId(data.user_info.userid)
		// 			console.log('data.user_info.sysUser.deptId', data.user_info.sysUser.deptId);
		// 			setDeptId(data.user_info.sysUser.deptId || '0')
		// 			commit('SET_TOKEN', data.access_token)
		// 			setExpiresIn(data.expires_in)
		// 			commit('SET_EXPIRES_IN', data.expires_in)
		// 			commit('SET_ADMINID', data.user_info.userid)
		// 			commit('SET_DEPTID', data.user_info.sysUser.deptId || '0')
		// 			resolve()
		// 		}).catch(error => {
		// 			reject(error)
		// 		})
		// 	})
		// },
		
		// 获取用户信息
		GetInfo({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				getUserInfo({
					userId: getAdminId()
				}).then(res => {
					const user = res.Tag[0].Table[0]
					const avatar = user.avatar == "" ? require("@/assets/images/profile.jpg") : user
						.avatar;
					commit('SET_NAME', user.userName)
					commit('SET_AVATAR', avatar)
					resolve(res)
				}).catch(error => {
					console.log('获取用户信息',error);
					reject(error)
				})
			})
		},

		// // 获取用户信息
		// GetInfo({
		// 	commit,
		// 	state
		// }) {
		// 	return new Promise((resolve, reject) => {
		// 		getInfo().then(res => {
		// 			const user = res.user
		// 			const avatar = user.avatar == "" ? require("@/assets/images/profile.jpg") : user
		// 				.avatar;
		// 			commit('SET_NAME', user.userName)
		// 			commit('SET_AVATAR', avatar)
		// 			resolve(res)
		// 		}).catch(error => {
		// 			reject(error)
		// 		})
		// 	})
		// },

		// 刷新token
		RefreshToken({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				refreshToken(state.token).then(res => {
					setExpiresIn(res.Tag)
					commit('SET_EXPIRES_IN', res.Tag)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 退出系统
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				logout({
					curUserId: state.adminId
				}).then(() => {
					commit('SET_TOKEN', '')
					commit('SET_ADMINID', '')
					commit('SET_DEPTID', '')
					commit('SET_ROLES', [])
					commit('SET_PERMISSIONS', [])
					removeToken()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				commit('SET_ADMINID', '')
				commit('SET_DEPTID', '')
				removeToken()
				removeAdminId()
				removeDeptId()
				resolve()
			})
		}
	}
}

export default user
