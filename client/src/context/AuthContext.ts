import React from 'react'

export interface User {
  id: string
  username: string
  permissions?: string[]
  roles?: string[]
}

type AuthContext = {
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = React.createContext({} as AuthContext)


export default AuthContext
