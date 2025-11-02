import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState, type Post } from "./slice.types";

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.list = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.list.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const i = state.list.findIndex((p) => p.id === action.payload.id);
      if (i !== -1) state.list[i] = action.payload;
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setPosts, addPost, updatePost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
