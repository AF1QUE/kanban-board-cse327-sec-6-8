import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  work: undefined,
  workspaceByid: [],
};

const WorkSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    workSpace: (state, action) => {
      state.work = action.payload;
    },
    workspaceByid: (state, action) => {
      state.work = action.payload;
    },
  },
});

export const { workSpace, workspaceByid } = WorkSlice.actions;
export default WorkSlice.reducer;
