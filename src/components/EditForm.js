import React, { Component } from 'react';
import { Form, Input, Button,Cascader } from 'antd';
class EditForm extends Component {
	componentWillReceiveProps(nextProps) {
		!nextProps.visible && this.props.form.resetFields();
	}
	state = {
		confirmDirty: false,
		residences: []

	};
	render() {
		const { getFieldDecorator } = this.props.form;
		const { data } = this.props;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		};
		const formTailLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20, offset: 4 }
		};
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
				<Form.Item label="产品分类/产品模块">
						{getFieldDecorator('residence', {
							// initialValue: ['zhejiang', 'hangzhou', 'xihu'],
							rules: [{ type: 'array', required: true, message: '请选择分类及模块' }]
						})(<Cascader options={this.state.residences} />)}
					</Form.Item>
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
							添加
						</Button>
					</Form.Item>
			</Form>
		);
	}
}
export default Form.create()(EditForm);
