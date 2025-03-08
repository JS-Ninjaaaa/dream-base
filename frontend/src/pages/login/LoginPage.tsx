import { login } from "@/api/auth/auth";
import { userAtom } from "@/atoms/userAtom";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useAtom } from "jotai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

const LoginPage = () => {
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

  const handleTwitterLogin = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: "http://localhost:5173/auth/callback",
        },
      });
      if (error) throw error;
    } catch (error) {
      alert("Twitter ログインに失敗しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-pink-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">🌸ログイン</h2>
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
              placeholder="メールアドレス"
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              type="submit"
            >
              ログイン
            </button>
            <button
              type="button"
              onClick={handleTwitterLogin}
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Twitterでログイン
            </button>
          </div>
          <div className="flex flex-col items-center mt-6">
            <h1 className="text-sm text-gray-600">アカウントをお持ちでない方</h1>
            <Link to="/signup" className="text-pink-600 font-semibold underline">
              アカウントの作成
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
