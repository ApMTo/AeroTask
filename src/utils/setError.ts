export const setError = (
    func: React.Dispatch<React.SetStateAction<any>>,
    status: boolean,
    title: string,
    message: string
  ) => {
    func({
      status,
      title,
      message,
    });
  };
  