import { User } from "@/types/user";

const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("ログインに失敗しました");
  }

  const token = response.headers.get("Authorization");
  if (token === null) {
    throw new Error("JWTトークンを取得できませんでした");
  }
  sessionStorage.setItem("token", token);

  const userInfo: User = await response.json();
  return userInfo;
};

// 新規登録のAPI
// export const signup = async (username: string, email: string, password: string) => {
//   try {
//     const response = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, email, password }),
//     });

//     if (!response.ok) {
//       throw new Error("新規登録に失敗しました");
//     }

//     return await response.json(); // ユーザー情報を取得
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const signup = async (name: string, email: string, password: string): Promise<User> => {
  console.log("仮のAPI: signup", name, email, password);

  // 仮のユーザー情報を返す（id は固定値）
  const userInfo: User = {
    id: 1,
    name, // 修正: `name` に変更
    email,
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userInfo);
    }, 1000); // 1秒の遅延を入れる
  });
};



