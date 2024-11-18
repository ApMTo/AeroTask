"use client";
import { selectLoggedInUser } from "@/store/slices/users/loggedInUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { loggedInUser } = useSelector(selectLoggedInUser);
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser !== undefined) {
      if (loggedInUser !== null) {
        navigate.push("/tasks");
      } else if (loggedInUser === null) {
        setIsLoading(true);
      }
    }
  }, [loggedInUser, navigate]);

  if (!isLoading) {
    return null;
  }
  return <>{children}</>;
};

export default Layout;
