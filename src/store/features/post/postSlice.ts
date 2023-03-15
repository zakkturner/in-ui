"use client";

import { RootState } from "@/store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_API_URL;

export interface Post {
  id: number;
  body: string;
  title: string;
  user_id: number;
  post_image: PostImage[];
  updated_at: string;
  created_at: string;
  user: [];
}
export interface PostImage {
  blog_post_id: number;
  id: number;
  post_image_caption: string;
  post_image_path: string;
  updated_at: string;
  created_at: string;
}

export const getPosts = createAsyncThunk<Post[]>("posts/getPosts", async () => {
  console.log(`${url}/posts`);
  const response = await axios.get(`${url}/api/posts`);
  return response.data;
});

export interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending state when fetchPosts is called
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      // Handle success state when fetchPosts is resolved
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      // Handle failure state when fetchPosts is rejected
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export const getAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;

export default postsSlice.reducer;
