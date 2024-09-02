const LoginProfile = ({ adminData, clientData, userData, employeeData }) => {
  // console.log('text', adminData, clientData, userData, employeeData)
  return (
    <div>
      <div className="flex items-center capitalize gap-3">
        {adminData && (
          <div className="border-2 border-primary_blue p-1 rounded-full">
            <img
              className="w-8 h-8 object-cover rounded-full "
              // src={`https://miro.medium.com/v2/resize:fit:640/1*7Y_aSJVafQQqzXzjdbJaew.jpeg`}
              src={
                adminData?.image ===
                "https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png"
                  ? adminData?.image
                  : `${
                      import.meta.env.VITE_LOCAL_API_URL
                    }/api/v1/images/uploads/${adminData?.image}`
              }
              alt="profile"
            />
          </div>
        )}
        {clientData && (
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={
              clientData?.image ===
                "https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png" ||
              clientData?.image ===
                "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
                ? clientData?.image
                : `${
                    import.meta.env.VITE_LOCAL_API_URL
                  }/api/v1/images/uploads/${clientData?.image}`
            }
            alt="profile"
          />
        )}
        {userData && (
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={
              userData?.image ===
                "https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png" ||
              userData?.image ===
                "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
                ? userData?.image
                : `${
                    import.meta.env.VITE_LOCAL_API_URL
                  }/api/v1/images/uploads/${userData?.image}`
            }
            alt="profile"
          />
        )}
        {employeeData && (
          <img
            className="w-8 h-8 object-cover rounded-full"
            src={
              employeeData?.image ===
                "https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png" ||
              employeeData?.image ===
                "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
                ? employeeData?.image
                : `${
                    import.meta.env.VITE_LOCAL_API_URL
                  }/api/v1/images/uploads/${employeeData?.image}`
            }
            alt="profile"
          />
        )}

        <div className="hidden md:block text-left capitalize">
          <h1>
            {clientData?.name ||
              adminData?.name ||
              userData?.name ||
              employeeData?.name}
          </h1>
          <p className="text-sm">
            {clientData?.role || adminData?.role || employeeData?.emp_role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginProfile;
