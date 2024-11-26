"use client";
import { selectLoggedInUser } from "@/store/slices/users/loggedInUser";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserTask,
  selectTasks,
  updateUserTask,
} from "@/store/slices/tasks/tasksSlice";
import styles from "./task.module.css";
import { acme } from "@/app/fonts";
import Link from "next/link";
import { TaskExample } from "@/store/store";
import { deleteTaskFetch, updateTaskFetch } from "@/app/taskManager/tasks";
import {
  deleteUserInfoCookie,
  getUserInfoCookie,
} from "@/app/cookieManager/cookies";
import { useRouter } from "next/navigation";

interface WarningExample {
  isClicked: boolean;
  title: string;
  name: string;
}

const Page = () => {
  const { loggedInUser } = useSelector(selectLoggedInUser);
  const { tasksData } = useSelector(selectTasks);
  const [isOpened, setIsOpened] = useState<Boolean>(false);
  const [currentTask, setCurrentTask] = useState<TaskExample | null>(null);
  const [currentWarning, setCurrentWarning] = useState<WarningExample>({
    isClicked: false,
    title: "",
    name: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const openTask = (task: TaskExample) => {
    setIsOpened(true);
    setCurrentTask(task);
  };

  const deleteTask = () => {
    if (currentTask === null) return;
    deleteTaskFetch(currentTask?.id);
    dispatch(deleteUserTask(currentTask.id));
    setIsOpened(false);
    setCurrentWarning({ isClicked: false, title: "", name: "" });
  };

  const completedTask = () => {
    if (currentTask === null) return;
    updateTaskFetch({
      ...currentTask,
      id: currentTask.id,
      status: "Completed",
      isCompleted: true,
    });
    dispatch(
      updateUserTask({
        id: currentTask.id,
        status: "Completed",
        isCompleted: true,
      })
    );
    setIsOpened(false);
    setCurrentWarning({ isClicked: false, title: "", name: "" });
  };

  const editTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTask === null) return;

    const title: string = (e.currentTarget[0] as HTMLInputElement).value;
    const task: string = (e.currentTarget[1] as HTMLTextAreaElement).value;
    const status: string = (e.currentTarget[2] as HTMLOptionElement).value;
    const priority: string = (e.currentTarget[3] as HTMLOptionElement).value;
    const editedTask: TaskExample = {
      ...currentTask,
      id: currentTask.id,
      title,
      task,
      status: status === currentTask["status"] ? status : "Pending",
      priority,
    };

    dispatch(updateUserTask(editedTask));
    await updateTaskFetch(editedTask);
    setIsOpened(false);
  };

  const logOut = async () => {
    if (loggedInUser === null) return;
    await deleteUserInfoCookie(loggedInUser.id);
    router.push("/login");
    document.location.reload();
  };
  return (
    <>
      {currentWarning.isClicked ? (
        <>
          <div className={styles.warning}>
            <div className={styles.warningBody}>
              <h2>{currentWarning.name}</h2>
              <button
                onClick={
                  currentWarning.title === "DELETE"
                    ? () => deleteTask()
                    : () => completedTask()
                }
              >
                Yes
              </button>
              <button
                onClick={() =>
                  setCurrentWarning({ isClicked: false, title: "", name: "" })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {isOpened ? (
        <div className={styles.openedTask}>
          {currentTask !== null ? (
            <div className={styles.currentTaskContainer}>
              <header className={styles.currentHeader}>
                <span className={styles.currentPath}>
                  C:/{loggedInUser?.username}/tasks/{currentTask.title}
                </span>
                <button
                  className={styles.currentCloseButton}
                  onClick={() => {
                    setIsOpened(false);
                  }}
                >
                  ✖
                </button>
              </header>
              <div className={styles.currentBody}>
                {currentTask.isEdited ? (
                  <form className={styles.editForm} onSubmit={editTask}>
                    <input
                      type="text"
                      className={styles.editTitleInput}
                      defaultValue={currentTask.title}
                      placeholder="Task Title"
                    />
                    <textarea
                      className={styles.editTaskInput}
                      defaultValue={currentTask.task}
                      placeholder="Task Details"
                    />
                    <select
                      className={styles.editStatusSelect}
                      defaultValue={currentTask.status}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <select
                      className={styles.editPriorityInput}
                      defaultValue={currentTask.priority}
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                    <button type="submit" className={styles.saveButton}>
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() =>
                        setCurrentTask({ ...currentTask, isEdited: false })
                      }
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h2 className={styles.currentTitle}>{currentTask.title}</h2>
                    <p className={styles.currentTask}>{currentTask.task}</p>

                    <p
                      className={
                        currentTask.status === "Pending"
                          ? `${styles.currentPending}`
                          : `${styles.currentCompleted}`
                      }
                    >
                      {currentTask.status}
                    </p>
                    <div className={styles.currentActions}>
                      <button
                        className={styles.currentEditButton}
                        onClick={() =>
                          setCurrentTask({ ...currentTask, isEdited: true })
                        }
                      >
                        ✎ Edit Task
                      </button>
                      {!currentTask.isCompleted ? (
                        <button
                          className={styles.currentCompleteButton}
                          onClick={() =>
                            setCurrentWarning({
                              isClicked: true,
                              title: "COMPLETE",
                              name: `Are you sure you want to mark this task as complete?`,
                            })
                          }
                        >
                          ✔ Mark as Completed
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        className={styles.currentDeleteButton}
                        onClick={() =>
                          setCurrentWarning({
                            isClicked: true,
                            title: "DELETE",
                            name: `Are you sure you want to delete this task?`,
                          })
                        }
                      >
                        ✖ Delete Task
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {tasksData.length >= 1 ? (
        <>
          <div className={styles.tasksHeader}>
            <div>
              <h2 className={acme.className}>Your Tasks</h2>
              <Link href="/add">
                <button
                  className={`${acme.className} ${styles.createTaskBtn} ${styles.mainBtn}`}
                >
                  Create a Task
                </button>
              </Link>
            </div>
            <div>
              <button
                className={`${acme.className} ${styles.logOutBtn} `}
                onClick={() => logOut()}
              >
                Log Out
              </button>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.tasksBody}>
            {tasksData.map((task) => {
              return (
                <div
                  className={`${styles.taskContainer} ${acme.className}`}
                  key={task.id}
                  onClick={() => openTask(task)}
                >
                  <h2 className={styles.title}>{task.title}</h2>
                  <p className={styles.task}>
                    {task.task.length <= 18
                      ? task.task
                      : `${task.task.slice(0, 18)}...`}
                  </p>
                  <p
                    className={
                      task.status === "Pending"
                        ? `${styles.pending}`
                        : `${styles.completed}`
                    }
                  >
                    {task.status}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className={styles.notfounded}>
            <h2 className={acme.className}>You have no tasks</h2>
            <Link href="/add">
              <button className={`${acme.className} ${styles.createTaskBtn}`}>
                Create a task
              </button>
            </Link>
            <button
              className={`${styles.logOutBtn} ${styles.logOutBtnNF}`}
              onClick={() => logOut()}
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
