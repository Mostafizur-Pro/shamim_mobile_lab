import { useEffect, useState } from 'react'
import DashboardTable from '@/components/core/table/DashboardTable'
import UserView from './Action/userView'
import UserDelete from './Action/userDelete'
import UserEdit from './Action/userEdit'

// Define columns for the DashboardTable
const DashboardColumns = [
  {
    title: 'Sl',
    dataKey: 'id',
    row: (users) => <span>{users?.id}</span>,
  },
  {
    title: 'Name',
    dataKey: 'name',
    row: (users) => <p>{users?.name}</p>,
  },
  {
    title: 'Number',
    dataKey: 'number',
    row: (users) => <p>{users?.number}</p>,
  },

  {
    title: 'Email',
    dataKey: 'email',
    row: (users) => <p>{users?.email}</p>,
  },

  {
    title: 'Action',
    dataKey: 'action',
    row: (users) => (
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="flex items-center text-lg">
            <UserEdit users={users} />
          </div>
          <div className="flex items-center text-lg">
            <UserView users={users} />
          </div>
          <div className="flex items-center text-lg">
            <UserDelete users={users} />
          </div>
        </div>
      </div>
    ),
  },
]

const UserList = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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
        setUsers(data.data)
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
      <DashboardTable
        data={users}
        columns={DashboardColumns}
        isLoading={isLoading}
      />
    </div>
  )
}

export default UserList
