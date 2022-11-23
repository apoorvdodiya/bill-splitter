import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { IGroupState } from "../../interfaces/api";
import { IGroup } from "../../interfaces/group";

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    userGroups: [],
    userList: [],
    addedGroup: null
  },
  reducers: {
    getUserGroups: (s, action) => {
      s.userGroups = action.payload.data;
    },
    getAllUsers: (s, action) => {
      s.userList = action.payload.data;
    },
    groupAdded: (s, action) => {
      s.addedGroup = action.payload.data;
    },
  },
});

export const { getUserGroups, getAllUsers, groupAdded } = groupSlice.actions;
export default groupSlice.reducer;
