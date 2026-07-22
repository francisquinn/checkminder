import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Checklist = {
  id: string,
  name: string
};

export type ChecklistItem = {
  id: string,
  name: string,
  list_id: string
};

type Entries = 'lists' | 'items';

interface coreState {
  lists: Checklist[],
  items: ChecklistItem[],
  currentListId: string,
};

const initialState: coreState = {
  lists: JSON.parse(localStorage.getItem('lists') || '[]') as Checklist[],
  items: JSON.parse(localStorage.getItem('items') || '[]') as ChecklistItem[],
  currentListId: '',
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
  }
});

export const {
  setCurrentListId,
  createList,
  createItem,
  updateList,
  updateItem,
  deleteList,
  deleteItem
} = coreSlice.actions;

// Reducer functions
const updateEntry = <T extends { id: string; name: string }>(entries: T[], payload: { id: string; name: string }): T[] => {
  return entries.map(entry => entry.id === payload.id ? { ...entry, name: payload.name } : entry);
};

const removeEntry = <T extends { id: string }>(entries: T[], payload: { id: string }): T[] => {
  return entries.filter(entry => entry.id !== payload.id);
};

const setLocalStorage = (entryType: Entries, entries: Checklist[] | ChecklistItem[]): void => {
  localStorage.setItem(entryType, JSON.stringify(entries));
};

// Selectors
export const selectCore = (state: RootState) => state.core;
export const selectLists = (state: RootState) => state.core.lists;
const selectItems = (state: RootState) => state.core.items;
const selectListId = (_state: RootState, listId: string) => listId;

export const selectListItems = createSelector(
  [selectItems, selectListId],
  (items, listId): ChecklistItem[] => items.filter(item => item.list_id === listId)
);

export const selectListById = createSelector(
  [selectLists, selectListId],
  (lists, listId): Checklist | undefined => lists.find(list => list.id === listId)
);

export default coreSlice.reducer;
