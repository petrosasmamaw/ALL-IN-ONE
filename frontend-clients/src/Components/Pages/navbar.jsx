import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
			<Link to="/">Home</Link> | <Link to="/shop">Shops</Link> | <Link to="/chats">Chats</Link> |{' '}
			<Link to="/profile">Profile</Link> | <Link to="/login">Login</Link>
		</nav>
	)
}

export default Navbar

