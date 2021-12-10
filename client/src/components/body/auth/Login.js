import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { showErrorMsg, showSuccessMsg } from '../../utils/Notification'
import { dispathLogin } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'

const initialState = {
	email: '',
	password: '',
}

const Login = () => {
	const [user, setUser] = useState(initialState)
	const dispatch = useDispatch()
	const history = useHistory()

	const { email, password } = user

	const handleSubmit = async ({ email, password }) => {
		try {
			const res = await axios.post('/user/login', { email, password })
			setUser({
				...user,
			})

			showSuccessMsg(res.data.msg)

			localStorage.setItem('firstLogin', true)

			dispatch(dispathLogin())
			history.push('/')
		} catch (err) {
			err.response.data.msg &&
				setUser({
					...user,
				})
			showErrorMsg(err.response.data.msg)
		}
	}

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	return (
		<>
			<div className='login_page'>
				<Card title='Login' style={{ maxWidth: 600, width: '95%' }}>
					<Form
						name='basic'
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						onFinish={handleSubmit}
						autoComplete='off'
					>
						<Form.Item
							label='Email'
							name='email'
							type='email'
							htmlFor='email'
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
						>
							<Input
								value={email}
								name='email'
								id='email'
								onChange={handleChangeInput}
							/>
						</Form.Item>

						<Form.Item
							label='Password'
							name='password'
							htmlFor='password'
							className='mb-1'
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input.Password
								value={password}
								name='password'
								id='password'
								onChange={handleChangeInput}
							/>
						</Form.Item>

						<Form.Item className='forgot-password flex-end mb-1'>
							<Link to='/forgot_password' className='link'>
								Forgot your password
							</Link>
						</Form.Item>

						<Form.Item
							wrapperCol={{ offset: 8, span: 16 }}
							className='mb-1'
						>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
						</Form.Item>
						<Form.Item className='mb-1 flex-end'>
							Or{'  '}
							<a href='/register' className='link'>
								Register now!
							</a>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	)
}

export default Login
