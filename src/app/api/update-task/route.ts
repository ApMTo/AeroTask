import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const patchObj = await req.json();
  const fetchObj = {
    status: patchObj.status,
    isCompleted: patchObj.isCompleted,
  };

  await fetch(`http://localhost:3001/tasks/${patchObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fetchObj),
  });

  return NextResponse.json({ message: "Task updated" });
}
