import React from 'react'
import { useParams } from 'react-router-dom'

const ShopDetail = () => {
	const { id } = useParams()

	return (
		<div>
			<h2>Shop Detail</h2>
			<p>Showing details for shop <strong>{id}</strong>.</p>
			<p>This is placeholder content — replace with API-driven shop info.</p>
		</div>
	)
}

export default ShopDetail

