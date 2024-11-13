import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  const fetchResponse = await fetch(`http://localhost:3001/tasks?userId=${id}`);

  if (!fetchResponse.ok) {
    throw new Error(`Failed to fetch tasks data: ${fetchResponse.status}`);
  }

  const sessionData = await fetchResponse.json();

  return NextResponse.json(sessionData);
}
