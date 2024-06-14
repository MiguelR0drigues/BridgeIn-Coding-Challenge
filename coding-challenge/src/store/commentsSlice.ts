import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchComments } from "../services/api";
import { Comment } from "../types";

interface CommentsState {
  comments: Comment[];
  cachedComments: Comment[];
  total: number;
  loading: boolean;
  page: number;
  limit: number;
}

const initialState: CommentsState = {
  comments: [],
  cachedComments: [],
  total: 0,
  loading: false,
  page: 1,
  limit: 20,
};

export const loadComments = createAsyncThunk(
  "comments/loadComments",
  async (postId: number, { getState, dispatch }) => {
    const { page, limit, cachedComments, comments } = (
      getState() as { comments: CommentsState }
    ).comments;
    const response = await fetchComments(postId, page, limit);

    // Filter out response comments that have the same id as any cached comment
    const filteredResponseComments = response.data.filter(
      (responseComment: Comment) =>
        !cachedComments.some(
          (cachedComment) => cachedComment.id === responseComment.id
        )
    );

    // Merge cachedComments and filteredResponseComments
    const mergedComments = [...cachedComments, ...filteredResponseComments];

    // Merge with existing comments
    const existingCommentsMap = new Map(
      comments.map((comment) => [comment.id, comment])
    );
    mergedComments.forEach((comment) =>
      existingCommentsMap.set(comment.id, comment)
    );
    const finalComments = Array.from(existingCommentsMap.values());

    dispatch(incrementCommentPage());

    return {
      comments: finalComments,
      total: parseInt(response.headers["x-total-count"], 10),
    };
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    incrementCommentPage(state) {
      state.page += 1;
    },
    setCommentLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCommentLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    resetCommentPage(state) {
      state.page = 1;
    },
    resetComments(state) {
      state.comments = [];
      state.total = 0;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.cachedComments.unshift(action.payload);
      state.comments.unshift(action.payload);
      state.total += 1;
    },
    addCachedComment(state, action: PayloadAction<Comment>) {
      state.cachedComments.unshift(action.payload);
    },
    mergeCachedComments(state) {
      const uniqueComments = new Set([
        ...state.cachedComments,
        ...state.comments,
      ]);
      state.comments = Array.from(uniqueComments);
      state.total += state.cachedComments.length;
    },
    removeComment(state, action: PayloadAction<number>) {
      const commentIdToDelete = action.payload;
      state.comments = state.comments.filter(
        (comment) => comment.id !== commentIdToDelete
      );
      state.cachedComments = state.cachedComments.filter(
        (comment) => comment.id !== commentIdToDelete
      );
      state.total -= 1;
    },
    editComment(state, action: PayloadAction<Comment>) {
      const commentId = action.payload.id;
      const commentIndex = state.comments.findIndex(
        (comment) => comment.id === commentId
      );
      const cachedCommentIndex = state.cachedComments.findIndex(
        (comment) => comment.id === commentId
      );
      if (commentIndex !== -1) {
        state.comments[commentIndex] = action.payload;
      }
      if (cachedCommentIndex !== -1) {
        state.cachedComments[cachedCommentIndex] = action.payload;
      } else {
        state.cachedComments.unshift(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.total = action.payload.total;
      state.loading = false;
    });
    builder.addCase(loadComments.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  incrementCommentPage,
  setCommentLoading,
  setCommentLimit,
  resetCommentPage,
  resetComments,
  addComment,
  addCachedComment,
  mergeCachedComments,
  removeComment,
  editComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;
