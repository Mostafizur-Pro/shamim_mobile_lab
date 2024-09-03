import { useAuth } from '@/components/context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const { users } = useAuth()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    const id = users.id

    const requestData = {
      id, // You might want to replace this with dynamic data if needed
      currentPassword: oldPassword,
      newPassword: newPassword,
    }
    console.log('data', requestData)

    try {
      const response = await fetch(
        'http://localhost:3000/api/v1/auth/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      )

      if (!response.ok) {
        throw new Error('Password change failed. Please try again.')
      }

      const result = await response.json()
      setSuccess('Password changed successfully!')
      if (result) {
        navigate('/dashboard/profile/profile')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-600"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {success && <p className="mt-4 text-green-600">{success}</p>}
    </div>
  )
}

export default ChangePassword
