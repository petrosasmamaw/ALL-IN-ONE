import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Pages/navbar'
import AllChat from './Components/Pages/allChat'
import ItemChat from './Components/Pages/itemChat'
import Login from './Components/Pages/login'
import Register from './Components/Pages/register'
import Profile from './Components/Pages/profile'
import Shop from './Components/Pages/shop'
import ShopDetail from './Components/Pages/shopDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopDetail />} />
          <Route path="/chats" element={<AllChat />} />
          <Route path="/chats/:id" element={<ItemChat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
