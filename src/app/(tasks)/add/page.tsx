"use client";

import React, { FormEvent } from "react";
import styles from "./add.module.css";
import { acme } from "@/app/fonts";
import { NewTask } from "@/utils/tasksHelper";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addUserTask } from "@/store/slices/tasks/tasksSlice";
import { addTaskFetch } from "@/app/taskManager/tasks";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const id: string = userId ? JSON.parse(userId) : "";
    const title = (e.currentTarget[0] as HTMLInputElement).value;
    const task = (e.currentTarget[1] as HTMLTextAreaElement).value;
    const priority = (e.currentTarget[2] as HTMLOptionElement).value;
    const taskObj = new NewTask(
      new Date().getTime().toString(),
      id,
      title,
      task,
      "Pending",
      false,
      priority,
      false
    );

    dispatch(addUserTask(taskObj));
    await addTaskFetch(taskObj);
    router.push("/tasks");
  };

  return (
    <div className={styles.addTaskPage}>
      <div className={styles.addTaskContainer}>
        <div className={styles.goBack} onClick={() => router.push("/tasks")}>
          <span>✖</span>
        </div>
        <h2 className={`${styles.title} ${acme.className}`}>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            required
          />
          <textarea
            placeholder="Task Description"
            className={styles.input}
            required
          />
          <select className={styles.select} defaultValue="Low">
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button type="submit" className={styles.submitButton}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
