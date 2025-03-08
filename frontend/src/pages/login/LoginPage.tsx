import { login } from "@/api/auth/auth";
import { userAtom } from "@/atoms/userAtom";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useAtom } from "jotai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";

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
  // Twitter login（サンプル）
  const handleTwitterLogin = async () =>{
    setIsLoading(true);

    try{
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: "http://localhost:5173/auth/callback", // 絶対URLを指定
        },
      });
      if (error) throw error;
    }
    catch (error){
      alert("Twitter ログインに失敗しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">ログイン</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              メールアドレス
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              パスワード
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              ログイン
            </button>
            <button
              type="button"
              onClick={handleTwitterLogin}
              className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Twitterでログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
