import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getCurrentUser } from '../api/auth'

interface User {
    _id: string
    username: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((currentUser) => setUser(currentUser))
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}