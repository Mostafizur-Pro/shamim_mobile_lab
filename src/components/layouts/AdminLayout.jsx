import { Outlet } from 'react-router-dom'
import AdminTopNavbar from '../core/navbar/AdminTopNavbar'
import AdminLeftAside from '../core/asides/AdminLeftAside'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MdSpaceDashboard } from 'react-icons/md'
import { PiUserCircleFill } from 'react-icons/pi'
import { FaUsers } from 'react-icons/fa'
import { BiSolidInbox } from 'react-icons/bi'
import { AiFillMessage } from 'react-icons/ai'
import { SiAuth0, SiPowerpages } from 'react-icons/si'
import { BsFillFileEarmarkPostFill } from 'react-icons/bs'
import Logo02Image from '../../assets/AllLogo/b2.png'

const NavbarHamburgerMenu = () => {
  const routes = [
    { name: 'Dashboard', icon: <MdSpaceDashboard /> },
    { name: 'Profile', icon: <PiUserCircleFill /> },
    { name: 'Users', icon: <FaUsers /> },
    { name: 'Inbox', icon: <BiSolidInbox /> },
    { name: 'Messages', icon: <AiFillMessage /> },
    { name: 'Auth0', icon: <SiAuth0 /> },
    { name: 'Posts', icon: <BsFillFileEarmarkPostFill /> },
    { name: 'Powerpages', icon: <SiPowerpages /> },
  ]
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className="bg-primary_blue lg:hidden block fixed top-0 left-0 h-screen w-10">
            <img src={Logo02Image} className="w-7 mx-auto mt-5" alt="" />
            <div className="text-white text-2xl space-y-5 mt-10 ms-2">
              {routes.map((route, index) => (
                <div key={index} className="route">
                  <div className="icon">{route.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          className=" overflow-y-auto px-5 md:px-10 bg-primary_blue"
          side="left"
        >
          <AdminLeftAside />
        </SheetContent>
      </Sheet>
    </div>
  )
}

const AdminLayout = () => {
  return (
    <section className="lg:grid flex xl:grid-cols-10 lg:grid-cols-11 relative">
      <div className="xl:col-span-2 col-span-3 bg-primary_blue h-screen sticky top-0 overflow-y-scroll scroll-style  hidden lg:block">
        <AdminLeftAside />
      </div>
      <div className="bg-primary_blue lg:hidden block fixed top-0 left-0 h-screen w-10">
        <NavbarHamburgerMenu />
      </div>

      <div className="lg:col-span-8 grow lg:ms-0 ms-10">
        <div className="border-b-2 border-primary_blue">
          <AdminTopNavbar />
        </div>
        <div className="w-full ps-5 ">
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default AdminLayout
