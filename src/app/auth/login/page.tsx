"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { login, getCrsfToken, getCsrf } from "@/store/features/user/userSlice";
import { useCookies } from "react-cookie";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(getCsrf());
  }, [dispatch]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };
  //   const [cookies, setCookie] = useCookies(["X-XSRF-Token"]);
  //   const csrfToken = useAppSelector(getCrsfToken);
  //   const handleLogin = (e) => {
  //     e.preventDefault();
  //     dispatch(getCsrf());
  //     dispatch(login({ email, password }));
  //     console.log("Cookies", cookies);
  //   };
  return (
    <main className="flex w-8/12 mx-auto justify-between">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <h3>Login</h3>
          <h5 className="error"> </h5>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account? <Link href="./register">Register</Link>
          </span>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
