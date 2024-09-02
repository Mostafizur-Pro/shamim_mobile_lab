import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from '@/components/core/ErrorPage/ErrorPage'

import PublicRoutes from './PublicRoutes'
import DashboardRoutes from './DashboardRoutes'

const router = createBrowserRouter([
  // Home
  ...PublicRoutes,
  ...DashboardRoutes,

  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
