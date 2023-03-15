import { createSlice } from "@reduxjs/toolkit";

interface NavigationState {
  currentPath: string;
}

const initialState: NavigationState = {
  currentPath: "",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    updateCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
  },
});

export const { updateCurrentPath } = navigationSlice.actions;

export default navigationSlice.reducer;
