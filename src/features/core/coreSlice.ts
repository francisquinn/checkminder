import { createSelector, createSlice } from "@reduxjs/toolkit";

export type List = {
  id: string,
  name: string,
  list_id?: string
};

interface ListState {
  lists: List[],
  items: List[],
  currentListId: string,
  isCreating: boolean,
  isDeleting: boolean
};

const initialState: ListState = {
  lists: JSON.parse(localStorage.getItem('lists') || '[]') as List[],
  items: JSON.parse(localStorage.getItem('items') || '[]') as List[],
  currentListId: '',
  isCreating: false,
  isDeleting: false
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    createList: (state, action) => {
      localStorage.setItem('lists', JSON.stringify([...state.lists, action.payload]));
      state.lists.push(action.payload);
    },
    updateList: (state, action) => {
      state.lists = state.lists.map(list => {
        if (list.id === action.payload.id) {
          return { ...list, name: action.payload.name };
        }
        return list;
      });

      localStorage.setItem('lists', JSON.stringify(state.lists));
    },
    deleteList: (state, action) => {
      if (!window.confirm(`Are you sure you want to delete ${action.payload.name}?`)) return;
      state.lists = state.lists.filter(list => list.id !== action.payload.id);
      localStorage.setItem('lists', JSON.stringify(state.lists));
    },
    createItem: (state, action) => {
      localStorage.setItem('items', JSON.stringify([...state.items, action.payload]));
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      state.items = state.items.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, name: action.payload.name };
        }
        return item;
      });

      localStorage.setItem('items', JSON.stringify(state.items));
    },
    deleteItem: (state, action) => {
      if (!window.confirm(`Are you sure you want to delete ${action.payload.name}?`)) return;
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('items', JSON.stringify(state.items));
    },
    setCurrentListId: (state, action) => {
      state.currentListId = action.payload;
    },
    isCreatingList: (state, action) => {
      state.isCreating = action.payload;
    }
  }
});

export const {
  isCreatingList,
  setCurrentListId, 
  createList, 
  createItem, 
  updateList,
  updateItem, 
  deleteList,
  deleteItem
} = coreSlice.actions;

// Selectors
export const selectLists = (state) => state.core.lists;
export const selectListById = (state, id) => state.core.lists.find(list => list.id === id);
export const selectListItems = (state, listId) => {
  return state.core.items.filter(item => item.list_id === listId);
}

export default coreSlice.reducer;
