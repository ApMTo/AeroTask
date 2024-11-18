import { UserExample } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

interface State {
  usersData: UserExample[];
}
const initialState: State = {
  usersData: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const selectUsers = (state: { users: State }) => state.users;
export const { } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;