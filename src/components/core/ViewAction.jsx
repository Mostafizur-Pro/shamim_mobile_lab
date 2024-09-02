import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";
import { formatDateString } from "@/utils/getCurrentDate";

const ViewAction = ({ admins }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
        <div onClick={() => setOpen(!open)} className="cursor-pointer ">
          <FaEye className="text-blue-500 text-3xl " />
        </div>
        <AlertDialogContent className="py-10">
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-2">
              <img
                className="w-full h-auto rounded-lg object-cover mt-1.5"
                src={
                  admins?.image ===
                    "https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png" ||
                  admins?.image ===
                    "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
                    ? admins?.image
                    : `${
                        import.meta.env.VITE_LOCAL_API_URL
                      }/api/v1/images/uploads/${admins?.image}`
                }
                alt={admins?.image}
              />
            </div>
            <div className="col-span-3">
              <h2 className=" mb-5 font-semibold  text-center capitalize">
                <span className="text-2xl ">{admins?.name}</span>{" "}
                <br />
                <span className="text-sm">
                  Role: {admins?.role}
                </span>{" "}
                <br />
                <span className="text-sm">
                  Profile ID: {admins?.profile_id}
                </span>{" "}
                <br />
              </h2>
              <h2 className="text-sm capitalize">
                <span className="font-semibold ">Organization: </span>
                {admins?.organization_name}
              </h2>
              <h2 className="text-sm">
                <span className="font-semibold">Number: </span>
                {admins?.number}
              </h2>

              {admins?.admin_email && (
                <h2 className="text-sm">
                  <span className="font-semibold">Email: </span>
                  {admins?.admin_email}
                </h2>
              )}

              <h2 className="text-sm">
                <span className="font-semibold">Category: </span>
                {admins?.subcategories},{admins?.category}
              </h2>
              <h2 className="text-sm">
                <span className="font-semibold">Address: </span>
                {admins?.road},{admins?.localArea}, {admins?.ward},{" "}
                {admins?.thana}, {admins?.district}, {admins?.division}
              </h2>
              <h2 className="text-sm">
                <span className="font-semibold">Date: </span>
                <p>{formatDateString(admins?.created_at)}</p>
              </h2>
            </div>
          </div>
          <div className="flex justify-center gap-8 ">
            <Button variant="outline" onClick={() => setOpen(!open)}>
              Cancel
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ViewAction;
