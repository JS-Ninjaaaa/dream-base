import { login } from "@/api/auth/auth";
import { userAtom } from "@/atoms/userAtom";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useAtom } from "jotai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import XLoginButton from "./XLoginButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setUser] = useAtom(userAtom);
  const { setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const userInfo = await login(email, password);
      setUser(userInfo);
      navigate("/");
    } catch (error) {
      alert("ログインに失敗しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="email"
        >
          メールアドレス
        </label>
        <input
          className="shadow-sm appearance-none border border-pink-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
          id="email"
          type="email"
          placeholder="user@example.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-medium mb-2"
          htmlFor="password"
        >
          パスワード
        </label>
        <input
          className="shadow-sm appearance-none border border-pink-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
          id="password"
          type="password"
          placeholder="パスワード"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <button
          className="bg-[#ff9bd1] hover:bg-pink-500 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="submit"
        >
          ログイン
        </button>
        <XLoginButton />
      </div>
    </form>
  );
};

export default LoginForm;
