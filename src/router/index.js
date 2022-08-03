import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import ParentView from '@/components/ParentView';

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [{
			path: '/redirect/:path(.*)',
			component: (resolve) => require(['@/views/redirect'], resolve)
		}]
	},
	{
		path: '/login',
		component: (resolve) => require(['@/views/login'], resolve),
		hidden: true
	},
	{
		path: '/register',
		component: (resolve) => require(['@/views/register'], resolve),
		hidden: true
	},
	{
		path: '/404',
		component: (resolve) => require(['@/views/error/404'], resolve),
		hidden: true
	},
	{
		path: '/401',
		component: (resolve) => require(['@/views/error/401'], resolve),
		hidden: true
	},
	{
		path: '',
		component: Layout,
		redirect: 'index',
		children: [{
			path: 'index',
			component: (resolve) => require(['@/views/index'], resolve),
			name: 'Index',
			meta: {
				title: '首页',
				icon: 'dashboard',
				affix: true
			}
		}]
	},
	{
		path: '/ceshiluyou',
		component: Layout,
		redirect: 'index',
		redirect: "noRedirect",
		alwaysShow: true,
		meta: {
			title: '测试路由',
			icon: '#',
		},
		children: [{
			path: 'index1',
			component: (resolve) => require(['@/views/ceshiluyou/index'], resolve),
			name: 'Index1',
			meta: {
				title: '测试路由1',
				icon: 'dashboard',
			}
		}, {
			path: 'index999',
			component: (resolve) => require(['@/views/ceshiluyou/index999'], resolve),
			name: 'Index999',
			meta: {
				title: '测试路由999',
				icon: 'dashboard',
			}
		},{
			path: 'ceshiChildren',
			component: ParentView,
			name: 'CeshiChildren',
			meta: {
				title: '测试路由儿子标题',
				icon: '#',
			},
			children: [{
				path: '/ceshiluyou/ceshiChildren/index2',
				component: (resolve) => require(['@/views/ceshiluyou/ceshiChildren/index'], resolve),
				name: 'Index2',
				meta: {
					title: '测试路由儿子内容',
					icon: '#',
				},
			},{
				path: 'ceshisunzi',
				component: (resolve) => require(['@/views/ceshiluyou/ceshiChildren/ceshisunzi/index'],
					resolve),
				name: 'Ceshisunzi',
				meta: {
					title: '测试路由孙子',
					icon: 'dashboard',
				}
			}]
			
		}]
	},
	{
		path: '',
		component: Layout,
		redirect: 'index',
		children: [{
			path: 'supplyClassChoose',
			component: (resolve) => require(['@/views/supplyClassChoose/classChoose'], resolve),
			name: 'SupplyClassChoose',
			meta: {
				title: '供应品类选择',
				icon: '#',
			}
		}]
	},
	{
		path: '',
		component: Layout,
		redirect: 'index',
		children: [{
			path: 'supplyRange',
			component: (resolve) => require(['@/views/supplyRange/supplyRange'], resolve),
			name: 'SupplyRange',
			meta: {
				title: '供应范围管理',
				icon: '#',
			}
		}]
	},
	{
		path: '',
		component: Layout,
		redirect: 'index',
		children: [{
			path: 'demandReceive',
			component: (resolve) => require(['@/views/demandReceive/demandReceive'], resolve),
			name: 'DemandReceive',
			meta: {
				title: '需方需求接收',
				icon: '#',
			}
		}]
	},
	{
		path: '',
		component: Layout,
		redirect: 'index',
		children: [{
			path: 'supplyOffer',
			component: (resolve) => require(['@/views/supplyOffer/supplyOffer'], resolve),
			name: 'SupplyOffer',
			meta: {
				title: '供应报价管理',
				icon: '#',
			}
		}]
	},
	{
		path: '/orderSupply',
		component: Layout,
		redirect: 'index',
		alwaysShow: true,
		meta: {
			title: '订单供应管理',
			icon: '#',
		},
		children: [{
			path: 'resultsHandover',
			component: ParentView,
			name: 'ResultsHandover',
			alwaysShow: true,
			meta: {
				title: '成果交接管理',
				icon: '#',
			},
			children: [{
				path: 'supplyHandover',
				component: (resolve) => require(['@/views/orderSupply/resultsHandover/supplyHandover'], resolve),
				name: 'SupplyHandover',
				meta: {
					title: '供应交接管理',
					icon: '#',
				}
			}]
		}]
	},
	{
		path: '/user',
		component: Layout,
		hidden: true,
		redirect: 'noredirect',
		children: [{
			path: 'profile',
			component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
			name: 'Profile',
			meta: {
				title: '个人中心',
				icon: 'user'
			}
		}]
	},
	{
		path: '/system/user-auth',
		component: Layout,
		hidden: true,
		children: [{
			path: 'role/:userId(\\d+)',
			component: (resolve) => require(['@/views/system/user/authRole'], resolve),
			name: 'AuthRole',
			meta: {
				title: '分配角色',
				activeMenu: '/system/user'
			}
		}]
	},
	{
		path: '/system/role-auth',
		component: Layout,
		hidden: true,
		children: [{
			path: 'user/:roleId(\\d+)',
			component: (resolve) => require(['@/views/system/role/authUser'], resolve),
			name: 'AuthUser',
			meta: {
				title: '分配用户',
				activeMenu: '/system/role'
			}
		}]
	},
	{
		path: '/system/dict-data',
		component: Layout,
		hidden: true,
		children: [{
			path: 'index/:dictId(\\d+)',
			component: (resolve) => require(['@/views/system/dict/data'], resolve),
			name: 'Data',
			meta: {
				title: '字典数据',
				activeMenu: '/system/dict'
			}
		}]
	},
	{
		path: '/monitor/job-log',
		component: Layout,
		hidden: true,
		children: [{
			path: 'index',
			component: (resolve) => require(['@/views/monitor/job/log'], resolve),
			name: 'JobLog',
			meta: {
				title: '调度日志',
				activeMenu: '/monitor/job'
			}
		}]
	},
	{
		path: '/tool/gen-edit',
		component: Layout,
		hidden: true,
		children: [{
			path: 'index',
			component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
			name: 'GenEdit',
			meta: {
				title: '修改生成配置',
				activeMenu: '/tool/gen'
			}
		}]
	}
]

export default new Router({
	mode: 'history', // 去掉url中的#
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})
