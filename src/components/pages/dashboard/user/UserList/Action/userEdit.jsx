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
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/user/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      if (!response.ok) {
        throw new Error('Failed to update product')
      }
      // Handle successful update and reload the page
      window.location.reload()
    } catch (error) {
      console.error('Error updating product:', error)
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
          <div className="grid grid-cols-2 gap-4 py-4">
            {Object.keys(formData)
              .filter(
                (key) =>
                  !['receive_date', 'delivery_date', 'status'].includes(key)
              )
              .map((key) => (
                <div key={key} className="">
                  <Label htmlFor={key} className="text-right uppercase">
                    {key.replace('_', ' ')}
                  </Label>
                  <Input
                    id={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button
              type="button" // Changed from 'submit' to 'button' since it's not within a form element
              className="bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handleSaveChanges}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserEdit
