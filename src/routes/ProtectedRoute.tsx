import type { ReactNode } from 'react'
import { Navigate } from "react-router"

type ProtectedRouteProps = {
  children: ReactNode
  redirectPath?: string
  requiredRole?: number | number[]
  fallbackPath?: string
}

// ฟังก์ชันสำหรับตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือไม่
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token')
  return !!token
}

// ฟังก์ชันสำหรับดึงข้อมูล user จาก localStorage
export const getCurrentUser = () => {
  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      return JSON.parse(userData)
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  }
  return null
}

// ฟังก์ชันสำหรับตรวจสอบ role
export const hasRole = (requiredRole: number | number[]): boolean => {
  const user = getCurrentUser()
  if (!user || !user.role) return false
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role)
  }
  
  return user.role === requiredRole
}

const ProtectedRoute = ({ 
    children, 
    redirectPath = '/login',
    requiredRole,
    fallbackPath = '/' 
}: ProtectedRouteProps) => {
    
    // ตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือไม่
    if (!isAuthenticated()) {
        return <Navigate to={redirectPath} />
    }
    
    // ถ้ามีการกำหนด role ให้ตรวจสอบ role
    if (requiredRole !== undefined) {
        if (!hasRole(requiredRole)) {
            return <Navigate to={fallbackPath} />
        }
    }
    
    return <>{children}</>
}

export default ProtectedRoute
