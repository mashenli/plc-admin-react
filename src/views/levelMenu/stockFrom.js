import React, { Component } from 'react';
import { Form, Input, Button, Cascader } from 'antd';
class StockFrom extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: props.data,
			residences: []
		}
	}
	handleSubmit = e => {
		console.log(this.state.data)
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
				<Form.Item label="库存数量">
					{getFieldDecorator('num', {
						rules: [
							{
								required: true,
								message: '请输入新加库存数量！'
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
export default Form.create()(StockFrom);