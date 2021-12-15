import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {
	showErrorMsg,
	showSuccessMsg,
} from '../../utils/notification/Notification'

const Edituser = () => {
	const { id } = useParams()
	console.log(id)

	const history = useHistory()
	console.log(history)

	const [editUser, setEditUser] = useState([])

	const users = useSelector((state) => state.users)
	const token = useSelector((state) => state.token)

	const [checkAdmin, setCheckAdmin] = useState(false)
	const [num, setNum] = useState(0)

	return <div className='profile__page'></div>
}

export default Edituser
