import React, { Component } from 'react';
import { Form, Input, Button, Cascader } from 'antd';
class EditForm extends Component {
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
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				data = values
			}
		});
		this.props.handleSubmit(data)
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { productId } = this.state.data.productId
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
				<Form.Item label="型号">
					{getFieldDecorator('modular', {
						rules: [
							{
								required: true,
								message: '请输入型号！'
							}
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item label="订货号">
					{getFieldDecorator('productId', {
						rules: [
							{
								required: true,
								message: '请输入订货号！'
							}
						]
					})(<Input />)}
				</Form.Item>
				<Form.Item label="产品描述" >
					{getFieldDecorator('describe', {
						rules: [
							{
								required: true,
								message: '请输入产品描述！'
							}
						]
					})(<Input />)}
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
export default Form.create()(EditForm);
