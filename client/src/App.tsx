import { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css'

import { DashboardView, LandingView, LoginView, NotFoundView, RegisterView, PanelView } from './views/index.ts';
import { Navbar } from './components'

import AuthContext, { User } from './context/AuthContext.ts';
import ProtectedRoute from './components/ProtectedRoute.tsx';


function App() {
  /*
    <Navigate to="/login" /> se usa para componentes.
    useNavigate() se usa para funciones. 
  */
 const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext)

  const userValue: User = {
    id: '1',
    username: 'chris',
    permissions: ['panel']
  }

  const handleLogout = () => setUser(null)

  return (
    <>
      <Navbar />
      {
        user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate('/login')}>Login</button>
        )
      }
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route 
          path="/login"
          element={
            <ProtectedRoute
              isAllowed={!user}
              redirectPath="/dashboard"
            >
              <LoginView />
            </ProtectedRoute>

          } 
        />
        <Route 
          path="/register"
          element={
            <ProtectedRoute
              isAllowed={!user}
              redirectPath="/dashboard"
            >
              <RegisterView />
            </ProtectedRoute>

          } 
        />
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute
              isAllowed={!!user}
              redirectPath="/login"
            >
              <DashboardView />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/panel"
          element={
            <ProtectedRoute
              isAllowed={!!user && user?.permissions?.includes('panel')}
              redirectPath="/dashboard"
            >
              <PanelView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </>
  )
}

export default App
