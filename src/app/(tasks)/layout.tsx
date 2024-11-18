"use client";
import { selectLoggedInUser } from "@/store/slices/users/loggedInUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks, selectTasks } from "@/store/slices/tasks/tasksSlice";
import { getTasks } from "@/app/userManager/users";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { loggedInUser } = useSelector(selectLoggedInUser);
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (loggedInUser !== undefined) {
        if (loggedInUser === null) {
          navigate.push("/login");
        } else {
          const tasks = await getTasks(loggedInUser.id);
          await dispatch(getUserTasks(tasks));
          setIsLoading(true);
        }
      }
    };
    fetchData();
  }, [loggedInUser, navigate]);

  if (!isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default Layout;
