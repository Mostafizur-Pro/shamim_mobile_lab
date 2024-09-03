import { useAuth } from '@/components/context/AuthContext'
import { RiShutDownLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const DashboardTop = () => {
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/dashboard/profile/profile"
                  className="text-blue-500 hover:underline"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/product/add-product"
                  className="text-blue-500 hover:underline"
                >
                  Add Product
                </Link>
              </li>

              <li className="text-blue-500 hover:underline">
                <button onClick={handleLogout}>
                  {' '}
                  <RiShutDownLine />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default DashboardTop
