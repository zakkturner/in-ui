"use client";
import { UrlContext } from "@/context/UrlContext";
import { Post } from "@/store/features/post/postSlice";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar/SideBar";

const BlogPostPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const postPath = usePathname();
  const url = useContext(UrlContext);
  useEffect(() => {
    const fetchPost = async () => {
      console.log(`${url}/${postPath}`);
      try {
        const response = await axios.get(`${url}/api${postPath}`);
        console.log(response);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  });
  return (
    <div className="flex w-8/12 mx-auto justify-between">
      <SideBar />
    </div>
  );
};

export default BlogPostPage;
