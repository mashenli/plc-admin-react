import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '@/redux/actions/userInfo';
import '@/assets/css/login';
import $axios from '../axios/$axios';


const FormItem = Form.Item;
class Login extends Component {
	state = { clientHeight: document.documentElement.clientHeight || document.body.clientHeight };
	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
	}
	login = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			// console.log(values)
			if (!err) {
				$axios({
					url: '/admin/login',
					method: 'post',
					type: 'json',
					data: values
				}).then(data => {
					console.log(data.data)
					let code = data.data.code;
					let type = data.data.type=='admin'?1:0
					// if (type === 'admin') {
					// 	type = 1
					// } else {
					// 	type = 0
					// }
					let role = {}
					role.type = type
					role.name = type == 1 ? '超级管理员' : '管理员'
					console.log(role)
					if (code === 0) {	//用户不存在
						console.log("用户不存在")
					} else if (code === 1) {  //登录成功
						console.log("登陆成功")
						localStorage.setItem('isLogin', '1');
						this.props.setUserInfo(Object.assign({}, values, { role: role }));
						localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, values, { role: { type: type, name: '超级管理员' } })));
						this.props.history.push('/dashboard');
					} else {  //密码错误
						console.log("密码错误")
					}
				});
			} else {
				console.log(err);
			}
		});
	};
	componentDidMount() {
		window.addEventListener('resize', this.onResize);
	}
	componentWillUnmount() {
		window.addEventListener('resize', this.onResize);
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}
	onResize() {
		this.setState({ clientHeight: document.documentElement.clientHeight || document.body.clientHeight });
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="container">
				<Particles
					height={this.state.clientHeight - 5 + 'px'}
					params={{
						number: { value: 50 },
						ize: { value: 3 },
						interactivity: {
							events: {
								onhover: { enable: true, mode: 'repulse' }
							}
						}
					}}
				/>
				<div className="content">
					<div className="title">汇晨PLC后台管理系统</div>
					<Form className="login-form">
						<FormItem>
							{getFieldDecorator('userName', {
								rules: [{ required: true, message: '请填写用户名！' }]
							})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请填写密码！' }]
							})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />)}
						</FormItem>
						<FormItem>
							<Button type="primary" htmlType="submit" block onClick={this.login}>
								登录
							</Button>
							{/* <div style={{ color: '#999',paddingTop:'10px',textAlign:'center' }}>Tips : 输入任意用户名密码即可</div> */}
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setUserInfo: data => {
		dispatch(setUserInfo(data));
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(Login));
