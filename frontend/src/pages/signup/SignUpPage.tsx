import { createUser } from "@/api/users/user";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      alert("メールアドレスを入力してください");
      return;
    }

    if (password.length < 6) {
      alert("パスワードは6文字以上にしてください");
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      alert("パスワードはアルファベットと数字を含めてください");
      return;
    }

    setIsLoading(true);

    try {
      await createUser(email, password);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("新規登録に失敗しました");
      }
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
              メールアドレス
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="user@example.com"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ul className="list-disc text-sm text-gray-500 mt-2 ml-6">
              <li>6文字以上</li>
              <li>アルファベットと数字を含む</li>
            </ul>
          </div>

          <div className="flex flex-col items-center justify-between">
            <button
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
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
