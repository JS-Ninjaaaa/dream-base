import { createUser } from "@/api/users/user";
import { LoadingContext } from "@/contexts/LoadingContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      alert("新規登録に失敗しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          メールアドレス
        </label>
        <input
          className="shadow-sm appearance-none border border-pink-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="email"
          placeholder="user@example.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          パスワード
        </label>
        <input
          className="shadow-sm appearance-none border border-pink-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="password"
          placeholder="パスワード"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <ul className="list-disc text-sm text-gray-500 mt-2 ml-6">
          <li>6文字以上</li>
          <li>アルファベットと数字を含む</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <button
          className="bg-[#ff9bd1] hover:bg-pink-500 text-white text-lg font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="submit"
        >
          新規登録
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
