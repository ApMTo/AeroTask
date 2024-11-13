import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { taskId } = await req.json();

  const fetchResponse = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: "DELETE",
  });

  const res = NextResponse.json({ message: "Task DELETE" });

  return res;
}
