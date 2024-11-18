import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userObject = await req.json();
  const defaultUser = {
    ...userObject,
  };
  const fetchResponse = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(defaultUser),
  });

  const res = NextResponse.json({ message: "User Created" });

  return res;
}
