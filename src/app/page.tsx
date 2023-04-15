"use client";
import { Inter } from "next/font/google";

import PostsList from "@/components/Post/PostList/PostList";

import SideBar from "@/components/SideBar/SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className="flex w-8/12 mx-auto justify-between">
        <PostsList />
        <SideBar />
      </main>
    </>
  );
}
