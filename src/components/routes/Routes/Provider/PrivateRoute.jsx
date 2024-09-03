import { useAuth } from '@/components/context/AuthContext'
import useUser from '@/components/hooks/useUser'
import { Link, Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { users } = useAuth()
  const [isUser, isUserLoading] = useUser(users?.email)
  const location = useLocation()
  // console.log('data', users, isUser)

  if (!isUser && isUserLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            You need to be logged in to access this page.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Go to Login Page
          </Link>
        </div>
      </div>
    )
  }

  if (users) {
    return children
  }

  return <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute
