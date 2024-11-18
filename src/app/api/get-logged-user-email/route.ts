import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const userObj = await req.json();

  const response = await fetch(
    `http://localhost:3001/users?email=${userObj.email}`
  );

  if (!response.ok) {
    return NextResponse.json({ success: false, message: "User not found" });
  }

  const users = await response.json();

  if (
    users.length === 0 ||
    users[0].email !== userObj.email ||
    users[0].password !== userObj.password
  ) {
    return NextResponse.json({
      success: false,
      message: "Email or Password is incorrect",
    });
  }

  return NextResponse.json({ success: true, user: users[0] });
};
