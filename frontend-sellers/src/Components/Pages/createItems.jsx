import React from 'react'
import { Link } from 'react-router-dom'

const CreateItems = () => {
	const shops = [
		{ id: 'a1', name: 'create item A' },
		{ id: 'b2', name: 'create item B' },
	]

	return (
		<div>
			<h2>Items</h2>
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

export default CreateItems

