import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
	const shops = [
		{ id: 'a1', name: 'Dashboard 1' },
		{ id: 'b2', name: 'Dashboard 2' },
	]

	return (
		<div>
			<h2>Dashboard</h2>
			<ul>
				{shops.map((s) => (
					<li key={s.id}>
						<Link to={`/dashboard/${s.id}`}>{s.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Dashboard

