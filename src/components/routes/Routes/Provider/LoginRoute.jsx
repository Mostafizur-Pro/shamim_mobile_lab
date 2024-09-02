import { useAuth } from '@/components/context/AuthContext'
import useUser from '@/components/hooks/useUser'
import { Navigate, useLocation } from 'react-router-dom'

const LoginRoute = ({ children }) => {
  const { users, loading } = useAuth()
  const [isUser, isUserLoading] = useUser(users?.email)
  const location = useLocation()

  if (loading || isUserLoading) {
    return children
  }

  //   if (users && isUser) {
  //     return <p>Loading....</p>
  //   }

  return <Navigate to="/dashboard" state={{ from: location }} replace />
}

export default LoginRoute
