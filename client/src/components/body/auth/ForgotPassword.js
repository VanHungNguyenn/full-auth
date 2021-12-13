import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { Link } from 'react-router-dom'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'
import axios from 'axios'

const ForgotPassword = () => {
	const [email, setEmail] = useState('')

	const handleSubmit = async ({ email }) => {
		try {
			const res = await axios.post('/user/forgot', {
				email,
			})

			showSuccessMsg(res.data.msg)
		} catch (err) {
			err.response.data.msg && showErrorMsg(err.response.data.msg)
		}
	}

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setEmail({ ...email, [name]: value })
	}

	return (
		<>
			<div className='login_page'>
				<Card
					title='Forgot your password'
					style={{ maxWidth: 600, width: '95%' }}
				>
					<Form
						name='basic'
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						onFinish={handleSubmit}
						autoComplete='off'
					>
						<Form.Item className='mb-1 flex-end'>
							Please enter the email address you'd like your
							password reset information sent to:
						</Form.Item>
						<Form.Item
							label='Email'
							name='email'
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
							wrapperCol={{ offset: 8, span: 16 }}
							className='mb-1'
						>
							<Button type='primary' htmlType='submit'>
								Request reset link
							</Button>
						</Form.Item>
						<Form.Item className='mb-1 flex-end'>
							<Link to='/login' className='link'>
								Back to Login!
							</Link>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	)
}

export default ForgotPassword
