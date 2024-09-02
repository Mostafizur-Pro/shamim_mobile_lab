import { Link } from "react-router-dom";
import LogoImage from "../../../assets/logo/logo.png";

const Logo = () => {
  return (
    <div className="w-[100px] md:w-[145px] xl:w-[176px]">
      <Link to={'/'}>
        <img src={LogoImage} alt="logo" loading="lazy" />
      </Link>
    </div>
  );
};

export default Logo;
