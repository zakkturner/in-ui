"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getCsrfToken,
  getUser,
  getAuthUser,
} from "@/store/features/user/userSlice";
import axios, { AxiosError } from "axios";
import Drawer from "@/components/Drawer/Drawer";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/store/features/post/postSlice";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const xsrf = useAppSelector(getCsrfToken);
  const url = process.env.NEXT_PUBLIC_API_URL;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    dispatch(getAuthUser());
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${url}/api/user/posts`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": xsrf,
          },
        });
        const posts: Post[] = response.data;
        console.log(posts);
        setPosts(posts);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex">
      <Drawer user={user} />

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        <ul>
          {posts.map((post) => (
            <li
              className="flex items-center justify-between bg-white shadow-sm mb-2"
              key={post.id}
            >
              <img
                className="mr-4"
                src={post.post_image[0].post_image_path}
                width="100"
                height="100"
                alt={post.post_image[0].post_image_caption}
              />
              <p className="mr-4">{post.title}</p>
              <div className="pr-4">
                <Link className="mr-4" href={`/edit/${post.id}`}>
                  Edit
                </Link>
                <Link className="" href={`/${post.id}`}>
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
