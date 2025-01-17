import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Entry = {
  id: string,
  name: string,
  list_id?: string
};

type Entries = 'lists' | 'items';

interface coreState {
  lists: Entry[],
  items: Entry[],
  currentListId: string,
  isChecking: boolean,
  isCreating: boolean
};

const initialState: coreState = {
  lists: JSON.parse(localStorage.getItem('lists') || '[]') as Entry[],
  items: JSON.parse(localStorage.getItem('items') || '[]') as Entry[],
  currentListId: '',
  isChecking: false,
  isCreating: false
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
      state.lists = updateEntry(state.lists, action.payload);
      setLocalStorage('lists', state.lists);
    },
    deleteList: (state, action) => {
      state.lists = removeEntry(state.lists, action.payload);
      setLocalStorage('lists', state.lists);
    },
    createItem: (state, action) => {
      localStorage.setItem('items', JSON.stringify([...state.items, action.payload]));
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      state.items = updateEntry(state.items, action.payload);
      setLocalStorage('items', state.items);
    },
    deleteItem: (state, action) => {
      state.items = removeEntry(state.items, action.payload);
      setLocalStorage('items', state.items);
    },
    setCurrentListId: (state, action) => {
      state.currentListId = action.payload;
    },
    isCheckingItems: (state, action) => {
      state.isChecking = action.payload;
    },
    isCreatingList: (state, action) => {
      state.isCreating = action.payload;
    }
  }
});

export const {
  isCheckingItems,
  isCreatingList,
  setCurrentListId,
  createList,
  createItem,
  updateList,
  updateItem,
  deleteList,
  deleteItem
} = coreSlice.actions;

// Reducer functions
const updateEntry = (entries: Entry[], payload: Entry): Entry[] => {
  return entries.map(entry => {
    if (entry.id === payload.id) {
      return { ...entry, name: payload.name };
    }
    return entry;
  });
};

const removeEntry = (entries: Entry[], payload: Entry): Entry[] => {
  return entries.filter(entry => entry.id !== payload.id);
};

const setLocalStorage = (entryType: Entries, entries: Entry[] | string): void => {
  localStorage.setItem(entryType, JSON.stringify(entries));
};

// Selectors
export const selectCore = (state: RootState) => state.core;
export const selectLists = (state: RootState) => state.core.lists;
const selectItems = (state: RootState) => state.core.items;
const selectListId = (_state: RootState, listId: string) => listId;
export const selectIsChecking = (state: RootState) => state.core.isChecking;
export const selectIsCreating = (state: RootState) => state.core.isCreating;

export const selectListItems = createSelector(
  [selectItems, selectListId],
  (items, listId): Entry[] => {
    return items.filter((item: Entry) => item.list_id === listId);
  }
);

export const selectListById = createSelector(
  [selectLists, selectListId],
  (lists, listId): Entry | undefined => {
    return lists.find((list: Entry) => list.id === listId);
  }
);

export default coreSlice.reducer;
