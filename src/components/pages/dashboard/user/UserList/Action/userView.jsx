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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-green-600 hover:bg-green-50">
          <FaEye className="text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl p-8 bg-white rounded-lg shadow-lg transition-transform transform">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-gray-800 mb-4">
            User Details
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <img
              src={
                user?.image ===
                'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png'
                  ? user?.image
                  : `${
                      import.meta.env.VITE_LOCAL_API_URL
                    }/api/v1/images/uploads/${user?.image}`
              }
              alt={user?.name}
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md"
            />
          </div>
          {/* User Details Section */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex flex-col">
              <p className="font-medium text-gray-900">Name:</p>
              <p className="text-sm text-gray-600">{user.name}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-gray-900">Role:</p>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-gray-900">Number:</p>
              <p className="text-sm text-gray-600">{user.number}</p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-gray-900">Email:</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserView
