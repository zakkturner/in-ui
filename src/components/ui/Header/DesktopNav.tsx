import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import DesktopLink from "./DesktopLink";
import { menuItems } from "@/app/helpers/utils";
import { useEffect } from "react";

const DesktopNav = () => {
  return (
    <div className="flex justify-between items-center w-full hidden xl:!flex">
      <ul className="p-2 flex">
        {menuItems.map((link) => (
          <DesktopLink
            key={link.name}
            name={link.name}
            url={link.url}
            needsAuth={link.needsAuth}
          />
        ))}

        <li className="nav-item" v-if="isLoggedIn">
          {/* <span>Hello, <Link className="mobile-nav-link" href="/dashboard"></Link></span> */}
        </li>
      </ul>
      <div className="flex justify-between w-1/12">
        <a href="#" className="text-[#28aae2]">
          <FaInstagram />
        </a>
        <a href="#" className="text-[#28aae2]">
          <FaTwitter />
        </a>
        <a href="#" className="text-[#28aae2]">
          <FaFacebook />
        </a>
      </div>
    </div>
  );
};

export default DesktopNav;
