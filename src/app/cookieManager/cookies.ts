"use client";

export function getUserInfoCookie() {
  const match = document.cookie.match(/(?:^|; )USER_INFO=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function setUserInfoCookie(userId: string) {
  const response = await fetch("http://localhost:3000/api/set-cookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();
  localStorage.setItem('userId', JSON.stringify(userId))
}
