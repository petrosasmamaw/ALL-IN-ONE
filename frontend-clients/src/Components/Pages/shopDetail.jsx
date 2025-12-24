import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsBySellerId } from '../Slice/itemSlice'
import { createIds } from '../Slice/idSlice'
import { fetchSellerById } from '../Slice/sellersSlice'

const ShopDetail = ({userId}) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state) => state.items.items || [])
  const status = useSelector((state) => state.items.status)
  const seller = useSelector((state) => state.sellers.seller)
  const sellerStatus = useSelector((state) => state.sellers.status)

  useEffect(() => {
    if (id) dispatch(fetchItemsBySellerId(id))
    if (id) dispatch(fetchSellerById(id))
  }, [dispatch, id])

  return (
    <div className="container">
      <h2>Shop</h2>
      {sellerStatus === 'loading' && <div className="nav-loading">Loading seller...</div>}

      {seller && (
        <div className="profile-container" style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 96, height: 96 }}>
              {seller.image ? (
                <img src={seller.image} alt={seller.name} style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 12 }} />
              ) : (
                <div style={{ width: 96, height: 96, borderRadius: 12, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{seller.name?.charAt(0)}</div>
              )}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.15rem' }}>{seller.name}</div>
              <div style={{ color: 'var(--muted)', marginTop: 6 }}>{seller.phoneNo}</div>
              <div style={{ marginTop: 8 }} className={"shop-status " + (seller.status === 'active' ? 'active' : 'inactive')}>{seller.status}</div>
            </div>
          </div>
        </div>
      )}

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopDetail


