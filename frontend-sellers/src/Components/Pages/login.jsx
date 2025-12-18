import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearAuthError } from '../Slice/authSlice'

const SellersLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, status, error } = useSelector((s) => s.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (user) navigate('/profile')
    return () => { dispatch(clearAuthError()) }
  }, [user, navigate, dispatch])

  return (
    <div className="auth-page sellers">
      <div className="auth-card">
        <h2 className="auth-title">Seller Sign in</h2>
        <p className="auth-sub">Manage your shop and listings</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <div className="auth-footer">
          <p>New seller? <Link to="/register">Create account</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SellersLogin
