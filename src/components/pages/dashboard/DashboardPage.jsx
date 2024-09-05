import { useAuth } from '@/components/context/AuthContext'
import { useEffect, useState } from 'react'

const DashboardPage = () => {
  const { users } = useAuth()
  const [products, setProducts] = useState([])
  const [user, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/products`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProducts(data.data)
      } catch (error) {
        setError(error.message)
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_URL}/api/v1/users`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setUsers(data.data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchProducts()
    fetchUsers()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  // Calculate the number of pending and completed products
  const okProductsCount = products.filter(
    (product) => product.status === 'completed'
  ).length
  const pendingProductsCount = products.filter(
    (product) => product.status === 'pending'
  ).length

  // Calculate the number of users and admins
  const totalUsersCount = user.length
  const totalAdminsCount = user.filter((user) => user.role === 'admin').length

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {users && users.role === 'admin' && (
        <>
          {/* User Section */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium">Total Users</h3>
                <p className="text-2xl font-bold">{totalUsersCount}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium">Total Admins</h3>
                <p className="text-2xl font-bold">{totalAdminsCount}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Products Overview Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Total Products</h3>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Success Products</h3>
            <p className="text-2xl font-bold">{okProductsCount}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Pending Products</h3>
            <p className="text-2xl font-bold">{pendingProductsCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
