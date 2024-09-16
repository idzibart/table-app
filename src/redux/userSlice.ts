import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../lib/types";

type UserState = {
  users: User[];
  filteredUsers: User[];
  pending: boolean;
  error: boolean;
};

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  pending: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.pending = true;
      state.error = false;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.pending = false;
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    fetchUsersFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    filterUsers: (
      state,
      action: PayloadAction<{
        name?: string;
        username?: string;
        email?: string;
        phone?: string;
      }>,
    ) => {
      const { name, username, email, phone } = action.payload;
      state.filteredUsers = state.users.filter(
        (user) =>
          (name
            ? user.name.toLowerCase().includes(name.toLowerCase())
            : true) &&
          (username
            ? user.username.toLowerCase().includes(username.toLowerCase())
            : true) &&
          (email
            ? user.email.toLowerCase().includes(email.toLowerCase())
            : true) &&
          (phone
            ? user.phone.toLowerCase().includes(phone.toLowerCase())
            : true),
      );
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  filterUsers,
} = userSlice.actions;

export default userSlice.reducer;
