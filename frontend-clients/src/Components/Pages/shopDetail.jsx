import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsBySellerId } from '../Slice/itemSlice'
import { createIds } from '../Slice/idSlice'

const ShopDetail = ({userId}) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state) => state.items.items || [])
  const status = useSelector((state) => state.items.status)

  useEffect(() => {
    if (id) dispatch(fetchItemsBySellerId(id))
  }, [dispatch, id])

  return (
    <div className="container">
      <h2>Shop</h2>
      {status === 'loading' && <div className="nav-loading">Loading items...</div>}

      <div className="shop-detail-grid">
        {items.length === 0 && <div>No items for this shop</div>}

        {items.map((it) => (
          <div className="shop-item-card" key={it._id}>
            <div className="shop-item-thumb">
              {it.image ? <img src={it.image} alt={it.name} /> : <div className="shop-item-placeholder">{it.name?.charAt(0)}</div>}
            </div>
            <div className="shop-item-body">
              <div className="shop-item-title">{it.name}</div>
              <div className="shop-item-desc">{it.description || 'No description'}</div>
              <div className="shop-item-meta">{it.category} • ${it.price}</div>
              <div className="shop-item-actions">
                <button
                  className="nav-btn"
                  onClick={async () => {
                    if (!userId) {
                      alert('Please login to start chat')
                      return
                    }
                    try {
                      const payload = await dispatch(createIds({ itemId: it._id, sellerId: it.sellerId || id, clientId: userId })).unwrap()
                      navigate(`/chats/${payload._id}`)
                    } catch (err) {
                      console.error(err)
                      alert('Failed to create chat')
                    }
                  }}
                >
                  Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopDetail


