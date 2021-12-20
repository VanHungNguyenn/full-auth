import React, { useState } from 'react'
import axios from 'axios'
import { Form, Input, Button, Card } from 'antd'

import { useParams, useHistory } from 'react-router-dom'
import { isLength, isMatch } from '../../utils/validation/Validation'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'

const initialState = {
	password: '',
	confirmPassword: '',
}

const ResetPassword = () => {
	const [security, setSecurity] = useState(initialState)

	const { password, confirmPassword } = security

	const { token } = useParams()

	const history = useHistory()

	const handleSubmit = async ({ password, confirmPassword }) => {
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

			const res = await axios.post(
				'/user/reset',
				{
					password,
				},
				{
					headers: { Authorization: token },
				}
			)

			showSuccessMsg(res.data.msg)
			history.push('/login')
		} catch (err) {
			err.response.data.msg && showErrorMsg(err.response.data.msg)
		}
	}

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setSecurity({ ...security, [name]: value })
	}

	return (
		<>
			<div className='login_page'>
				<Card
					title='Create a New Password'
					style={{ maxWidth: 600, width: '95%' }}
				>
					<Form
						name='basic'
						layout='vertical'
						onFinish={handleSubmit}
						autoComplete='off'
					>
						<Form.Item>
							Type and confirm a secure new password for the
							account
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
					</Form>
				</Card>
			</div>
		</>
	)
}

export default ResetPassword
