import { Link, useLocation } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { FaUserDoctor, FaUserGroup } from 'react-icons/fa6'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/components/context/AuthContext'
import { FaUser } from 'react-icons/fa'

const DashboardSidebar = () => {
  const location = useLocation()
  const { users } = useAuth()

  // console.log('data', users)

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="flex items-center justify-center p-4 gap-3 bg-gray-900">
        <div>
          <Avatar>
            <AvatarImage
              //  src="https://github.com/shadcn.png"
              src={users?.image}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h2 className="text-lg font-bold">{users?.name}</h2>
          <p className="text-md ">{users?.role}</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto mt-6">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ${
                location.pathname === '/dashboard'
                  ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                  : ''
              }`}
            >
              <FiHome className="mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Profile */}

          <Accordion type="single" collapsible>
            <AccordionItem value="user">
              <AccordionTrigger
                className={`font-normal ${
                  [
                    '/dashboard/profile/profile',
                    '/dashboard/profile/change-password',
                  ].includes(location.pathname)
                    ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                    : ''
                }`}
              >
                <div className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200">
                  <FaUser className="mr-3" />
                  <p>Profile</p>
                </div>
              </AccordionTrigger>

              <div className="ps-2 ms-6 border-s border-dashed">
                <AccordionContent
                  className={`px-3.5 py-2.5 mt-2 ${
                    location.pathname === '/dashboard/profile/profile'
                      ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                      : ''
                  }`}
                >
                  <Link to="/dashboard/profile/profile">Profile</Link>
                </AccordionContent>
              </div>
              <div className="ps-2 ms-6 border-s border-dashed">
                <AccordionContent
                  className={`px-3.5 py-2.5 mt-2 ${
                    location.pathname === '/dashboard/profile/change-password'
                      ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                      : ''
                  }`}
                >
                  <Link to="/dashboard/profile/change-password">
                    Change Password
                  </Link>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>

          {/* Users */}
          {users && users.role === 'admin' && (
            <>
              <Accordion type="single" collapsible>
                <AccordionItem value="user">
                  <AccordionTrigger
                    className={`font-normal ${
                      [
                        '/dashboard/user/user-list',
                        '/dashboard/user/add-user',
                      ].includes(location.pathname)
                        ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                        : ''
                    }`}
                  >
                    <div className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200">
                      <FaUserGroup className="mr-3" />
                      <p>Users</p>
                    </div>
                  </AccordionTrigger>

                  <div className="ps-2 ms-6 border-s border-dashed">
                    <AccordionContent
                      className={`px-3.5 py-2.5 mt-2 ${
                        location.pathname === '/dashboard/user/add-user'
                          ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                          : ''
                      }`}
                    >
                      <Link to="/dashboard/user/add-user">Add User</Link>
                    </AccordionContent>
                  </div>
                  <div className="ps-2 ms-6 border-s border-dashed">
                    <AccordionContent
                      className={`px-3.5 py-2.5 mt-2 ${
                        location.pathname === '/dashboard/user/user-list'
                          ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                          : ''
                      }`}
                    >
                      <Link to="/dashboard/user/user-list">User List</Link>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </>
          )}

          {/* Products */}
          <Accordion type="single" collapsible>
            <AccordionItem value="product">
              <AccordionTrigger
                className={`font-normal ${
                  [
                    '/dashboard/product/product-list',
                    '/dashboard/product/add-product',
                  ].includes(location.pathname)
                    ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                    : ''
                }`}
              >
                <div className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200">
                  <FaUserDoctor className="mr-3" />
                  <p>Product</p>
                </div>
              </AccordionTrigger>

              <div className="ps-2 ms-6 border-s border-dashed">
                <AccordionContent
                  className={`px-3.5 py-2.5 mt-2 ${
                    location.pathname === '/dashboard/product/add-product'
                      ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                      : ''
                  }`}
                >
                  <Link to="/dashboard/product/add-product">Add Product</Link>
                </AccordionContent>
              </div>

              <div className="ps-2 ms-6 border-s border-dashed">
                <AccordionContent
                  className={`px-3.5 py-2.5 mt-2 ${
                    location.pathname === '/dashboard/product/product-list'
                      ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                      : ''
                  }`}
                >
                  <Link to="/dashboard/product/product-list">
                    Products List
                  </Link>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>

          {/* Reports */}
          {/* <li>
            <Link
              to="/dashboard/reports"
              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ${
                location.pathname === '/dashboard/reports'
                  ? 'font-semibold bg-secondary_main rounded-[6px] text-white'
                  : ''
              }`}
            >
              <FiBarChart className="mr-3" />
              <span>Reports</span>
            </Link>
          </li> */}
        </ul>
      </nav>

      <div className="bg-gray-900 p-4">
        <p className="text-gray-400 text-center text-xs">© 2024 Your Company</p>
      </div>
    </aside>
  )
}

export default DashboardSidebar
