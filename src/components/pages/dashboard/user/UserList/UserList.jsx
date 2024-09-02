import { useEffect, useState } from 'react'
import DashboardTable from '@/components/core/table/DashboardTable'
import UserView from './Action/userView'
import UserDelete from './Action/userDelete'
import UserEdit from './Action/userEdit'
import { useAuth } from '@/components/context/AuthContext'

// Define columns for the DashboardTable

const UserList = () => {
  const { users } = useAuth()
  const [userData, setUserData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const DashboardColumns = [
    {
      title: 'Sl',
      dataKey: 'id',
      row: (user) => <span>{user?.id}</span>,
    },
    {
      title: 'Name',
      dataKey: 'name',
      row: (user) => <p>{user?.name}</p>,
    },
    {
      title: 'Number',
      dataKey: 'number',
      row: (user) => <p>{user?.number}</p>,
    },

    {
      title: 'Email',
      dataKey: 'email',
      row: (user) => <p>{user?.email}</p>,
    },

    {
      title: 'Action',
      dataKey: 'action',
      row: (user) => (
        <div className="flex justify-center items-center">
          {users && users.role === 'admin' && (
            <>
              <div className="flex justify-center items-center">
                <div className="flex items-center text-lg">
                  <UserEdit user={user} />
                </div>
                <div className="flex items-center text-lg">
                  <UserView user={user} />
                </div>
                <div className="flex items-center text-lg">
                  <UserDelete user={user} />
                </div>
              </div>
            </>
          )}
        </div>
      ),
    },
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/users`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('data', data)
        setUserData(data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Users List</h2>
      {users && users.role === 'admin' && (
        <>
          <DashboardTable
            data={userData}
            columns={DashboardColumns}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  )
}

export default UserList
