import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
	const shops = [
		{ id: 'a1', name: 'profile A' },
		{ id: 'b2', name: 'profile B' },
	]

	return (
		<div>
			<h2>Profiles</h2>
			<ul>
				{shops.map((s) => (
					<li key={s.id}>
						<Link to={`/profile/${s.id}`}>{s.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Profile

