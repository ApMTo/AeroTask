import { TaskUpdateExample } from "@/app/taskManager/tasks";
import { TaskExample } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  tasksData: TaskExample[];
}
const initialState: State = {
  tasksData: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getUserTasks: (state, { payload }: PayloadAction<TaskExample[]>) => {
      state.tasksData = payload;
    },
    addUserTask: (state, { payload }: PayloadAction<TaskExample>) => {
      state.tasksData.push(payload);
    },
    deleteUserTask: (state, { payload }: PayloadAction<TaskExample["id"]>) => {
      state.tasksData = state.tasksData.filter((task) => task.id !== payload);
    },
    updateUserTask: (state, { payload }) => {
      state.tasksData = state.tasksData.map((task) =>
        task.id === payload.id ? { ...task, ...payload } : task
      );
    },
  },
  extraReducers: (builder) => {},
});

export const selectTasks = (state: { tasks: State }) => state.tasks;
export const { getUserTasks, addUserTask, deleteUserTask, updateUserTask } =
  taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
