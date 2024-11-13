"use client";

import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/components/NavBar/Navbar";
import { useEffect } from "react";
import { getUserInfoCookie } from "@/app/cookieManager/cookies";
import { getSession, getUser } from "@/app/userManager/users";
import store from "@/store/store";
import { Provider } from "react-redux";
import { updateUser } from "@/store/slices/users/loggedInUser";

export default function Providers({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const cookie = getUserInfoCookie();
      if (cookie) {
        const session = await getSession(cookie);
        if (session) {
          const user = await getUser(session[0].id);
          dispatch(updateUser(user));
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <Navbar />
      {children}
    </Provider>
  );
}
