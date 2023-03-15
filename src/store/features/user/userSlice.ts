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
      console.log("User: ", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      // Return the User object from the response
      return response.data;
    } catch (e: unknown) {
      console.log(e);
      state.user.error = e;
      state.user.status = "failed";
      throw e;
    }
  }
);

// export const login = createAsyncThunk(
//   "user/login",
//   async (args: Args, { getState }) => {
//     const state = getState() as RootState; // Cast the state to the RootState interface
//     const { email, password } = args;
//     console.log(email);
//     try {
//       console.log(state.user.csrf, email, password);

//       await axios.post(
//         `${url}/login`,
//         { email, password },
//         {
//           withCredentials: true,
//           headers: {
//             Accept: "application/json",
//             "X-XSRF-TOKEN": state.user.csrf, // Access the csrf value directly
//           },
//         }
//       );

//       const response: AxiosResponse<User> = await axios.get(`${url}/api/user`, {
//         withCredentials: true,
//         headers: {
//           Accept: "application/json",
//           "X-XSRF-TOKEN": state.user.csrf, // Access the csrf value directly
//         },
//       });
//       console.log("User: ", response.data);
//       //   window.location.pathname = "./dashboard/";
//     } catch (e: unknown) {
//       console.log(e);
//       state.user.error = Object.values(e.response).flat().join(", ");
//       state.user.status = "failed";
//     }
//   }
// );
export interface LoginState {
  user: User | any;
  csrf: string;
  status: "idle" | "loading" | "succeeded" | "failed" | "authenticated";
  error?: any;
}

const initialState: LoginState = {
  user: JSON.parse(localStorage.getItem("user") || "{}"),
  csrf: "",
  status: "idle",
  error: null,
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
    });

    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.error = action.payload;
      state.status = "failed";
    });
  },
});
export const getCrsfToken = (state: RootState) => state.user.csrf;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
