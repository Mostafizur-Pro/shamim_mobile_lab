import DashboardLayout from '@/components/layouts/DashboardLayout'
import DashboardPage from '@/components/pages/dashboard/DashboardPage'
import AddProduct from '@/components/pages/dashboard/Product/AddProduct/AddProduct'
import ProductList from '@/components/pages/dashboard/Product/ProductList/ProductList'
import PrivateRoute from './Provider/PrivateRoute'
import UserList from '@/components/pages/dashboard/user/UserList/UserList'
import AddUser from '@/components/pages/dashboard/user/AddUser/AddUser'
import ChangePassword from '@/components/pages/dashboard/Profile/ChangePassword/ChangePassword'
import ProfilePage from '@/components/pages/dashboard/Profile/Profile/Profile'

const DashboardRoutes = [
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },

      // Profile

      {
        path: '/dashboard/profile/profile',
        element: <ProfilePage />,
      },

      {
        path: '/dashboard/profile/change-password',
        element: <ChangePassword />,
      },

      // Users

      {
        path: '/dashboard/user/add-user',
        element: <AddUser />,
      },

      {
        path: '/dashboard/user/user-list',
        element: <UserList />,
      },

      // Products

      {
        path: '/dashboard/product/product-list',
        element: <ProductList />,
      },
      {
        path: '/dashboard/product/add-product',
        element: <AddProduct />,
      },
    ],
  },
]

export default DashboardRoutes
