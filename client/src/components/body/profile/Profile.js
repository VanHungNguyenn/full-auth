import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Typography, Image } from 'antd'
const { Title } = Typography
const initialState = {
	name: '',
	password: '',
	confirmPassword: '',
}

const style = { background: '#0092ff', padding: '8px 0' }

const Profile = () => {
	return (
		<>
			<div className='profile__page'>
				<Row gutter={[8, 16]}>
					<Col md={6} span={24}>
						<div style={style}>col-6</div>
					</Col>
					<Col md={18} span={24}>
						<div style={style}>col-18</div>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Profile
