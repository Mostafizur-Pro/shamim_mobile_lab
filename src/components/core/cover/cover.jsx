import { MdHome } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

const Cover = ({ title }) => {
  return (
    <div>
      <div className="bg-[#282560] text-white px-10 ">
        <div className="container mx-auto flex flex-col md:flex-row items-center ">
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start py-8">
            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
              {title}
            </h2>
            <div className="my-2 text-lg text-white flex items-center gap-3 font-semibold">
              <p className="text-2xl"><MdHome /></p> <p>Home </p> <FaFileAlt /> <p>{title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
