import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
  },
  reducers: {
    getUserList: (s, action) => {
      s.userList = action.payload.data;
    },
  },
});

export const { getUserList } = userSlice.actions;
export default userSlice.reducer;
