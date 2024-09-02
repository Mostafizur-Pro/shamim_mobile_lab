import axios from 'axios'
import Cookies from 'js-cookie'
import { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [users, setUsers] = useState(null)

  const userToken = Cookies.get('userToken')

  useEffect(() => {
    const fetchUserProfile = async (userToken) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )

        return response.data.user
      } catch (error) {
        console.error('Error fetching user profile:', error)
        throw error
      }
    }

    if (userToken) {
      fetchUserProfile(userToken)
        .then((user) => {
          setUserData(user.id)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error:', error)
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [userToken])

  useEffect(() => {
    const fetchUsers = async () => {
      if (userData) {
        try {
          const url = `${
            import.meta.env.VITE_LOCAL_API_URL
          }/api/v1/users/${userData}`
          const response = await fetch(url)

          if (response.ok) {
            const data = await response.json()
            setUsers(data.data)
          } else {
            console.error('Failed to fetch users:', response.statusText)
          }
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }
    }

    fetchUsers()
  }, [userData])

  const login = (userToken) => {
    if (userToken) {
      Cookies.set('userToken', userToken)
      setUserData(userToken)
    }
  }

  const logout = () => {
    Cookies.remove('userToken')
    setUserData(null)
    setUsers(null)
  }

  const authInfo = {
    users,
    setUsers,
    userData,
    login,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
