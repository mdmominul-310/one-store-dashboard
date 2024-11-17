
import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth()
    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        <div>{children}</div>
    )
}
