import { useAuth } from '@/components/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { setUsers } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  // ----------------------------------------

  // ----------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setError('')

    // Prepare the data
    const loginData = {
      email,
      password,
    }

    try {
      // Send a POST request to the login endpoint
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        }
      )

      if (!response.ok) {
        const message = await response.json()
        setError(message.error || 'Failed to log in. Please try again.')
        console.error('Error:', message.error)
        return
      }

      const data = await response.json()
      console.log('data', data)
      const token = Cookies.set('userToken', data.token)

      if (token) {
        setUsers(data.user)
        navigate('/dashboard')
      }
      // console.log('Login successful:', data)
    } catch (err) {
      console.error('An error occurred:', err)
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
