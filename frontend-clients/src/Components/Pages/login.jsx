import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		// mock login
		navigate('/profile')
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type="submit">Sign In</button>
			</form>
			<p>
				No account? <Link to="/register">Register</Link>
			</p>
		</div>
	)
}

export default Login

