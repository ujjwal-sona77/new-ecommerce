import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import CreateProduct from './components/CreateProduct.jsx'
import AdminAuth from './components/AdminProtected.jsx'
import Profile from './components/Profile.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import EditUser from './components/EditUser.jsx'
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/shop" element={<Home />} />
                    <Route path="/user/profile" element={<Profile />} />
                    <Route element={<AdminAuth />}>
                        <Route path="/create/product" element={<CreateProduct />} />
                        <Route path='/admin/dashboard' element={<AdminDashboard />} />
                        <Route path='/admin/edit/user' element={<EditUser />} />
                    </Route>
                </Route>
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
