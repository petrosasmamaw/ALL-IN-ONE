import React from 'react'
import { Link } from 'react-router-dom'

const Clients = () => {
	const shops = [
		{ id: 'a1', name: 'client A' },
		{ id: 'b2', name: 'client B' },
	]

	return (
		<div>
			<h2>clients</h2>
			<ul>
				{shops.map((s) => (
					<li key={s.id}>
						<Link to={`/shop/${s.id}`}>{s.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Clients

