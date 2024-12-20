import { createSlice } from "@reduxjs/toolkit";

export type List = {
  id: string,
  name: string
};

interface ListState {
  lists: List[]
};

const initialState: ListState = {
  lists: JSON.parse(localStorage.getItem('lists') || '[]') as List[]
};

const listSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addList: (state, action) => {
      console.log(state, action);
    }
  }
});

export const { addList } = listSlice.actions;

export default listSlice.reducer;
