import { configureStore } from "@reduxjs/toolkit";
import itemReducer from '../features/item/itemSlice';
import listReducer from '../features/list/listSlice';

export const store = configureStore({
  reducer: {
    item: itemReducer,
    list: listReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;