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
    switch (response.status) {
      case 400:
        throw new Error("メールアドレスとパスワードを入力してください");
      case 409:
        throw new Error("メールアドレスが既に登録されています");
      default:
        throw new Error("新規登録に失敗しました");
    }
  }

  const userInfo: User = await response.json();
  console.log(userInfo);
  return userInfo;
};
