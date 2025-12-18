import React from 'react'
import { Link } from 'react-router-dom'

const AllChat = () => {
	const chats = [
		{ id: '1', title: 'Chat with Seller A' },
		{ id: '2', title: 'Chat with Seller B' },
	]

	return (
		<div>
			<h2>All Chats</h2>
			<ul>
				{chats.map((c) => (
					<li key={c.id}>
						<Link to={`/chats/${c.id}`}>{c.title}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default AllChat

