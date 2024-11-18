import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email } = await req.json();

  const response = await fetch(`http://localhost:3001/users?email=${email}`);

  if (!response.ok) {
    return NextResponse.json({ success: true, message: "User not found" });
  }

  const user = await response.json();
  if (user.length === 0) {
    return NextResponse.json({ success: true, message: "User not found" });
  }

  return NextResponse.json({
    success: false,
    message: "This email is already in use",
  });
};
