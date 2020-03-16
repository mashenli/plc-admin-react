import React, { Component } from 'react';
import { Table, Divider, Modal, message } from 'antd';
import EditForm from '../../components/EditForm';
import $axios from '../../axios/$axios';
const { confirm } = Modal;
class TableClass extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: props.data,
			pagination: props.pagination,
			loading: props.loading,
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
					title: '产品描述',
					dataIndex: 'describe'
				},
				{
					title: '操作',
					dataIndex: 'Action',
					width: 200,
					align: 'center',
					render: (text, row, index) => (
						<span>
							<button className="link-button" onClick={() => this.handleEdit(row)}>
								编辑
							</button>
							<Divider type="vertical" />
							<button className="link-button" onClick={() => this.handleDel(row)}>
								删除
							</button>
						</span>
					)
				}
			]
		}
	}
	componentWillMount() {
		// console.log(this.state)
	}
	componentWillReceiveProps(nextProps) {
		if ('data' in nextProps && 'loading' in nextProps) {
			this.setState({
				data: nextProps.data ? nextProps.data : [],
				loading: nextProps.loading ? nextProps.loading : false
			});
		}
	}
	handleEdit(row) {
		this.setState({ currentRow: row, visible: true });
	}
	handleDel(row) {
		let that = this
		confirm({
			title: '温馨提示',
			content: '确定要删除当前产品吗？',
			okText: '确定',
			cancelText: '取消',
			onOk() {
				that.delete(row)
			},
			onCancel() { }
		});
	}
	delete(value) {
		let that = this
		$axios({
			url: '/admin/deleteProduct',
			method: 'post',
			type: 'json',
			data: value
		}).then(data => {
			if (data.data.code == 0) {
				let num = that.state.data.findIndex(obj => obj.productId === value.productId)
				console.log(num)
				if (num > -1) {
					let newData = that.state.data
					newData.splice(num, 1)
					that.setState({
						data: newData
					})
					message.info('删除成功')
				}
			}
			else {
				message.info('删除失败')
			}
		});
	}
	handleOk = () => {
		// this.setState({ visible: false });
		console.log("确认删除")
	};
	handleCancel = () => {
		this.setState({ visible: false });
	};
	handleSubmit = e => {
		console.log("进入table")
		$axios({
			url: '/admin/modifyProduct',
			method: 'post',
			type: 'json',
			data: e
		}).then(data => {
			console.log(data)
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
					<EditForm data={this.state.currentRow} visible={this.state.visible} wrappedComponentRef={form => (this.formRef = form)} handleSubmit={this.handleSubmit} />
				</Modal>
			</div>
		);
	}
}

export default TableClass;