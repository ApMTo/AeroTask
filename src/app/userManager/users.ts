`use client`;

interface userExample {
  id: string;
  email: string;
  username: string;
  password: string;
}

export const createNewUser = async (userObject: userExample) => {
  await fetch("http://localhost:3000/api/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });
};

export const getSession = async (token: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/get-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch session:", error);
    throw error;
  }
};

export const getUser = async (id: string) => {
  const response = await fetch("http://localhost:3000/api/get-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getTasks = async (id: string) => {
  const response = await fetch("http://localhost:3000/api/get-tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getUserByEmail = async (email: string, password: string) => {
  const response = await fetch(
    "http://localhost:3000/api/get-logged-user-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};


export const checkUserByEmail = async (email: string) => {
  const response = await fetch(
    "http://localhost:3000/api/get-user-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const checkUserByUsername = async (username: string) => {
  const response = await fetch(
    "http://localhost:3000/api/get-user-username",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }
  );

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data;
};