import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, Row, Form, Button, Input, Checkbox } from 'antd'
import axios from 'axios'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'

const Edituser = () => {
	const { id } = useParams()

	const history = useHistory()

	const [editUser, setEditUser] = useState([])

	const users = useSelector((state) => state.users)
	const token = useSelector((state) => state.token)

	const [checkAdmin, setCheckAdmin] = useState(false)
	const [num, setNum] = useState(0)

	const handleSubmit = async () => {
		try {
			if (num % 2 !== 0) {
				const res = await axios.patch(
					`/user/update_role/${editUser._id}`,
					{
						role: checkAdmin ? 1 : 0,
					},
					{
						headers: {
							Authorization: token,
						},
					}
				)
				showSuccessMsg(res.data.msg)
				setNum(0)
			}
		} catch (err) {
			err.response.data.msg && showErrorMsg(err.response.data.msg)
		}
	}

	useEffect(() => {
		if (users.length !== 0) {
			users.forEach((user) => {
				if (user._id === id) {
					setEditUser(user)
					setCheckAdmin(user.role === 1 ? true : false)
				}
			})
		} else {
			history.push('/profile')
		}
	}, [users, id, history])

	const handleCheck = () => {
		setCheckAdmin(!checkAdmin)
		setNum(num + 1)
	}

	return (
		<div className='profile__page edit_user'>
			<div className='button_return'>
				<Button
					type='danger'
					onClick={() => history.goBack()}
					className='mb-2'
					style={{ backgroundColor: '#999', border: 'none' }}
				>
					Go back
				</Button>
			</div>

			<Row gutter={16}>
				<Col span={24}>
					<Form layout='vertical' onFinish={handleSubmit}>
						<Row gutter={16}>
							<Col xs={24}>
								<Form.Item label='Email:' className='mb-1'>
									<Input
										type='email'
										name='email'
										disabled={true}
										value={editUser.email}
									/>
								</Form.Item>
								<Form.Item label='Name:' className='mb-2'>
									<Input
										type='text'
										disabled={true}
										value={editUser.name}
									/>
								</Form.Item>
								<Form.Item>
									<Checkbox
										name='role'
										defaultChecked={
											editUser.role === 1 ? true : false
										}
										checked={checkAdmin}
										onChange={handleCheck}
									/>{' '}
									isAdmin
								</Form.Item>
								<Form.Item>
									<Button type='primary' htmlType='submit'>
										Update
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</div>
	)
}

export default Edituser
