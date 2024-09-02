import { Link, useLocation } from "react-router-dom";
// import LogoImage from "../../../assets/logo/logo2.png";
import LogoImage from "@/assets/logo/image/full_logo2.gif";
import { MdSpaceDashboard } from "react-icons/md";
import { PiUserCircleFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { BiSolidInbox } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { SiAuth0 } from "react-icons/si";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { SiPowerpages } from "react-icons/si";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/components/context/AuthContext";

const AdminLeftAside = () => {
  const location = useLocation();
  const { employees, admins } = useAuth();

  return (
    <aside className="lg:px-5 lg:py-5 px-3 py-3 space-y-3  z-10 text-white">
      <div className="mb-10 mt-2">
        <Link to={"/"}>
          <img src={LogoImage} className="h-32" alt="Business Profile logo" />
        </Link>
      </div>
      <div
        className={` ${
          location.pathname === "/dashboard" &&
          "font-semibold bg-secondary_main rounded-[6px] text-white"
        }`}
      >
        <Link to={"/dashboard"}>
          <div className="flex items-center gap-2 py-3 px-3">
            <MdSpaceDashboard className="text-3xl" />
            <p className="">Dashboard</p>
          </div>
        </Link>
      </div>
      {/* Admin Profile */}
      {admins && (
        <>
          <div
            className={` ${
              location.pathname === "/dashboard/profile" &&
              "font-semibold bg-secondary_main rounded-[6px] text-white"
            }`}
          >
            <Link to={"/dashboard/profile"}>
              <div className="flex items-center gap-2 py-3 px-3">
                <PiUserCircleFill className="text-3xl" />
                <p className="">Admin Profile</p>
              </div>
            </Link>
          </div>
        </>
      )}

      {/* Employee Profile */}
      {employees && (
        <>
          <div
            className={` ${
              location.pathname === "/dashboard/employee_profile" &&
              "font-semibold bg-secondary_main rounded-[6px] text-white"
            }`}
          >
            <Link to={"/dashboard/employee_profile"}>
              <div className="flex items-center gap-2 py-3 px-3">
                <PiUserCircleFill className="text-3xl" />
                <p className="">Employee Profile</p>
              </div>
            </Link>
          </div>
        </>
      )}

      {/* profile lists */}
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="profile_lists">
            <AccordionTrigger
              className={`font-normal no-underline ${
                [
                  "/dashboard/admin-info",
                  "/dashboard/paid-clients",
                  "/dashboard/employee-list",
                  "/dashboard/client-list",
                  "/dashboard/user-list",
                ].includes(location.pathname)
                  ? "font-semibold bg-secondary_main rounded-[6px] text-white"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2  px-3">
                <FaUsers className="text-3xl" />
                <p className=""> All Profile Lists</p>
              </div>
            </AccordionTrigger>
            <div className="ps-2 ms-6 border-s border-dashed">
              {employees && (
                <>
                  {/* Client */}
                  <AccordionContent
                    className={` px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/emp/client-list" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/emp/client-list"}>Client List</Link>
                  </AccordionContent>
                </>
              )}
              {admins && (
                <>
                  {/* Admin */}
                  {admins?.role === "superAdmin" && (
                    <AccordionContent
                      className={` mt-2 px-3.5 py-2.5 ${
                        location.pathname === "/dashboard/admin-info" &&
                        "font-semibold bg-secondary_main rounded-[6px] text-white"
                      }`}
                    >
                      <Link to={"/dashboard/admin-info"}>Admins Info</Link>
                    </AccordionContent>
                  )}

                  {/* Client */}
                  <AccordionContent
                    className={` px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/client-list" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/client-list"}>Client List</Link>
                  </AccordionContent>
                  {/* Paid Client */}
                  <AccordionContent
                    className={`  px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/paid-clients" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/paid-clients"}>Paid Clients</Link>
                  </AccordionContent>
                  {/* Employee */}
                  <AccordionContent
                    className={`  px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/employee-list" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/employee-list"}>All Employee</Link>
                  </AccordionContent>
                  {/* User */}
                  <AccordionContent
                    className={`  px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/user-list" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/user-list"}>User List</Link>
                  </AccordionContent>
                </>
              )}
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      {/* inbox */}
      {admins && (
        <>
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="inbox">
                <AccordionTrigger
                  className={`font-normal ${
                    [
                      "/dashboard/deleted-clients",
                      // "/dashboard/edit-clients",
                      // "/dashboard/edit-employe-info",
                      // "/dashboard/edit-clients",
                      // "/dashboard/have-a-quesion",
                      // "/dashboard/hallroom-posts",
                      "/dashboard/paid-posts",
                    ].includes(location.pathname)
                      ? "font-semibold bg-secondary_main rounded-[6px] text-white"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2  px-3">
                    <BiSolidInbox className="text-3xl" />
                    <p className="">Inbox</p>
                  </div>
                </AccordionTrigger>

                <div className="ps-2 ms-6 border-s border-dashed">
                  <AccordionContent
                    className={` mt-2 px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/deleted-clients" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/deleted-clients"}>
                      Delete Clients Info
                    </Link>
                  </AccordionContent>
                  {/* <AccordionContent
                    className={`px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/edit-clients" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/edit-clients"}>Edit Client Info</Link>
                  </AccordionContent>
                  <AccordionContent
                    className={` px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/edit-employe-info" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/edit-employe-info"}>
                      Edit Employee Info
                    </Link>
                  </AccordionContent>
                  <AccordionContent
                    className={`px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/hallroom-posts" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/hallroom-posts"}>HallRoom Posts</Link>
                  </AccordionContent>
                  <AccordionContent
                    className={`px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/paid-posts" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/paid-posts"}>Paid Posts</Link>
                  </AccordionContent> */}
                  <AccordionContent
                    className={`px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/have-a-quesion" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/have-a-quesion"}>
                      Have Any Question?
                    </Link>
                  </AccordionContent>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      )}
      {/* message */}
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="inbox">
            <AccordionTrigger
              className={`font-normal ${
                [
                  "/dashboard/all-message",
                  "/dashboard/create-message",
                ].includes(location.pathname)
                  ? "font-semibold bg-secondary_main rounded-[6px] text-white"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2  px-3">
                <AiFillMessage className="text-3xl" />
                <p className="">Message</p>
              </div>
            </AccordionTrigger>
            <div className="ps-2 ms-6 border-s border-dashed">
              <AccordionContent
                className={`px-3.5 py-2.5 mt-2 ${
                  location.pathname === "/dashboard/all-message" &&
                  "font-semibold bg-secondary_main rounded-[6px] text-white"
                }`}
              >
                <Link to={"/dashboard/all-message"}>Message</Link>
              </AccordionContent>

              {admins && (
                <>
                  <AccordionContent
                    className={`px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/create-message" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/create-message"}>Create Message</Link>
                  </AccordionContent>
                </>
              )}
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      {/* Authentication */}
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="authentication">
            <AccordionTrigger
              className={`font-normal ${
                ["/login", "/register"].includes(location.pathname)
                  ? "font-semibold bg-secondary_main rounded-[6px] text-white"
                  : ""
              }`}
            >
              <div className="flex items-center gap-2  px-3">
                <SiAuth0 className="text-3xl" />
                <p className="">Authentication</p>
              </div>
            </AccordionTrigger>
            {admins && (
              <>
                <div className="ps-2 ms-6 border-s border-dashed">
                  {admins?.role === "superAdmin" && (
                    <>
                      <AccordionContent
                        className={`px-3.5 py-2.5 mt-2 ${
                          location.pathname === "/dashboard/admin" &&
                          "font-semibold bg-secondary_main rounded-[6px] text-white"
                        }`}
                      >
                        <Link to={"/dashboard/admin-register"}>Add Admin</Link>
                      </AccordionContent>
                    </>
                  )}

                  <AccordionContent
                    className={`px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/employee-register" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/employee-register"}>
                      Add Employee
                    </Link>
                  </AccordionContent>
                </div>
              </>
            )}
            <div className="ps-2 ms-6 border-s border-dashed">
              <AccordionContent
                className={`px-3.5 py-2.5 ${
                  location.pathname === "/login" &&
                  "font-semibold bg-secondary_main rounded-[6px] text-white"
                }`}
              >
                <Link to={"/register"}>Add Client</Link>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      {/* posts */}
      {admins && (
        <>
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="authentication">
                <AccordionTrigger
                  className={`font-normal ${
                    [
                      "/dashboard/hallroom-posts",
                      "/dashboard/paid-post",
                      "/dashboard/create-post",
                    ].includes(location.pathname)
                      ? "font-semibold bg-secondary_main rounded-[6px] text-white"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2  px-3">
                    <BsFillFileEarmarkPostFill className="text-3xl" />
                    <p className="">Posts</p>
                  </div>
                </AccordionTrigger>
                <div className="ps-2 ms-6 border-s border-dashed">
                  <AccordionContent
                    className={`px-3.5 py-2.5 mt-2 ${
                      location.pathname === "/dashboard/hallroom-posts" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/hallroom-posts"}>
                      All Hallroom Posts
                    </Link>
                  </AccordionContent>
                  <AccordionContent
                    className={`px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/paid-post" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/paid-post"}>All Paid Posts</Link>
                  </AccordionContent>
                  <AccordionContent
                    className={`px-3.5 py-2.5 ${
                      location.pathname === "/dashboard/create-post" &&
                      "font-semibold bg-secondary_main rounded-[6px] text-white"
                    }`}
                  >
                    <Link to={"/dashboard/create-post"}>Create Post</Link>
                  </AccordionContent>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </>
      )}

      {/* Pages */}
      <div className="mt-1.5">
        <Accordion type="single" collapsible>
          <AccordionItem value="authentication">
            <AccordionTrigger className="font-normal py-0">
              <div className="flex items-center gap-2  px-3">
                <SiPowerpages className="text-3xl" />
                <p className="">Pages</p>
              </div>
            </AccordionTrigger>
            <div className="ps-2 ms-6 border-s border-dashed">
              <AccordionContent className=" mt-4">
                <Link
                  className={`px-3.5 py-2.5 mt-2 ${
                    location.pathname === "" &&
                    "border-b-2 border-b-blue-700 font-semibold text-blue-700"
                  }`}
                  to={"/room"}
                >
                  Hallroom
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  className={`px-3.5 py-2.5  ${
                    location.pathname === "" &&
                    "border-b-2 border-b-blue-700 font-semibold text-blue-700"
                  }`}
                  to={"/about"}
                >
                  About us
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  className={`px-3.5 py-2.5  ${
                    location.pathname === "" &&
                    "border-b-2 border-b-blue-700 font-semibold text-blue-700"
                  }`}
                  to={"/contact"}
                >
                  Contact
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  className={`px-3.5 py-2.5  ${
                    location.pathname === "" &&
                    "border-b-2 border-b-blue-700 font-semibold text-blue-700"
                  }`}
                  to={"/our-employee"}
                >
                  Employees
                </Link>
              </AccordionContent>
              <AccordionContent>
                <Link
                  className={`px-3.5 py-2.5  ${
                    location.pathname === "" &&
                    "border-b-2 border-b-blue-700 font-semibold text-blue-700"
                  }`}
                  to={"/our-client"}
                >
                  Our Clients
                </Link>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default AdminLeftAside;
