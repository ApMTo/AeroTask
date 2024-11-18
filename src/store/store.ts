`use client`;

import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/users/userSlice";
import { loggedInUserReducer } from "./slices/users/loggedInUser";
import { tasksReducer } from "./slices/tasks/tasksSlice";

export interface UserExample {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface TaskExample {
  id: string;
  userId: string;
  title: string;
  task: string;
  status: "Pending" | "Completed";
  isCompleted: boolean;
  priority: string;
  isEdited: boolean;
}

const store = configureStore({
  reducer: {
    users: usersReducer,
    loggedInUser: loggedInUserReducer,
    tasks: tasksReducer,
  },
});

export default store;
