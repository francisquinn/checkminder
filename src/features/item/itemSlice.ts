import { createSlice } from "@reduxjs/toolkit";

export type Item = {
  id: string,
  name: string,
  list_id: string
};

interface ItemState {
  items: Item[]
};

const initialState: ItemState = {
  items: JSON.parse(localStorage.getItem('items') || '[]') as Item[]
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log(state, action);
    }
  }
});

export const { addItem } = itemSlice.actions;

export default itemSlice.reducer;
