import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  // Se hace la validacion desde el componente donde, si hay usuario y se cumple cierta condicion con el objeto usuario, retorna true y se renderiza el componente.
  // user: User | null,
  isAllowed?: boolean,
  redirectPath?: string,
  children: React.ReactNode
}

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }: ProtectedRouteProps): JSX.Element => {
  if (!isAllowed){
    return <Navigate to={redirectPath} replace />
  }
  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute