import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // clear any auth state here if needed
    navigate('/login')
  }

  return (
    <header className="app-navbar">
      <div className="nav-brand">
        <Link to="/">MyMarket</Link>
      </div>

      <nav className="nav-links">
        <Link to="/shop" className="nav-btn">Shop</Link>
        <Link to="/profile" className="nav-btn">Profile</Link>
        <Link to="/chats" className="nav-btn">Chats</Link>
      </nav>

      <div className="nav-actions">
        <Link to="/login" className="nav-btn outline">Login</Link>
        <Link to="/register" className="nav-btn primary">Register</Link>
        <button onClick={handleLogout} className="nav-btn ghost">Logout</button>
      </div>
    </header>
  )
}

export default Navbar
