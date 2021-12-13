import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'
import { Result, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const ActivateEmail = () => {
	const { activation_token } = useParams()

	useEffect(() => {
		if (activation_token) {
			const activationEmail = async () => {
				try {
					const res = await axios.post('/user/activate', {
						activation_token,
					})
					showSuccessMsg(res.data.msg)
				} catch (err) {
					err.response.data.msg && showErrorMsg(err.response.data.msg)
				}
			}
			activationEmail()
		}
	}, [activation_token])

	return (
		<div className='active_page'>
			<Result
				icon={<SmileOutlined />}
				title='Account has been activated!'
				extra={
					<Button type='primary'>
						<Link to='/login'>Login</Link>
					</Button>
				}
			/>
			,
		</div>
	)
}

export default ActivateEmail
