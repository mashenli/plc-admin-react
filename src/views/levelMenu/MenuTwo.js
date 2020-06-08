import React, { Component } from 'react';
import { Divider, Modal, Table } from 'antd';
import $axios from '../../axios/$axios';
import StockFrom from './stockFrom';
// import TableClass from './TableClass';
const { confirm } = Modal;
class MenuTwo extends Component {
	state = {
		data: [],
		pagination: {},
		loading: false,
		columns: [
			{
				title: '模块',
				dataIndex: 'classId',
				width: '20%'
			},
			{
				title: '型号',
				dataIndex: 'modular',
				width: '20%'
			},
			{
				title: '订货号',
				dataIndex: 'productId',
				width: '20%'
			},
			{
				title: '现有库存',
				dataIndex: 'stock'
			},
			{
				title: '操作',
				dataIndex: 'Action',
				width: 200,
				align: 'center',
				render: (text, row, index) => (
					<span>
						<button className="link-button" onClick={() => this.handleEdit(row)}>
							添加库存
                        </button>
					</span>
				)
			}
		],
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
			url: '/admin/fetch/lostStock',
			method: 'post',
			type: 'json',
			data: {
				sort: 'H7-200 SMART'
			}
		}).then(data => {
			// console.log(data)
			this.setState({
				loading: false,
				data: data.data,
			});
		});
	};
	handleEdit(row) {
		this.setState({ currentRow: row, visible: true });
		console.log(row)
	}
	handleCancel = () => {
		this.setState({ visible: false });
	};
	handleSubmit = e => {
		let json = {}
		json.productId = this.state.currentRow.productId
		json.num = parseInt(e.num) + parseInt(this.state.currentRow.stock)
		$axios({
			url: '/admin/addStock',
			method: 'post',
			type: 'json',
			data: json
		}).then(data => {
			// console.log(data)
			let oldData = this.state.data
			// console.log(oldData)
			for (let i = 0; i < oldData.length; i++) {
				if (json.productId == oldData[i].productId) {
					oldData[i].stock = json.num
				}
			}
			this.setState({ 
				visible: false,
				data:oldData
			});
		});
	}
	render() {
		return (
			<div>
				<Table
					bordered
					columns={this.state.columns}
					dataSource={this.state.data}
					loading={this.state.loading}
					onChange={this.handleTableChange}
					pagination={this.state.pagination}
					rowKey={record => record.productId}
				/>
				<Modal title="修改产品信息" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
					<StockFrom data={this.state.currentRow} visible={this.state.visible} wrappedComponentRef={form => (this.formRef = form)} handleSubmit={this.handleSubmit} />
				</Modal>
			</div>
		);
	}
}

export default MenuTwo;
