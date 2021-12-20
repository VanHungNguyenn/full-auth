import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'
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
				<Card title='Login' style={{ maxWidth: 550, width: '95%' }}>
					<Form
						name='basic'
						onFinish={handleSubmit}
						layout='vertical'
					>
						<Form.Item
							label='Email'
							name='email'
							htmlFor='email'
							className='mb-1'
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
							style={{ width: '100%' }}
						>
							<Input
								value={email}
								type='email'
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
								type='password'
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

						<Form.Item className='mb-1'>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
						</Form.Item>
						<Form.Item className='mb-1'>
							Or Login with:{'  '}
						</Form.Item>

						<Form.Item className='mb-1'>
							New Customer?{'  '}
							<Link to='/register' className='link'>
								Register now!
							</Link>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	)
}

export default Login
