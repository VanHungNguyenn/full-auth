import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/vanhunglogo.png'

const Header = () => {
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
					<li>
						<Link to='/login'>
							<i className='fas fa-user'></i> Sign in
						</Link>
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header
