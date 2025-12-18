import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './Components/Pages/navbar'
import AllChat from './Components/Pages/allChat'
import ItemChat from './Components/Pages/itemChat'
import Login from './Components/Pages/login'
import Register from './Components/Pages/register'
import Profile from './Components/Pages/profile'
import Shop from './Components/Pages/shop'
import ShopDetail from './Components/Pages/shopDetail'

const App = () => {
    const dispatch = useDispatch()
    const { user, status } = useSelector((s) => s.auth)
    // normalize user object: some responses may nest user under `user` key
    const currentUser = user?.user || user || null
    const userId = currentUser?.id || null
    const isAuthenticated = !!currentUser && status === 'succeeded'
  return (
    <BrowserRouter>
      <Navbar user={currentUser} userId={userId} status={status} />
      <div style={{ padding: 12 }}>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Shop user={currentUser} userId={userId} />} />
              <Route path="/shop" element={<Shop user={currentUser} userId={userId} />} />
              <Route path="/shop/:id" element={<ShopDetail user={currentUser} userId={userId} />} />
              <Route path="/chats" element={<AllChat user={currentUser} userId={userId} />} />
              <Route path="/chats/:id" element={<ItemChat user={currentUser} userId={userId} />} />
              <Route path="/profile" element={<Profile user={currentUser} userId={userId} />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
