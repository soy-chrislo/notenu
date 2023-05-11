import './App.css'
import { useEffect, useState } from 'react';
import { Navbar } from './components'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { DashboardView, LandingView, LoginView, NotFoundView, RegisterView, PanelView } from './views/index.ts';

// TODO: Buscar como hacer correctamente el enrutado privado incluyendo la verificacion de token y la redireccion.

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/panel" element={<PanelView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  )
}

export default App
