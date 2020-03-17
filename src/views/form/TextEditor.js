import React from 'react';
import { Form, Input, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import $axios from '../../axios/$axios';
const { Option } = Select;

class TextEditor extends React.Component {
	state = {
		confirmDirty: false,
		residences : [
			{
				value: 'H7-200 SMART',
				label: 'H7-200 SMART',
			},
			{
				value: 'H7-200',
				label: 'H7-200',
			},
			{
				value: 'H7-300',
				label: 'H7-300',
			}
		]

	}
	handleSubmit = e => {
		e.preventDefault();
		let data = {}
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				data = values
				data.sort = values.residence[0]
				delete data.residence
			}
		});
		console.log(data)
		$axios({
			url: '/admin/addClass',
			method: 'post',
			type: 'json',
			data: data
		}).then(data => {
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
					<h1>添加模块</h1>
				</div>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item label="产品分类">
						{getFieldDecorator('residence', {
							rules: [{ type: 'array', required: true, message: '请选择分类' }]
						})(<Cascader options={this.state.residences} />)}
					</Form.Item>
					<Form.Item label="模块">
						{getFieldDecorator('classId', {
							rules: [
								{
									required: true,
									message: '请输入型号！'
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

export default Form.create()(TextEditor);
