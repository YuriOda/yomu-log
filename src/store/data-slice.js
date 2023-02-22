import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data-slice",
  initialState: {
    savedBooks: [],
    articles: [],
    newBook: [],
  },
  reducers: {
    selectBook(state, action) {
      if (state.savedBooks.bookId === action.payload.bookId) {
        return;
      }
      state.newBook = action.payload;
    },
    addToSavedBooks(state, action) {
      if (state.savedBooks.bookId === action.payload.bookId) {
        return;
      }
      state.savedBooks = state.savedBooks.concat(action.payload);
    },
    addToArticles(state, action) {
      if (state.articles.articleId === action.payload.articleId) {
        return;
      }
      state.articles = state.articles.concat(action.payload);
    },
    replaceSavedBooks(state, action) {
      state.savedBooks = action.payload;
    },
    replaceArticles(state, action) {
      state.articles = action.payload;
    },
  },
});

export const dataSliceActions = dataSlice.actions;
export default dataSlice.reducer;
