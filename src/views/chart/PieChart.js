import React, { Component } from 'react'
import { Card } from 'antd'
// import echarts from 'echarts'
//按需导入
// import echartTheme from '../echartTheme'
import echarts from 'echarts/lib/echarts'
//导入饼图
import $axios from '../../axios/$axios';
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
//引入样式
// import '../common.less'

export default class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			option: {
				title: {
					text: '订单月统计',
					x: 'center'
				},
				tooltip: {
					trigger: 'item',
					//提示框浮层内容格式器，支持字符串模板和回调函数形式。
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					top: 20,
					right: 5,
					data: []
				},
				series: [
					{
						name: '订单量',
						type: 'pie',
						data: [

						],
					}
				]
			}
		}
	}
	componentWillMount() {
		// echarts.registerTheme("Imooc", echartTheme) //注入主题
		// let that = this
		$axios({
			url: '/admin/fetch/year',
			method: 'post',
			type: 'json',
		}).then(data => {
			let newOption = this.state.option
			newOption.series[0].data = data.data.data
			newOption.legend.data = data.data.product
			this.setState({
				option: newOption
			})
			console.log(this.state.option)
		})
	}
	componentDidMount() {

	}
	getOption = () => {
		let option = {
			title: {
				text: '销量总统计',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				//提示框浮层内容格式器，支持字符串模板和回调函数形式。
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				top: 20,
				right: 5,
				data: []
			},
			series: [
				{
					name: '订单量',
					type: 'pie',
					data: [

					],
				}
			]
		}
		
		$axios({
			url: '/admin/fetch/year',
			method: 'post',
			type: 'json',
		}).then(data => {
			let newOption = this.state.option
			newOption.series[0].data = data.data.data
			newOption.legend.data = data.data.product
			option = newOption
		})
		return option
	}
	render() {
		return (
			<Card.Grid className="pie_a">
				<ReactEcharts option={this.state.option} notMerge={false} key={Date.now()} />
			</Card.Grid>
			
		)
	}
}

