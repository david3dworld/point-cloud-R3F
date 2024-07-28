import { configureStore } from "@reduxjs/toolkit";
import sceneReducer from "./sceneSlice";

const store = configureStore({
  reducer: {
    scene: sceneReducer
  }
});

// Define the RootState based on the store's state
export type RootState = ReturnType<typeof store.getState>;

export default store;
