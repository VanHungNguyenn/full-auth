import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
	Row,
	Col,
	Card,
	Form,
	Input,
	Button,
	Table,
	Space,
	Tooltip,
	Spin,
} from 'antd'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'
import { isLength, isMatch } from '../../utils/validation/Validation'
import {
	fetchAllUsers,
	dispatchGetAllUsers,
} from '../../../redux/actions/usersActions'

const initialState = {
	name: '',
	password: '',
	confirmPassword: '',
}

const Profile = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const auth = useSelector((state) => state.auth)
	const token = useSelector((state) => state.token)
	const users = useSelector((state) => state.users)

	const newUsers = []
	users.forEach((user) => {
		newUsers.push({ ...user, key: user._id })
	})

	const { user, isAdmin } = auth

	const [data, setData] = useState(initialState)

	const { name, password, confirmPassword } = data

	const [avatar, setAvatar] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (isAdmin) {
			return fetchAllUsers(token).then((res) => {
				dispatch(dispatchGetAllUsers(res))
			})
		}
	}, [token, isAdmin, dispatch])

	const handleDelete = async (id) => {
		try {
			if (user._id !== id) {
				if (
					window.confirm(
						'Are you sure you want to delete this account?'
					)
				) {
					setLoading(true)
					await axios.delete(`/user/delete/${id}`, {
						headers: {
							Authorization: token,
						},
					})
					setLoading(false)

					history.push('/profile')
				} else {
					history.push('/profile')
				}
			} else {
				showErrorMsg("Can't delete myselt")
				history.push('/profile')
			}
		} catch (err) {
			err.response.data.msg && showErrorMsg(err.response.data.msg)
		}
	}

	const columnsOrders = [
		{
			title: 'Id',
			dataIndex: '_id',
			key: '_id',
			ellipsis: true,
			width: '120px',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'Note',
			dataIndex: 'note',
			key: 'note',
		},
	]

	const columns = [
		{
			title: 'Id',
			dataIndex: '_id',
			key: '_id',
			ellipsis: true,
			width: '120px',
		},
		{
			title: 'Admin',
			dataIndex: 'role',
			key: 'role',
			render: (boolean) =>
				boolean ? (
					<i className='fas fa-check'></i>
				) : (
					<i className='fas fa-times'></i>
				),
			width: '80px',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			width: '130px',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			ellipsis: true,
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',

			width: '120px',
			render: (text, record, i) => (
				<Space>
					<Tooltip title='Edit'>
						<Button type='primary'>
							<Link to={`/edit_user/${record._id}`}>
								<i className='fas fa-edit'></i>
							</Link>
						</Button>
					</Tooltip>
					<Tooltip title='Delete'>
						<Button
							type='danger'
							onClick={() => handleDelete(record._id)}
						>
							<Link to={`/delete_user/${record._id}`}>
								<i className='fas fa-trash'></i>
							</Link>
						</Button>
					</Tooltip>
				</Space>
			),
		},
	]

	const handleChange = (e) => {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
	}

	const updateInfor = () => {
		try {
			axios.patch(
				'/user/update',
				{
					name: name ? name : user.name,
					avatar: avatar ? avatar : user.avatar,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)

			showSuccessMsg('Update successfully!')
		} catch (err) {
			setData({ ...data })
			showErrorMsg(err.response.data.msg)
		}
	}

	const updatePassword = () => {
		try {
			if (isLength(password)) {
				return showErrorMsg('Password must be at least 6 characters.')
			}
			// Check password match confirmPassword?
			if (!isMatch(password, confirmPassword)) {
				return showErrorMsg('Password did not match.')
			}
			axios.post(
				'/user/reset',
				{
					password,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)

			showSuccessMsg('Password successfully changed!')
		} catch (err) {
			setData({ ...data })
			showErrorMsg(err.response.data.msg)
		}
	}

	const handleSubmit = ({ password }) => {
		console.log(password)
		if (name || avatar) updateInfor()
		if (password) updatePassword(password)
	}

	const changeAvatar = async (e) => {
		try {
			const file = e.target.files[0]
			if (!file) return showErrorMsg('No files were uploaded')
			if (file.size > 1024 * 1024) return showErrorMsg('Size to large')
			if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
				return showErrorMsg('File format is incorrect.')
			}

			let formData = new FormData()
			formData.append('file', file)
			setLoading(true)
			const res = await axios.post('/api/upload_avatar', formData, {
				headers: {
					Authorization: token,
					'content-type': 'multipart/form-data',
				},
			})
			setLoading(false)
			setAvatar(res.data.url)
		} catch (err) {
			showErrorMsg(err.response.data.msg)
		}
	}
	return (
		<>
			{loading ? (
				<div className='spin'>
					<Spin tip='Loading...' size='large' />
				</div>
			) : (
				<div className='profile__page'>
					<Row gutter={[8, 16]}>
						<Col md={8} span={24}>
							<Card
								title={
									isAdmin ? 'Admin Profile' : 'User Profile'
								}
								style={{ width: '100%' }}
							>
								<div className='profile__avatar'>
									<img
										src={avatar ? avatar : user.avatar}
										alt='avatar'
										className='mb-2'
									/>
									<span>
										<i className='fas fa-camera'></i>
										<p>Change</p>
										<input
											type='file'
											name='file'
											id='file_up'
											onChange={changeAvatar}
										/>
									</span>
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
														className='mb-1'
													>
														<Input
															type='email'
															name='email'
															id='email'
															disabled={true}
															value={user.email}
														/>
													</Form.Item>
													<Form.Item
														label='Name:'
														name='name'
														className='mb-1'
													>
														<Input
															type='text'
															name='name'
															id='name'
															placeholder='Your name..'
															onChange={
																handleChange
															}
															value={name}
														/>
													</Form.Item>
													<Form.Item
														label='New Password:'
														name='password'
														className='mb-1'
													>
														<Input
															type='password'
															name='password'
															id='password'
															placeholder='Your password..'
															onChange={
																handleChange
															}
															value={password}
														/>
													</Form.Item>
													<Form.Item
														label='Confirm Password:'
														name='confirmPassword'
														className='mb-1'
													>
														<Input
															type='password'
															name='confirmPassword'
															id='confirmPassword'
															placeholder='Your confirm password..'
															onChange={
																handleChange
															}
															value={
																confirmPassword
															}
														/>
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
							{user.role === 1 ? (
								<Table
									title={() => 'Users'}
									columns={columns}
									bordered={true}
									dataSource={newUsers}
									scroll={{ x: 500 }}
								/>
							) : (
								<Table
									title={() => 'Orders'}
									columns={columnsOrders}
									bordered={true}
									scroll={{ x: 500 }}
								/>
							)}
						</Col>
					</Row>
				</div>
			)}
		</>
	)
}

export default Profile
