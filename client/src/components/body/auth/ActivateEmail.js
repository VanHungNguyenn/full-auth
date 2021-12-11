import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'

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

	return <div className='active_page'></div>
}

export default ActivateEmail
