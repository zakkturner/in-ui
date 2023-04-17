import { useEffect, useRef } from "react";

import MobileLink from "./MobileLink";
import gsap from "gsap";
import { menuItems } from "@/app/helpers/utils";
import { useAppSelector } from "@/app/hooks";
import { getCsrf } from "@/store/features/user/userSlice";
import axios from "axios";

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
  const menu = useRef(null);
  const prevIsOpen = useRef(false);
  const csrf: any = useAppSelector(getCsrf);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const handleLogOut = (e: any) => {
    e.preventDefault();
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
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to(menu.current, {
        duration: 0.5,
        display: "block",
        height: "200px",
        opacity: 1,
      });
    } else if (!isOpen && prevIsOpen.current) {
      gsap.to(menu.current, {
        duration: 0.5,
        y: 0,
        opacity: 0,
        display: "none",
        height: 0,
      });
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  return (
    <div
      ref={menu}
      className={`absolute bg-white w-full top-32 overflow-hidden`}
      style={{ display: "none", height: "0" }}
    >
      <ul className="p-2">
        {menuItems.map((link) => (
          <MobileLink
            key={link.name}
            name={link.name}
            url={link.url}
            needsAuth={link.needsAuth}
          />
        ))}

        <li className="px-6 py-1 uppercase text-xs">
          <a href="#" onClick={handleLogOut}>
            Log Out
          </a>
          {/* <span>Hello, <Link className="mobile-nav-link" href="/dashboard"></Link></span> */}
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
