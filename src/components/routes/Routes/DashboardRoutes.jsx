import DashboardLayout from '@/components/layouts/DashboardLayout'
import DashboardPage from '@/components/pages/dashboard/DashboardPage'
import AddProduct from '@/components/pages/dashboard/Product/AddProduct/AddProduct'
import ProductList from '@/components/pages/dashboard/Product/ProductList/ProductList'
import PrivateRoute from './Provider/PrivateRoute'
import UserList from '@/components/pages/dashboard/user/UserList/UserList'

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
