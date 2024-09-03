import { useAuth } from '@/components/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

const UserEdit = ({ user }) => {
  const { users } = useAuth()
  const [formData, setFormData] = useState({
    name: user.name,
    number: user.number,
    email: user.email,
    role: user.role,
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/users/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      // Handle successful update, show a success message, or reload the page
      alert('User updated successfully')
      window.location.reload() // Refresh the page or use state management to update UI
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Error updating user. Please try again.')
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <div className="text-blue-600 text-xl">
              <FaEdit />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            {Object.keys(formData)
              .filter(
                (key) =>
                  key !== 'receive_date' &&
                  key !== 'delivery_date' &&
                  key !== 'status'
              )
              .map((key) => (
                <div key={key} className="flex flex-col">
                  <Label
                    htmlFor={key}
                    className="text-sm font-medium text-gray-700"
                  >
                    {key.replace('_', ' ').toUpperCase()}
                  </Label>
                  {key === 'role' ? (
                    <div>
                      {users && users.role === 'admin' && (
                        <>
                          <select
                            id={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </>
                      )}
                    </div>
                  ) : (
                    <Input
                      id={key}
                      value={formData[key]}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  )}
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserEdit
