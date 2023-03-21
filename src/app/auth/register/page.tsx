"use client";
import Link from "next/link";
import { useContext } from "react";
import { useAppSelector } from "@/app/hooks";

import { UrlContext } from "@/context/UrlContext";

const RegisterPage = () => {
  const url = useContext(UrlContext);
  const handleSubmit = () => {
    console.log("works");
  };
  return (
    <main className="flex w-8/12 mx-auto justify-between">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <h3>Register</h3>
          <h5 className="error"> </h5>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => console.log(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => console.log(e.target.value)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account? <Link href="./register">Register</Link>
          </span>
          <Link
            href={`${url}/login/github`}
            className="bg-[#f05a1f] text-white flex justify-center items-center py-4"
          >
            Register with Github
          </Link>
        </div>
      </form>
    </main>
  );
};

export default RegisterPage;
