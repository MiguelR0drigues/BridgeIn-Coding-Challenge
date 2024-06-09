import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/api";
import { User } from "../types";

interface UsersState {
  users: User[];
  usersMap: Record<number, User>;
  loading: boolean;
}

const initialState: UsersState = {
  users: [],
  usersMap: {},
  loading: false,
};

export const loadUsers = createAsyncThunk("users/loadUsers", async () => {
  const response = await fetchUsers();
  const finalData = response.data.map((user: User) => ({
    ...user,
    color: `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`,
  }));
  return finalData;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.usersMap = action.payload.reduce(
        (map: User[], user: User) => {
          map[user.id] = user;
          return map;
        },
        {} as Record<number, User>
      );
      state.loading = false;
    });
    builder.addCase(loadUsers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default usersSlice.reducer;
