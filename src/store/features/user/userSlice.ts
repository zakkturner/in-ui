"use client";

import { RootState } from "@/store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const url = process.env.NEXT_PUBLIC_API_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  user_id: number;
  email_verified_at: Date;
  password: string;
}

type Args = {
  email: string;
  password: string;
};

export const getCsrf = createAsyncThunk("user/getCsrf", async () => {
  const response = await axios.get(`${url}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
  return Object.values(response.config.headers).flat()[1];
});

/**
 * User Auth Thunks
 */
export const login = createAsyncThunk(
  "user/login",
  async (args: Args, { getState }) => {
    const state = getState() as RootState;
    const { email, password } = args;
    console.log(email);
    try {
      console.log(state.user.csrf, email, password);

      await axios.post(
        `${url}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": state.user.csrf,
          },
        }
      );

      const response: AxiosResponse<User> = await axios.get(`${url}/api/user`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": state.user.csrf,
        },
      });

      // If window is no
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      // Return the User object from the response
      return response.data;
    } catch (e: unknown) {
      state.user.error = e;
      state.user.status = "failed";
      throw e;
    }
  }
);
export const getAuthUser = createAsyncThunk(
  "user/getAuthUser",
  async (_, thunkAPI) => {
    console.log("working");
    const state = thunkAPI.getState() as RootState;

    try {
      const response = await axios.get(`${url}/api/user`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": state.user.csrf,
        },
      });
      console.log("User", response.data);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (e: unknown) {
      thunkAPI.rejectWithValue(e);
      throw e;
    }
  }
);

export interface LoginState {
  user: User | any;
  csrf: string;
  status: "idle" | "loading" | "succeeded" | "failed" | "authenticated";
  error?: any;
  isLoggedIn?: boolean;
}

const initialState: LoginState = {
  user: JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "{}"
  ),
  csrf: "",
  status: "idle",
  error: null,
  isLoggedIn: Boolean(
    typeof window !== "undefined" && localStorage.getItem("user")
  ),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCsrf.fulfilled, (state, action) => {
      state.csrf = action.payload;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload; // Set the user state to the returned User object
      state.error = null;
      state.status = "succeeded"; // Update the status to "succeeded"
      state.isLoggedIn = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(getAuthUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(getAuthUser.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
    });
  },
});
export const getCsrfToken = (state: RootState) => state.user.csrf;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUser = (state: RootState) => state.user.user;
export const isLoggedIn = (state: RootState) => state.user.isLoggedIn;

export default userSlice.reducer;
