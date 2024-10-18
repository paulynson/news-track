import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticlesProps } from "@/types";

const initialState = {
  allArticles: [] as ArticlesProps[],
  allBlogs: [] as ArticlesProps[],
  allReports: [] as ArticlesProps[],
};

// Redux slice
const newsSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    storeArticles: (state, action: PayloadAction<ArticlesProps[]>) => {
      state.allArticles = action.payload;
    },
    storeBlogs: (state, action: PayloadAction<ArticlesProps[]>) => {
      state.allBlogs = action.payload;
    },
    storeReports: (state, action: PayloadAction<ArticlesProps[]>) => {
      state.allReports = action.payload;
    },
  },
});

export const { storeArticles, storeBlogs, storeReports } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
