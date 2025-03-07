import { User } from "@/types/user";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const response = await fetch(`${ENDPOINT}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("ユーザー登録に失敗しました");
  }

  const userInfo: User = await response.json();
  return userInfo;
};
