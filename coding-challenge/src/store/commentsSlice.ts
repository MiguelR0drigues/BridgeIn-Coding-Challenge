import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "../services/api";
import { Comment } from "../types";

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  page: number;
  limit: number;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  page: 1,
  limit: 20,
};

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async (postId: number, { getState, dispatch }) => {
    const state = getState() as { comments: CommentsState };
    const { page, limit } = state.comments;
    const response = await fetchComments(postId, page, limit);
    dispatch(incrementPage());
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    resetCommentPage(state) {
      state.page = 1;
    },
    resetComments(state) {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = [...state.comments, ...action.payload];
      state.loading = false;
    });
    builder.addCase(loadComments.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  incrementPage,
  setLoading,
  setLimit,
  resetCommentPage,
  resetComments,
} = commentsSlice.actions;
export default commentsSlice.reducer;
