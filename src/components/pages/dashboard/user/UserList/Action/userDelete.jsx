import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'

const UserDelete = ({ isOpen, onClose, user }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await axios.delete(
        `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/user/${user.id}`
      )

      window.location.reload()
    } catch (error) {
      console.error('Failed to delete the product:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button>
          <div className="text-red-600 text-xl">
            <FaTrashAlt />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete {user.name}?</p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
          <Button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UserDelete
