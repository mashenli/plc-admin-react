import React from 'react';
import { Form, Input, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import $axios from '../../axios/$axios';
const { Option } = Select;

// const residences = [
// 	{
// 		value: 'H7-200 SMART',
// 		label: 'H7-200 SMART',
// 		children: [
// 			{
// 				value: 'SMART CPU',
// 				label: 'SMART CPU',
// 			},
// 			{
// 				value: '数字量输入模块',
// 				label: '数字量输入模块',
// 			},
// 			{
// 				value: '数字量输出模块',
// 				label: '数字量输出模块',
// 			}
// 		]
// 	},
// 	{
// 		value: 'H7-200',
// 		label: 'H7-200',
// 		children: [
// 			{
// 				value: 'SMART CPU',
// 				label: 'SMART CPU',
// 			},
// 			{
// 				value: '数字量输入模块',
// 				label: '数字量输入模块',
// 			},
// 			{
// 				value: '数字量输出模块',
// 				label: '数字量输出模块',
// 			}
// 		]
// 	}
// ];

class BasicForm extends React.Component {
	state = {
		confirmDirty: false,
		residences: []

	};
	componentDidMount() {
		$axios({
			url: '/admin/fetchClass',
			method: 'get',
			type: 'json'
		}).then(data => {
			let oldData = []
			data.data.forEach((item, index) => {
				let element = {}
				element.value = item.sort
				element.label = item.sort
				element.children = []
				item.allClass.forEach((e, i) => {
					let child = {}
					child.value = e
					child.label = e
					element.children.push(child)
				})
				oldData.push(element)
			});
			// console.log(oldData)
			this.setState({
				residences: oldData
			})
		})

	}
	handleSubmit = e => {
		e.preventDefault();
		let data = {}
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				data = values
				data.sort = values.residence[0]
				data.classId = values.residence[1]
				delete data.residence
			}
		});
		$axios({
			url: '/admin/addProduct',
			method: 'post',
			type: 'json',
			data: data
		}).then(data => {
			console.log(data)
			if (data.data.code == 0) {
				alert("添加成功")
			}
			else if (data.data.code == 2) {
				alert("已存在")
			} else {
				alert("错误")
			}
		})
	};

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};
	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				sm: { span: 9 }
			},
			wrapperCol: {
				sm: { span: 6 }
			}
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
			<div className="shadow-radius">
				<div className="public-title">
					<h1>添加产品</h1>
				</div>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
					<Form.Item label="产品价格" >
						{getFieldDecorator('price', {
							rules: [
								{
									required: true,
									message: '请输入产品价格！'
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
			</div>
		);
	}
}
export default Form.create()(BasicForm);
