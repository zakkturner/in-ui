"use client";
import { Inter } from "next/font/google";

import { useEffect } from "react";
import PostsList from "@/components/Post/PostList/PostList";
import Hero from "@/components/ui/Hero/Hero";
import SideBar from "@/components/SideBar/SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    console.log("yo");
  });
  return (
    <>
      <Hero />
      <main className="flex w-8/12 mx-auto justify-between">
        <PostsList />
        <SideBar />
      </main>
    </>
  );
}
