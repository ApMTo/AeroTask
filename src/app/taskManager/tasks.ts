"use client";

import { TaskExample } from "@/store/store";

export interface TaskUpdateExample {
  id: string;
  status: "Pending" | "Completed";
  isCompleted: boolean;
}

export const addTaskFetch = async (taskObj: TaskExample) => {
  const request = await fetch("http://localhost:3000/api/set-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  });
};

export const deleteTaskFetch = async (taskId: TaskExample["id"]) => {
  const request = await fetch("http://localhost:3000/api/delete-task", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId }),
  });
};

export const updateTaskFetch = async (Obj: TaskExample) => {
  const request = await fetch("http://localhost:3000/api/update-task", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Obj),
  });
};

