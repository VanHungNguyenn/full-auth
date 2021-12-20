import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'
import { isLength, isMatch } from '../../utils/validation/Validation'

const initialState = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const Register = () => {
	const [user, setUser] = useState(initialState)

	const { name, email, password, confirmPassword } = user
	console.log('User:', user)

	const handleSubmit = async ({ name, email, password, confirmPassword }) => {
		try {
			// Check mail and password are fill? => form
			// Check mail use true format? => form
			// Check length password?
			if (isLength(password)) {
				return showErrorMsg('Password must be at least 6 characters.')
			}
			// Check password match confirmPassword?
			if (!isMatch(password, confirmPassword)) {
				return showErrorMsg('Password did not match.')
			}

			const res = await axios.post('/user/register', {
				name,
				email,
				password,
			})

			showSuccessMsg(res.data.msg)
		} catch (err) {
			err.response.data.msg && showErrorMsg(err.response.data.msg)
		}
	}

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	return (
		<>
			<div className='login_page'>
				<Card title='Register' style={{ maxWidth: 550, width: '95%' }}>
					<Form
						name='basic'
						onFinish={handleSubmit}
						layout='vertical'
					>
						<Form.Item
							label='Name'
							name='name'
							htmlFor='name'
							className='mb-1'
							rules={[
								{
									required: true,
									message: 'Please input your email!',
								},
							]}
						>
							<Input
								value={name}
								type='text'
								name='name'
								id='name'
								onChange={handleChangeInput}
							/>
						</Form.Item>

						<Form.Item
							label='Email'
							name='email'
							className='mb-1'
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
								type='email'
								name='email'
								id='email'
								onChange={handleChangeInput}
							/>
						</Form.Item>

						<Form.Item
							label='Password'
							name='password'
							className='mb-1'
							htmlFor='password'
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

						<Form.Item
							label='Confirm password'
							name='confirmPassword'
							htmlFor='confirmPassword'
							rules={[
								{
									required: true,
									message:
										'Please input your confirm password!',
								},
							]}
						>
							<Input.Password
								value={confirmPassword}
								type='password'
								name='confirmPassword'
								id='confirmPassword'
								onChange={handleChangeInput}
							/>
						</Form.Item>

						<Form.Item className='mb-1'>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
						</Form.Item>
						<Form.Item className='mb-1 flex-end'>
							Have already an account?{'  '}
							<Link to='/login' className='link'>
								Login!
							</Link>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	)
}

export default Register
