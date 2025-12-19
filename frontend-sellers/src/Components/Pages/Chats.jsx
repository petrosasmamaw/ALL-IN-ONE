import React from 'react'
import { Link } from 'react-router-dom'

const Chats = () => {
	const shops = [
		{ id: 'a1', name: 'chat A' },
		{ id: 'b2', name: 'chat B' },
	]

	return (
		<div>
			<h2>Chats</h2>
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

export default Chats

