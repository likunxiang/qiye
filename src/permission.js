import router from './router'
import store from './store'
import {
	Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
	getToken,
	getAdminId
} from '@/utils/auth'
import {
	constantRoutes
} from '@/router'

NProgress.configure({
	showSpinner: false
})

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
	NProgress.start()
	console.log('token',getToken());
	if (getToken() && getAdminId()) {
		to.meta.title && store.dispatch('settings/setTitle', to.meta.title)
		/* has token*/
		if (to.path === '/login') {
			next({
				path: '/'
			})
			NProgress.done()
		} else {
			console.log('store',store.getters.avatar);
			console.log('constantRoutes',constantRoutes);
			store.dispatch('GenerateRoutes').then(accessRoutes => {
				// 根据roles权限生成可访问的路由表
				console.log(constantRoutes);
				router.addRoutes(constantRoutes) // 动态添加可访问路由表
				next({
					...to,
					replace: true
				}) // hack方法 确保addRoutes已完成
			}).catch(err => {
					store.dispatch('LogOut').then(() => {
						// Message.error(err)
						next({
							path: '/'
						})
					})
				})
			if (!getAdminId()) {
				// 判断当前用户是否已拉取完user_info信息
				store.dispatch('GetInfo').then(() => {
					console.log(constantRoutes);
					store.dispatch('GenerateRoutes').then(accessRoutes => {
						// 根据roles权限生成可访问的路由表
						console.log(constantRoutes);
						router.addRoutes(constantRoutes) // 动态添加可访问路由表
						next({
							...to,
							replace: true
						}) // hack方法 确保addRoutes已完成
					})
				}).catch(err => {
					store.dispatch('LogOut').then(() => {
						// Message.error(err)
						Message.error('登录已失效，请重新登录')
						next({
							path: '/'
						})
					})
				})
			} else {
				next()
			}
		}
	} else {
		// 没有token
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免登录白名单，直接进入
			next()
		} else {
			next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
			NProgress.done()
		}
	}
})

router.afterEach(() => {
	NProgress.done()
})
