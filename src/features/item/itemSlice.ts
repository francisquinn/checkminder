import { createSlice } from "@reduxjs/toolkit";

type Item = {
  id: string,
  name: string,
  list_id: string
};

interface ItemState {
  items: Item[]
};

const initialState: ItemState = {
  items: []
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
