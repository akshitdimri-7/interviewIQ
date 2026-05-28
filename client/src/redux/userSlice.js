import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",

  initialState: {
    userData: null,
  },

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { userData } = userSlice.actions;

export default userSlice.reducer;
