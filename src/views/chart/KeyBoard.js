import React, { Component } from 'react';
import { Radio, Input } from 'antd';
import $axios from '../../axios/$axios';
// import TableClass from '../table/TableClass';
import Bill from './Bill';
import './bill.css'
// const { confirm } = Modal;
const { Search } = Input;
class TableBill extends Component {
	state = {
		data: [],
		pagination: {},
		allBill: [],
		loading: false,
		value: '',
	};

	componentWillMount() {
		this.fetch();
	}

	componentWillUnmount() {
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}
	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({
			pagination: pager
		});
		this.fetch({
			results: pagination.pageSize,
			page: pagination.current,
			sortField: sorter.field,
			sortOrder: sorter.order,
			...filters
		});
	};
	fetch = () => {
		this.setState({ loading: true });
		$axios({
			url: '/admin/fetch/bill',
			method: 'post',
			type: 'json'
		}).then(data => {
			this.setState({
				loading: false,
				data: data.data,
				allBill: data.data
				// pagination
			});
		});
	};
	onChange = e => {
		console.log('radio checked', e.target.value);
		let newData = []
		this.state.allBill.map(function (item, index) {
			// console.log(value,index)
			if (item.state == e.target.value) {
				newData.push(item)
			}
		})
		this.setState({
			value: e.target.value,
			data: newData
		});
	};
	onSearchBill(num){
		// console.log(num)
		let json = {}
		json.phoneNum = num
		$axios({
			url: '/admin/fetch/bill',
			method: 'post',
			type: 'json',
			data: json
		}).then(data => {
			this.setState({
				loading: false,
				data: data.data,
				allBill: data.data
				// pagination
			});
		});
	}
	render() {
		return (
			<div className="shadow-radius">
				<div>
					<div className="hidden">
						<Radio.Group onChange={this.onChange} value={this.state.value}>
							<Radio value={'已付款'}>已付款</Radio>
							<Radio value={'已出库'}>已出库</Radio>
							<Radio value={'已收货'}>已收货</Radio>
							<Radio value={'售后中'}>售后中</Radio>
						</Radio.Group>
						<Search
							placeholder="请输入要查询账单的手机号"
							enterButton="搜索"
							size="large"
							onSearch={value=>this.onSearchBill(value)}
							className="search"
						/>
					</div>
				</div>
				<Bill
					data={this.state.data}
					bordered
					loading={this.state.loading}
					onChange={this.handleTableChange}
					pagination={this.state.pagination}
				/>
			</div>
		);
	}
}

export default TableBill;
