import React, { Component } from 'react';
import {Divider, Modal, message } from 'antd';
import $axios from '../../axios/$axios';
import TableClass from './TableClass';
const { confirm } = Modal;
class TableBasic extends Component {
	state = {
		data: [],
		pagination: {},
		loading: false,
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
			url: '/admin/fetch/sort',
			method: 'post',
			type: 'json',
			data: {
				sort: 'H7-200 SMART'
			}
		}).then(data => {
			// const pagination = { ...this.state.pagination };
			// Read total count from server
			// pagination.total = data.totalCount
			// pagination.total = 200;
			this.setState({
				loading: false,
				data: data.data,
				// pagination
			});
		});
	};
	render() {
		return (
			<div className="shadow-radius">
				<TableClass
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

export default TableBasic;
