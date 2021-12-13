import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/vanhunglogo.png'
import { useSelector } from 'react-redux'
import axios from 'axios'

const AppHeader = () => {
	const auth = useSelector((state) => state.auth)

	const { user, isLogged } = auth

	const userLink = () => {
		return (
			<li>
				<Link to='/'>
					<img src={user.avatar} alt='avatar' /> {user.name}
				</Link>
			</li>
		)
	}

	return (
		<header>
			<div className='header__container'>
				<div className='logo'>
					<Link to='/'>
						<img src={Logo} alt='logo' />
					</Link>
				</div>
				<ul>
					<li>
						<Link to='/'>
							<i className='fas fa-shopping-cart'></i> Cart
						</Link>
					</li>
					{isLogged ? (
						userLink()
					) : (
						<li>
							<Link to='/login'>
								<i className='fas fa-user'></i> Sign in
							</Link>
						</li>
					)}
				</ul>
			</div>
		</header>
	)
}

export default AppHeader
