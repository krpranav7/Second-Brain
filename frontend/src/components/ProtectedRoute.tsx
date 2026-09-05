import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader } from './ui/Loader'

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (!user) {
        return <Navigate to='/login' replace />
    }

    return <>{children}</>
}