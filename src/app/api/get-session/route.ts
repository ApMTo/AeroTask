import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const fetchResponse = await fetch(
    `http://localhost:3001/sessions?token=${token}`
  );

  if (!fetchResponse.ok) {
    throw new Error(`Failed to fetch session data: ${fetchResponse.status}`);
  }

  const sessionData = await fetchResponse.json();


  return NextResponse.json(sessionData);
}
