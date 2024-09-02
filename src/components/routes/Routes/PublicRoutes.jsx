import MainLayout from '@/components/layouts/MainLayout'
import LoginPage from '@/components/pages/auth/user/login/Login'

const PublicRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]

export default PublicRoutes
