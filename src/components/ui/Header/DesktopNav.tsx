"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import DesktopLink from "./DesktopLink";
import { menuItems } from "@/app/helpers/utils";
import { useEffect, useContext } from "react";
import { UrlContext } from "@/context/UrlContext";
import { useAppSelector } from "@/app/hooks";
import { getCsrf, isLoggedIn } from "@/store/features/user/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

const DesktopNav = () => {
  const url = useContext(UrlContext);
  const csrf: any = useAppSelector(getCsrf);
  const isLogged = useAppSelector(isLoggedIn);
  const router = useRouter();
  const handleLogOut = (e: any) => {
    e.preventDefault();
    console.log();
    axios.post(
      `${url}/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": csrf,
        },
      }
    );
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    router.push("/");
  };
  return (
    <div className="flex justify-between items-center w-full hidden xl:!flex">
      <ul className="p-2 flex">
        {menuItems.map((link) => {
          if (link.needsAuth && !isLogged) {
            return null; // Don't render link if it needs auth and user is not logged in
          }
          if (
            (link.name === "register" && isLogged) ||
            (link.name === "login" && isLogged)
          ) {
            return null; // Don't render register link if user is already logged in
          }
          return (
            <DesktopLink
              key={link.name}
              name={link.name}
              url={link.url}
              needsAuth={link.needsAuth}
            />
          );
        })}
        {isLogged && (
          <li className="p-2">
            <a href="#" onClick={handleLogOut}>
              LOG OUT
            </a>
            {/* <span>Hello, <Link className="mobile-nav-link" href="/dashboard"></Link></span> */}
          </li>
        )}
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
