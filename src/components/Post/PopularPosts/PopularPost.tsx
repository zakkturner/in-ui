import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { AppDispatch } from "@/store/store";
import axios from "axios";
import {
  getPosts,
  Post,
  getAllPosts,
  getPostsStatus,
} from "../../../store/features/post/postSlice";

const PopularPosts = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  const posts = useAppSelector(getAllPosts);
  useEffect(() => {
    console.log();
  });

  return (
    <div>
      {posts.slice(0, 3).map((post) => {
        return (
          <div
            key={post.id}
            className="py-2 flex justify-between border-b border-[#f05a1f] mb-2"
          >
            <div className="w-1/2 pr-2">
              <h6 className="text-[#28aae2]">React</h6>
              <h5>{post.title}</h5>
              <p>{post.updated_at}</p>
            </div>
            <div className="w-1/2">
              <img
                className="w-full "
                src={`${post.post_image[0].post_image_path}`}
                alt="Sunset in the mountains"
                width="100"
                height="auto"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularPosts;
