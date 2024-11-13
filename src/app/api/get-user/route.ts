import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  const fetchResponse = await fetch(`http://localhost:3001/users/${id}`);

  if (!fetchResponse.ok) {
    throw new Error(`Failed to fetch user data: ${fetchResponse.status}`);
  }

  const userData = await fetchResponse.json();

  return NextResponse.json(userData);
}
