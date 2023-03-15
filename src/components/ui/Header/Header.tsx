"use client";

import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";
import DesktopNav from "./DesktopNav";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="shadow-md">
      <nav className="flex container mx-auto w-8/12">
        <div className="flex xl:hidden py-16 flex-start relative w-full">
          <button className="mobile-btn" onClick={() => setIsOpen(!isOpen)}>
            <FaBars />
          </button>
          <Image
            className="absolute top-1/2  left-1/2 translate-y-[-50%] translate-x-[-50%]"
            src="/assets/images/logoCover.png"
            alt="Interactive Nerd"
            width="150"
            height="50"
          />
        </div>
        <MobileMenu isOpen={isOpen} />

        <DesktopNav />
      </nav>
    </header>
  );
};

export default Header;
