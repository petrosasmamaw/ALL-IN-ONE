import React from 'react'

const Profile = () => {
	// placeholder; replace with real user data from store/API
	const user = { name: 'Admin User', email: 'admin@example.com' }

	return (
		<div>
			<h2>Profile</h2>
			<p>
				<strong>Name:</strong> {user.name}
			</p>
			<p>
				<strong>Email:</strong> {user.email}
			</p>
		</div>
	)
}

export default Profile

