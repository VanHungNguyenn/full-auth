import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, Input, Button, Table, Upload } from 'antd'
import { columns, dataTable } from './data'

import { UploadOutlined } from '@ant-design/icons'

const initialState = {
	name: '',
	password: '',
	confirmPassword: '',
}

const Profile = () => {
	const auth = useSelector((state) => state.auth)
	const token = useSelector((state) => state.token)

	const { user, isAdmin } = auth
	console.log(user)

	const [data, setData] = useState(initialState)

	const { name, password, confirmPassword } = data

	const [avatar, setAvatar] = useState(false)
	const [loading, setLoading] = useState(false)
	const [callback, setCallback] = useState(false)

	const handleSubmit = () => {}
	return (
		<>
			<div className='profile__page'>
				<Row gutter={[8, 16]}>
					<Col md={8} span={24}>
						<Card
							title={isAdmin ? 'Admin Profile' : 'User Profile'}
							style={{ width: '100%' }}
						>
							<div className='profile__avatar'>
								<img
									src={avatar ? avatar : user.avatar}
									alt='avatar'
									style={{
										maxWidth: 200,
										width: '100%',
										borderRadius: '50%',
										border: '1px solid #ccc',
									}}
								/>
								<Upload>
									<Button icon={<UploadOutlined />}>
										Upload
									</Button>
								</Upload>
							</div>
							<h2
								className='profile__name'
								style={{ fontStyle: 'italic' }}
							>
								{user.name}
							</h2>
							<Row gutter={16}>
								<Col span={24}>
									<Form
										layout='vertical'
										onFinish={handleSubmit}
									>
										<Row gutter={16}>
											<Col xs={24}>
												<Form.Item
													label='Email:'
													name='email'
													className='mb-1'
												>
													<Input
														type='email'
														name='email'
														id='email'
														value={user.email}
														disabled={true}
													/>
												</Form.Item>
												<Form.Item
													label='Name:'
													name='name'
													className='mb-1'
													rules={[
														{
															required: true,
															message:
																'Please input your name!',
														},
													]}
												>
													<Input
														type='text'
														name='name'
														id='name'
														placeholder='Your name..'
													/>
												</Form.Item>
												<Form.Item
													label='New Password:'
													name='password'
													className='mb-1'
													rules={[
														{
															required: true,
															message:
																'Please input your password!',
														},
													]}
												>
													<Input
														type='password'
														name='password'
														id='password'
														placeholder='Your password..'
													/>
												</Form.Item>
												<Form.Item
													label='Confirm Password:'
													name='confirmPassword'
													className='mb-1'
													rules={[
														{
															required: true,
															message:
																'Please input your confirm password!',
														},
													]}
												>
													<Input
														type='password'
														name='confirmPassword'
														id='confirmPassword'
														placeholder='Your confirm password..'
													/>
												</Form.Item>
												<Form.Item className='mb-1'>
													<p
														style={{
															fontSize: '12px',
															color: 'red',
														}}
													>
														* If you update your
														password here, you will
														not be able to login
														quickly using google and
														facebook.
													</p>
												</Form.Item>

												<Form.Item>
													<Button
														type='primary'
														htmlType='submit'
														size='large'
													>
														Update
													</Button>
												</Form.Item>
											</Col>
										</Row>
									</Form>
								</Col>
							</Row>
						</Card>
					</Col>
					<Col md={16} span={24}>
						<Table
							title={() => 'Users'}
							columns={columns}
							bordered={true}
							dataSource={dataTable}
						/>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Profile
