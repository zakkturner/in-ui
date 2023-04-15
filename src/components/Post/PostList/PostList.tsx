import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import Link from "next/link";
import Image from "next/image";
import { UrlContext } from "@/context/UrlContext";

import { AppDispatch } from "@/store/store";
import {
  getPosts,
  Post,
  getAllPosts,
  getPostsStatus,
} from "../../../store/features/post/postSlice";
import PostCard from "@/components/Card/PostCard";

const PostsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useAppSelector(getAllPosts);
  const status = useAppSelector(getPostsStatus);
  const error = useAppSelector((state: any) => state.error);
  const url = useContext(UrlContext);

  useEffect(() => {
    console.log(status);
    if (status === "idle") {
      dispatch(getPosts());

      console.log("Posts", posts);
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <ul className="px-5 w-10/12">
      {posts.map((post: Post) => (
        <li className="mb-5 w-full" key={post.id}>
          <PostCard>
            <img
              className=""
              src={
                post.post_image[0]?.post_image_path.includes("https")
                  ? `${post.post_image[0]?.post_image_path}`
                  : `${url}/storage/${post.post_image[0]?.post_image_path}`
              }
              alt="Sunset in the mountains"
              width="350"
              height="auto"
            />
            <div className="flex flex-col w-full">
              <div className="px-6 py-4 bg-white w-full">
                <Link
                  href={`/posts/${post.id}`}
                  className="font-bold text-xl mb-2"
                >
                  {post.title}
                </Link>
                <p>{post.user.name}</p>
                <p className="text-gray-700 text-base pb-4">
                  {post.body.substring(0, 80)}
                </p>
                <Link
                  href={`/posts/${post.id}`}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded uppercase"
                >
                  Read More
                </Link>
              </div>
              <div className="px-6 pt-4 pb-2 bg-white">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #react
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #typescript
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #css
                </span>
              </div>
            </div>
          </PostCard>
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
