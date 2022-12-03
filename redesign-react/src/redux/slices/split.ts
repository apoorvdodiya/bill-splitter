import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

export const splitSlice = createSlice({
  name: "group",
  initialState: {
    userGroups: [],
    userSplits: [],
    userList: [],
    addedSplit: null,
  },
  reducers: {
    getUserSplits: (s, action) => {
      s.userSplits = action.payload.data;
    },
    getUserGroups: (s, action) => {
      s.userGroups = action.payload.data;
    },
    getAllUsers: (s, action) => {
      s.userList = action.payload.data;
    },
    getAllGroups: (s, action) => {
      s.userList = action.payload.data;
    },
    splitCreated: (s, action) => {
      s.addedSplit = action.payload.data;
    },
  },
});

export const { getUserSplits, getUserGroups, getAllUsers, splitCreated } = splitSlice.actions;
export default splitSlice.reducer;
