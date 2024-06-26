import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts as apiFetchPosts } from "../services/api";
import { Post } from "../types";
import { RootState } from "./store";

interface PostsState {
  posts: Post[];
  cachedPosts: Post[];
  total: number;
  loading: boolean;
  page: number;
  pageSize: number;
}

const initialState: PostsState = {
  posts: [],
  cachedPosts: [],
  total: 0,
  loading: false,
  page: 1,
  pageSize: 20,
};

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (userId: number | undefined, { getState }) => {
    const { page, pageSize, cachedPosts, posts } = (getState() as RootState)
      .posts;
    const response = await apiFetchPosts(page, pageSize, userId);

    // Filter out response posts that have the same id as any cached post
    const filteredResponsePosts = response.data.filter(
      (responsePost: Post) =>
        !cachedPosts.some((cachedPost) => cachedPost.id === responsePost.id)
    );

    // Merge cachedPosts and filteredResponsePosts
    const mergedPosts = [...cachedPosts, ...filteredResponsePosts];

    // Merge with existing posts
    const existingPostsMap = new Map(posts.map((post) => [post.id, post]));
    mergedPosts.forEach((post) => existingPostsMap.set(post.id, post));
    const finalPosts = Array.from(existingPostsMap.values());

    return {
      posts: finalPosts,
      total: parseInt(response.headers["x-total-count"], 10),
    };
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
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
    addPost: (state, action: PayloadAction<Post>) => {
      state.cachedPosts.unshift(action.payload);
      state.posts.unshift(action.payload);
      state.total += 1;
    },
    addCachedPost: (state, action: PayloadAction<Post>) => {
      state.cachedPosts.unshift(action.payload);
    },
    mergeCachedPosts: (state) => {
      const uniquePosts = new Set([...state.cachedPosts, ...state.posts]);
      console.log(state.cachedPosts);
      state.posts = Array.from(uniquePosts);
      state.total += state.cachedPosts.length;
    },
    removePost: (state, action: PayloadAction<number>) => {
      const postIdToDelete = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postIdToDelete);
      state.cachedPosts = state.cachedPosts.filter(
        (post) => post.id !== postIdToDelete
      );
      state.total -= 1;
    },
    editPost: (state, action: PayloadAction<Post>) => {
      const postId = action.payload.id;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      const cachedPostIndex = state.cachedPosts.findIndex(
        (post) => post.id === postId
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = action.payload;
      }
      if (cachedPostIndex !== -1) {
        state.cachedPosts[cachedPostIndex] = action.payload;
      } else {
        state.cachedPosts.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.total = action.payload.total;
      state.loading = false;
    });
    builder.addCase(loadPosts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setPageSize,
  incrementPage,
  resetPage,
  resetPosts,
  addPost,
  addCachedPost,
  mergeCachedPosts,
  removePost,
  editPost,
} = postsSlice.actions;
export default postsSlice.reducer;
