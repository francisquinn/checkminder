import { configureStore } from "@reduxjs/toolkit";
import coreReducer from '../features/core/coreSlice';

export const store = configureStore({
  reducer: {
    core: coreReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;