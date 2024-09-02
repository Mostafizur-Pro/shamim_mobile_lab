// import { format } from 'date-fns'
import { useEffect, useState } from 'react'

const DashboardPage = () => {
  const [products, setProducts] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
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
        // console.log('data', data)
        setProducts(data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        // setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Calculate the number of pending products
  const okProductsCount = products.filter(
    (product) => product.status === 'completed'
  ).length
  const pendingProductsCount = products.filter(
    (product) => product.status === 'pending'
  ).length

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Overview Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Recent Activity Section */}
      {/* <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        {recentActivity.length > 0 ? (
          <ul className="space-y-2">
            {recentActivity.map((activity) => (
              <li
                key={activity.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400">
                  {formatDate(activity.date)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent activities.</p>
        )}
      </div> */}
    </div>
  )
}

export default DashboardPage
