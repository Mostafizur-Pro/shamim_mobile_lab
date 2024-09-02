import { useAuth } from '@/components/context/AuthContext'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import LoginProfile from '@/utils/loginProfile'

import { FaUser } from 'react-icons/fa'
import { RiShutDownLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const ProfileDropdown = ({ clients, employees, admins, users }) => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((err) => console.log(err))
  }

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <LoginProfile
            clientData={clients}
            adminData={admins}
            userData={users}
            employeeData={employees}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem className="hover:bg-blue-200 cursor-pointer">
            <Link
              className=" flex items-center gap-2 w-full text-xl"
              to={
                admins
                  ? '/dashboard/profile'
                  : users
                  ? '/room'
                  : employees
                  ? '/dashboard/employee_profile'
                  : clients
                  ? `/profile/${clients?.profile_id}`
                  : '/'
              }
            >
              <FaUser /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center hover:bg-blue-200 cursor-pointer text-xl">
            <RiShutDownLine />
            <button onClick={handleLogout}>Log out</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ProfileDropdown
