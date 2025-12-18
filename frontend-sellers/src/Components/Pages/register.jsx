import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearAuthError } from '../Slice/authSlice'

const SellersRegister = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, status, error } = useSelector((s) => s.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password) return
    if (password !== confirm) return
    dispatch(registerUser({ name, email, password }))
  }

  useEffect(() => {
    if (user) navigate('/profile')
    return () => { dispatch(clearAuthError()) }
  }, [user, navigate, dispatch])

  return (
    <div className="auth-page sellers">
      <div className="auth-card">
        <h2 className="auth-title">Create seller account</h2>
        <p className="auth-sub">Start selling your products</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input className="auth-input" placeholder="Shop or full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input className="auth-input" type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <button className="btn primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Creating...' : 'Create Account'}</button>
        </form>
        <div className="auth-footer">
          <p>Already selling? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SellersRegister
