import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FaEye } from 'react-icons/fa'

const UserView = ({ user }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <div className="text-green-600 text-xl">
              <FaEye />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              User Details
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
            <div className="flex flex-col">
              <p className="font-medium text-gray-700">Name:</p>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-gray-700">Role:</p>
              <p className="text-gray-900">{user.role}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-gray-700">Number:</p>
              <p className="text-gray-900">{user.number}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-gray-700">Email:</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UserView
