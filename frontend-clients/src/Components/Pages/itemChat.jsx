import React from 'react'
import { useParams } from 'react-router-dom'

const ItemChat = () => {
	const { id } = useParams()

	return (
		<div>
			<h2>Chat: {id}</h2>
			<div>
				<p>This is a placeholder for the chat messages for chat id {id}.</p>
			</div>
		</div>
	)
}

export default ItemChat

