import { signup } from "@/api/auth/auth";
import { userAtom } from "@/atoms/userAtom";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useAtom } from "jotai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setUser] = useAtom(userAtom);
  const { setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // 🔍 パスワードのバリデーション
    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
        alert("パスワードは6文字以上で、アルファベットと数字を含めてください。");
        setIsLoading(false);
        return;
    }

    try {
      const userInfo = await signup(name, email, password);
      setUser(userInfo);
      navigate("/dreams/mine");
    } catch (error) {
      alert("新規登録に失敗しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">新規登録</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              ユーザー名
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="ユーザー名"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
            {/* 🔍 バリデーション条件を表示 */}
            <ul className="text-sm text-gray-500 mt-2 ml-2">
                <li>● 6文字以上</li>
                <li>● アルファベットと数字を含む</li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-between">
            <button
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              新規登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;