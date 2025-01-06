import { createSlice } from "@reduxjs/toolkit";

export type List = {
  id: string,
  name: string
};

interface ListState {
  lists: List[],
  isCreating: boolean
};

const initialState: ListState = {
  lists: JSON.parse(localStorage.getItem('lists') || '[]') as List[],
  isCreating: false
};

const listSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    create: (state, action) => {
      localStorage.setItem('lists', JSON.stringify([...state.lists, action.payload]));
      state.lists.push(action.payload);
    },
    isCreating: (state) => {
      state.isCreating = true;
    }
  }
});

export const { isCreating, create } = listSlice.actions;

export default listSlice.reducer;
