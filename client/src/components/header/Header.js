import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/vanhunglogo.png'
import { useSelector } from 'react-redux'
import { Avatar, Image, Dropdown, Menu, Space, Button } from 'antd'
import axios from 'axios'

const handleLogout = async () => {
	try {
		await axios.get('/user/logout')
		localStorage.removeItem('firstLogin')
		window.location.href = '/'
	} catch (err) {
		window.location.href = '/'
	}
}

const menu = (
	<Menu>
		<Menu.Item key='1'>
			<Button type='default' onClick={handleLogout}>
				<Link to='/'>
					<Space>
						<i className='fas fa-sign-out-alt'></i>
						Logout
					</Space>
				</Link>
			</Button>
		</Menu.Item>
	</Menu>
)

const AppHeader = () => {
	const auth = useSelector((state) => state.auth)

	const { user, isLogged } = auth

	const image = user.avatar

	const userLink = () => {
		return (
			<>
				<li>
					{' '}
					<Link to='/profile'>
						<i className='fas fa-user'></i>
						Profile
					</Link>
				</li>
				<li>
					<Dropdown
						arrow={true}
						overlay={menu}
						placement='bottomRight'
					>
						<Link to='#' className='header__avatar'>
							<Avatar
								src={
									<Image
										preview={false}
										src={image}
										style={{ width: 32 }}
									/>
								}
								style={{
									border: '1px solid #fff',
									opacity: '.7',
								}}
							/>
							{'  '}
							<span>{user.name}</span>
						</Link>
					</Dropdown>
				</li>
			</>
		)
	}

	return (
		<header>
			<div className='main__container'>
				<div className='logo'>
					<Link to='/'>
						<img src={Logo} alt='logo' />
					</Link>
				</div>
				<ul>
					{isLogged ? (
						userLink()
					) : (
						<>
							<li>
								<Link to='/register'>
									<i className='fas fa-file-signature'></i>
									Register
								</Link>
							</li>
							<li>
								<Link to='/login'>
									<i className='fas fa-user'></i> Login
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</header>
	)
}

export default AppHeader
