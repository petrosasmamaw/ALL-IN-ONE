import React from 'react'
import { Link } from 'react-router-dom'

const Sellers = () => {
	const shops = [
		{ id: 'a1', name: 'Seller A' },
		{ id: 'b2', name: 'Seller B' },
	]

	return (
		<div>
			<h2>sellers</h2>
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

export default Sellers

