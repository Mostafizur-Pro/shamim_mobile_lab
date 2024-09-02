import { useState } from "react";
import { BsCloudUploadFill } from "react-icons/bs";

const ImgUploadField = ({ setValue, error, value, post_image }) => {
  const [prevImg, setPrevImg] = useState();

  const handleFileChange = async (e) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];

        setValue(selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
          setPrevImg(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-slate-500 overflow-hidden rounded-[6px] w-full relative ">
      <label htmlFor="dropzone-file">
        <div className="flex w-full justify-center absolute ">
          {value && !prevImg && (
            <img
              className="w-[150px] h-[150px] object-cover mt-5"
              src={value ? value : "/imgUpIcon.png"}
              alt="icon"
            />
          )}
          {post_image && !value && (
            <img
              className="w-[150px] h-[150px] object-cover mt-5"
              src={
                post_image ===
                  "https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png" ||
                post_image ===
                  "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png"
                  ? post_image
                  : `${
                      import.meta.env.VITE_LOCAL_API_URL
                    }/api/v1/images/uploads/${post_image}`
              }
              alt="icon"
            />
          )}
        </div>

        {prevImg && (
          <div className="w-[150px] h-[150px] object-conain mt-5">
            <img
              className="rrounded-[6px] "
              src={prevImg}
              width={150}
              height={150}
              alt="icon"
            />
          </div>
        )}
        {!prevImg && (
          <div className="px-10  rounded-[6px] w-fit mx-auto py-10">
            <BsCloudUploadFill
              size={100}
              className="text-hs-Alter-color w-full"
            />
          </div>
        )}

        <input
          onChange={handleFileChange}
          name="image"
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
        />
        {/* <input
                    type="file"
                    id={"image"}
                    name="image"
                    // value={formData.image}
                    onChange={handleInputChange}
                    className="mb-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    placeholder="image"
                  /> */}
      </label>

      <p className="text-red-400 mt-6 absolute -bottom-10 z-10">{error}</p>
    </div>
  );
};

export default ImgUploadField;
