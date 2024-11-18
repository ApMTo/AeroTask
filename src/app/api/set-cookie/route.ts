import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const token = uuidv4();
  const cookieData = JSON.stringify({ id: userId, token });

  const fetchResponse = await fetch("http://localhost:3001/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: cookieData,
  });

  if (!fetchResponse.ok) {
    console.error("Failed to save session data on the server.");
    return NextResponse.json(
      { message: "Failed to set cookie" },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ message: "Cookie set" });
  res.cookies.set("USER_INFO", encodeURIComponent(token), { path: "/" });
  // res.cookies.set("USER_INFO", "", { expires: new Date(0), path: "/" });


  return res;
}
