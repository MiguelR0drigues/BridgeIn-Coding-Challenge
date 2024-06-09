import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./commentsSlice";
import postsReducer from "./postsSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
