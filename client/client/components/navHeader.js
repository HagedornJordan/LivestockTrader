import axiosInstance from "../helpers/axios";
import logout from "../helpers/auth";
import Link from "next/link";
const NavHeader = (props) => {
  const username = props.user;
  return (
    <div className="flex justify-start min-w-full pl-4 pb-3 mb-5 bg-primary border-b-2">
      <h1 className=" font-sans text-2xl font-semibold subpixel-antialiased pr-5">
        Livestock Trader
      </h1>
      <Link href="/forSale"> Listings</Link>
    </div>
  );
};

export default NavHeader;
