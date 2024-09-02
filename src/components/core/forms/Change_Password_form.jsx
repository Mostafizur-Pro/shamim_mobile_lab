import { Button } from "@/components/ui/button";
import TextInput from "../inputs/TextInput";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/AuthContext";

const Change_Password_form = ({ link }) => {
  const { employees, admins, logout } = useAuth();

  const [showPass, setShowPass] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conNewPass, setConNewPass] = useState("");
  const [error, setError] = useState("");

  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!conNewPass && !newPass && !currentPass) {
      setError("Please enter both Current Password and New Password.");
      return;
    }
    if (newPass !== conNewPass) {
      setError("Please enter New Password.");
      return;
    }

    const formData = {
      currentPassword: currentPass,
      newPassword: newPass,
      profile_id: employees?.profile_id || admins?.profile_id,
      profile: "employee",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOCAL_API_URL}/${link}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        if (responseData) {
          logout();
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An unexpected error occurred.");
    }
  };
  // handle form here  and send props
  return (
    <div className="flex pb-10  justify-center">
      <div className="space-y-5  w-full md:w-[50%]">
        <p className="font-bold text-xl  text-center">Change Password</p>
        <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
          <div>
            <TextInput
              className="w-full"
              id={"currentPass"}
              name="currentPass"
              label={"Current Password"}
              type={`${showPass ? "text" : "password"}`}
              onChange={(e) => setCurrentPass(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between  rounded h-[44px]   gap-2">
            <TextInput
              className="w-full"
              id={"newPass"}
              name="newPass"
              label={"New Password"}
              type={`${showPass ? "text" : "password"}`}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between  rounded h-[44px]   gap-2">
            <TextInput
              className="w-full"
              id={"confirmNewPass"}
              name="confirmNewPass"
              label={"Confirm New Password"}
              type={`${showPass ? "text" : "password"}`}
              onChange={(e) => setConNewPass(e.target.value)}
              required
            />
          </div>
          <div
            className={`${showPass && "text-green-500"}`}
            onClick={toggleShowPass}
          >
            <p className="mr-3 font-semibold text-green-600">Show Password</p>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Button className="w-full">Save Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Change_Password_form;
