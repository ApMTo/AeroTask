import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { token } = await req.json();

  const fetchResponse = await fetch(`http://localhost:3001/sessions/${token}`, {
    method: "DELETE",
  });

  const res = NextResponse.json({ message: "Cookie deleted" });
  res.cookies.set("USER_INFO", "", { expires: new Date(0), path: "/" });

  return res;
}
