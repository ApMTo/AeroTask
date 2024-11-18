import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const patchObj = await req.json();
  

  await fetch(`http://localhost:3001/tasks/${patchObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patchObj),
  });

  return NextResponse.json({ message: "Task updated" });
}
