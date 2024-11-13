import { UserExample } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  loggedInUser: UserExample | null;
}
const initialState: State = {
  loggedInUser: null,
};

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    updateUser: (state, { payload }: PayloadAction<UserExample>) => {
      state.loggedInUser = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const selectLoggedInUser = (state: { loggedInUser: State }) =>
  state.loggedInUser;
export const { updateUser } = loggedInUserSlice.actions;
export const loggedInUserReducer = loggedInUserSlice.reducer;
