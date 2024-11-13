export async function isTokenValid(token: string): Promise<boolean> {
    try {
      console.log("Проверка токена:", token); 
      const response = await fetch(`http://localhost:3001/sessions/${token}`, {
        method: "GET",
      });
  
      if (!response.ok) return false;
      const data = await response.json();
      return Boolean(data && Object.keys(data).length > 0);
    } catch (error) {
      console.error("Ошибка при проверке токена:", error);
      return false;
    }
  }
  