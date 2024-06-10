import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../services/api";
import { Post } from "../types";
import { RootState } from "./store";

interface PostsState {
  posts: Post[];
  total: number;
  loading: boolean;
  page: number;
  pageSize: number;
}

const initialState: PostsState = {
  posts: [],
  total: 0,
  loading: false,
  page: 1,
  pageSize: 20,
};

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (_, { getState }) => {
    const { page, pageSize } = (getState() as RootState).posts;
    const response = await fetchPosts(page, pageSize);
    return {
      posts: response.data,
      total: parseInt(response.headers["x-total-count"], 10),
    };
  }
);

export const loadPostsForUser = createAsyncThunk(
  "posts/loadPostsForUser",
  async (userId: number, { getState }) => {
    const { page, pageSize } = (getState() as RootState).posts;
    const response = await fetchPosts(page, pageSize, userId);

    return {
      posts: response.data,
      total: parseInt(response.headers["x-total-count"], 10),
    };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetPage: (state) => {
      state.page = 1;
    },
    resetPosts: (state) => {
      state.posts = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPostsForUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadPostsForUser.fulfilled, (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts];
      state.total = action.payload.total;
      state.loading = false;
    });
    builder.addCase(loadPostsForUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setPageSize, incrementPage, resetPage, resetPosts } =
  postsSlice.actions;
export default postsSlice.reducer;
