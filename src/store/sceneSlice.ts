import { createSlice } from "@reduxjs/toolkit";

export const sceneSlice = createSlice({
  name: "scene",
  initialState: {
    pointCloudFile: null,
  },
  reducers: {
    setPointCloudFile: (state, action) => {
      state.pointCloudFile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPointCloudFile } = sceneSlice.actions;

export default sceneSlice.reducer;
