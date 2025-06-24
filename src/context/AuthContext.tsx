'use client'

import { User } from "@/types/User"
import { createContext, ReactNode, useEffect, useState } from "react"

interface AuthContextValue {
    currentUser: User | null
    token: string | null
    login: (userToken: string | null, userInfo: User | null) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextValue>({
    currentUser: null,
    token: null,
    login: () => {},
    logout: () => {}
})

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const existingUser = localStorage.getItem('currentUser')
        return existingUser ? JSON.parse(existingUser) : null
    })
    const [token, setToken] = useState(() => window.localStorage.getItem('authToken'))

    const login = (userToken: string | null, userInfo: User | null) => {
    if (userToken && userInfo) {
    setToken(userToken)
    setCurrentUser(userInfo)
    window.localStorage.setItem('authToken', userToken)
    window.localStorage.setItem('currentUser', JSON.stringify(userInfo))
    }
  }

  const logout = () => {
    setToken(null)
    setCurrentUser(null)
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('currentUser')
  }

    return (
        <AuthContext.Provider value={{currentUser, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}