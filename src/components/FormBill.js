import React, { Component } from 'react';
import { Form, Input, Button, Cascader, Select } from 'antd';
const { Option } = Select;
class FormBil extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: props.data,
			residences: []
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		let data = {}
		// console.log(this.state)
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				data = values
				data.billId = this.state.data.billId
			}
		});
		this.props.handleSubmit(data)
	}
	handleChange = e => {
		// console.log(e)

	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { billId } = this.state.data.billId
		const tailFormItemLayout = {
			wrapperCol: {
				sm: {
					span: 9,
					offset: 9
				}
			}
		};
		return (
			<Form onSubmit={this.handleSubmit} refs="editForm">
				<Form.Item label="地址">
					{getFieldDecorator('address', {
						rules: [
							{
								required: false,
								message: '请输入地址！'
							}
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item label="状态">
					{getFieldDecorator('state', {
						ininitialValue: '未付款'
					})(<Select>
						<Option value="未付款">未付款</Option>
						<Option value="已付款">已付款</Option>
						<Option value="已出库">已出库</Option>
						<Option value="已收货">已收货</Option>
						<Option value="售后中">售后中</Option>
					</Select>)}
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						提交修改
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
export default Form.create()(FormBil);
