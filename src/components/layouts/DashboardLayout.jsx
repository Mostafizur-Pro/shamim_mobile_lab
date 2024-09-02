import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../pages/publicPage/shared/DashboardSidebar/DashboardSidebar'
import DashboardTop from '../pages/publicPage/shared/DashboardTop/DashboardTop'

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <DashboardTop />
          <div className="mt-5">
            <Outlet />
          </div>
        </main>
      </div>

      {/* <footer className="bg-white shadow-md p-4 text-center">
        <p className="text-gray-600">© 2024 Your Company</p>
      </footer> */}
    </div>
  )
}

export default DashboardLayout
