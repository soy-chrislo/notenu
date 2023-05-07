import './App.css'
import { Navbar } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardView, LandingView, LoginView, NotFoundView, RegisterView } from './views/index.ts';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  )
}

export default App
