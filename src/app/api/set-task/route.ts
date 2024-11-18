import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const taskObj = await req.json();

  const fetchResponse = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  });

  if (!fetchResponse.ok) {
    console.error("Failed to save task data on the server.");
    return NextResponse.json(
      { message: "Failed to add task" },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ message: "Task set" });

  return res;
}
