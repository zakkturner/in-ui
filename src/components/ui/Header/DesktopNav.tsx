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
      <div className="flex">
        <a href="#" className="">
          <FaInstagram />
        </a>
        <a href="#" className="">
          <FaTwitter />
        </a>
        <a href="#" className="">
          <FaFacebook />
        </a>
      </div>
    </div>
  );
};

export default DesktopNav;
