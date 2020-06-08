/**
 * @ Author: Jone Chen
 * @ Create Time: 2019-06-19 16:58:23
 * @ Modified by: Jone Chen
 * @ Modified time: 2019-07-18 16:09:41
 * @ Description:权限控制，permission 1==超级管理员，其它为普通用户
 */

export const menus = [
	{
		path: '/dashboard',
		title: '首页',
		icon: 'home'
	},
	{
		path: '/table',
		title: '产品信息',
		icon: 'table',
		children: [
			{
				path: '/table/basic',
				title: 'H7-200 SMART'
			},
			{
				path: '/table/edit',
				title: 'H7-200'
			},
			{
				path: '/table/search',
				title: 'H7-300'
			}
		]
	},
	// {
	// 	path: '/icon',
	// 	title: '图标',
	// 	icon: 'file'
	// },
	{
		path: '/form',
		title: '产品管理',
		icon: 'form',
		children: [
			{
				path: '/form/basic',
				title: '添加产品'
			},
			{
				path: '/form/editor',
				title: '添加模块'
			}
		]
	},
	{
		path: '/menu',
		title: '库存管理',
		icon: 'menu',
		children: [
			{
				path: '/menu/level',
				title: '库存详情',
				path: '/menu/level/submenu-1',
			},
			{
				path: '/menu/level',
				title: '库存预警',
				path: '/menu/level/submenu-2',
			}
		]
	},
	{
		path: '/chart',
		title: '订单管理',
		icon: 'area-chart',
		children: [
			// {
			// 	path: '/chart/line',
			// 	title: '订单数据总览',
			// 	permission: 1
			// },
			// {
			// 	path: '/chart/bar',
			// 	title: '同年月份销量',
			// 	permission: 1
			// },
			{
				path: '/chart/pie',
				title: '产品销量比重',
				permission: 1
			},
			// {
			// 	path: '/chart/mixin',
			// 	title: '混合图表',
			// 	permission: 1
			// },
			{
				path: '/chart/keyboard',
				title: '查看订单'
			},
		]
	},
	{
		path: '/control',
		title: '员工管理',
		icon: 'control',
		permission: 1,
		children: [
			{
				path: '/control/tree',
				title: '添加管理员'
			},
			{
				path: '/control/select',
				title: '查看管理员'
			},
			{
				path: '/control/other',
				title: '其它'
			}
		]
	},
	// {
	// 	path: '/permission',
	// 	title: '权限测试',
	// 	icon: 'safety-certificate',
	// 	children: [
	// 		{
	// 			path: '/permission/toggle',
	// 			title: '权限切换',
	// 			permission: 1
	// 		},
	// 		{
	// 			path: '/permission/intercept',
	// 			title: '路由拦截'
	// 		}
	// 	]
	// },
	// {
	// 	path: '/news',
	// 	title: '消息',
	// 	icon: 'bell'
	// },
	// {
	// 	path: '/error',
	// 	title: '错误页面',
	// 	icon: 'switcher',
	// 	children: [
	// 		{
	// 			path: '/error/404',
	// 			title: '404'
	// 		},
	// 		{
	// 			path: '/error/500',
	// 			title: '500'
	// 		}
	// 	]
	// },
	// {
	// 	path: '/about',
	// 	title: '关于',
	// 	icon: 'copyright'
	// }
];
