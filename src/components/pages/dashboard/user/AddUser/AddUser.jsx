import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '@/components/context/AuthContext'

const AddUser = () => {
  const { users } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior

    if (!name || !number || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError('')

    const userData = {
      name,
      number,
      email,
      password,
      role: 'user',
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const message = await response.json()
        setError(message.error || 'Failed to sign up. Please try again.')
        console.error('Error:', message.error)
        return
      }

      console.log('User created successfully')
      navigate('/login')

      // Optionally redirect or clear the form
    } catch (err) {
      console.error('An error occurred:', err)
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>
        {users && users.role === 'admin' && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="number">Number</Label>
                <Input
                  type="text"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter your number"
                  required
                />
              </div>
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
              <div className="mb-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Sign Up
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default AddUser
