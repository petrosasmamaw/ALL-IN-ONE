import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		// mock register
		navigate('/login')
	}

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Name</label>
					<input value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				<div>
					<label>Email</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<button type="submit">Create Account</button>
			</form>
		</div>
	)
}

export default Register

