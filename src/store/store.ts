"use client";

import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/post/postSlice";
import navigationReducer from "./features/navigation/navigationSlice";
import userReducer from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    posts: postReducer,
    navigation: navigationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
