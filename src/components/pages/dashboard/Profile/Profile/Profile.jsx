import { useAuth } from '@/components/context/AuthContext'
import UserEdit from '../../user/UserList/Action/userEdit'

const ProfilePage = () => {
  const { users } = useAuth()

  if (!users || users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <svg
          className="w-8 h-8 text-indigo-600 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8H4z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center md:space-x-6">
          <img
            src={users.image}
            alt={users.name}
            className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow-md"
          />
          <div className="mt-4 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-800">{users.name}</h1>
            <p className="text-lg text-gray-600">{users.email}</p>
            <p className="text-sm text-gray-500">{users.number}</p>
          </div>
        </div>
        <div>
          {' '}
          <UserEdit user={users} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Account Details
        </h2>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-sm text-gray-600">
              <strong className="font-medium">Role:</strong> {users.role}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="font-medium">Account Status:</strong>{' '}
              {users.action}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="font-medium">Created At:</strong>{' '}
              {new Date(users.created_at).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="font-medium">Updated At:</strong>{' '}
              {new Date(users.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
