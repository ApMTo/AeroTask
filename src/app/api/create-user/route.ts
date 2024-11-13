import supabase from "@/db/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userObject = await req.json();
  const defaultUser = {
    ...userObject,
    profileImage: "",
    tasks: [],
  };
  const { data, error } = await supabase
    .from("users") 
    .insert([defaultUser]);

  if (error) {
    console.error("Ошибка при отправке данных:", error);
    return;
  }

  console.log("Новый пользователь добавлен:", data);

  const res = NextResponse.json({ message: "User Created" });

  return res;
}
